/**
 * Cloudflare Worker: Gemini TTS Proxy with R2 cache
 * - POST /tts  { text: string, voiceName?: string, style?: string }
 * - GET  /tts/test?text=...
 *
 * Env Vars (set in Cloudflare Dashboard):
 * - GEMINI_API_KEY    (or GOOGLE_TTS_API_KEY)
 * - GEMINI_API_KEYS   Comma/newline/semicolon separated list of keys (optional)
 * - GEMINI_API_KEYS_JSON JSON array of keys (optional, recommended for 100+ keys)
 * - ALLOWED_ORIGINS   e.g. "https://zhu-jl18.github.io,http://localhost:4000"
 * - Optional: TTS_DEFAULT_MODEL = "gemini-2.5-flash-preview-tts"
 * - Optional: TTS_DEFAULT_VOICE = "Leda"
 * - Optional: TTS_STYLE = "普通话，温柔少女音色，可爱"
 * - Optional: TEMPERATURE = "0.7"
 *
 * Bindings:
 * - R2 bucket binding: TTS_AUDIO  (for caching)
 * - Optional KV binding: CHAT_RATE_LIMIT (reusing rate limit infra)
 */

const CFG = {
  API: 'https://generativelanguage.googleapis.com/v1beta/models',
  DEFAULT_MODEL: 'gemini-2.5-flash-preview-tts',
  SAMPLE_RATE: 24000,
  CHANNELS: 1,
  RATE_LIMIT: { HOURLY: 20, DAILY: 100 },
  KEY_ROTATION_MAX: 5,
};

const KV_KEYS = {
  RATE_LIMIT: (ip) => `tts_rate_limit:${ip}`,
  DAILY_LIMIT: (ip) => `tts_daily_limit:${ip}:${new Date().toISOString().split('T')[0]}`
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return handleCORS();

    try {
      const url = new URL(request.url);
      const origin = request.headers.get('Origin');
      if (!isAllowedOrigin(origin, env.ALLOWED_ORIGINS)) {
        return json({ error: 'Origin not allowed' }, 403);
      }

      const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
      const rl = await checkRateLimit(ip, env);
      if (!rl.allowed) return json({ error: rl.message, resetTime: rl.resetTime }, 429);

      if (url.pathname === '/tts/health' && request.method === 'GET') {
        return json({ ok: true, time: new Date().toISOString() }, 200);
      }

      if (url.pathname === '/tts' && request.method === 'GET') {
        const text = url.searchParams.get('text') || '你好，这是一个语音合成测试。';
        const voiceName = url.searchParams.get('voiceName') || env.TTS_DEFAULT_VOICE || '';
        const style = url.searchParams.get('style') || env.TTS_STYLE || '';
        const model = url.searchParams.get('model') || env.TTS_DEFAULT_MODEL || CFG.DEFAULT_MODEL;
        const temperature = parseFloat(url.searchParams.get('temperature') || env.TEMPERATURE || '0.7') || 0.7;
        const res = await synthAndCache(text, { voiceName, style, model, temperature, ip }, env);
        await recordRequest(ip, env);
        return streamAudio(res.wav, origin);
      }

      if (url.pathname === '/tts' && request.method === 'POST') {
        const body = await request.json();
        const text = (body.text || '').toString();
        if (!text || text.length < 4) return json({ error: 'Text is required' }, 400);
        const voiceName = (body.voiceName || env.TTS_DEFAULT_VOICE || '').toString();
        const style = (body.style || env.TTS_STYLE || '').toString();
        const model = (body.model || env.TTS_DEFAULT_MODEL || CFG.DEFAULT_MODEL).toString();
        const temperature = typeof body.temperature !== 'undefined'
          ? (parseFloat(body.temperature) || 0.7)
          : (parseFloat(env.TEMPERATURE || '0.7') || 0.7);
        const res = await synthAndCache(text, { voiceName, style, model, temperature, ip }, env);
        await recordRequest(ip, env);
        return streamAudio(res.wav, origin);
      }

      return json({ error: 'Not found' }, 404);
    } catch (err) {
      console.error('TTS proxy error:', err);
      return json({ error: 'Internal error', message: err.message }, 500);
    }
  }
};

async function synthAndCache(text, opts, env) {
  const model = (opts.model || env.TTS_DEFAULT_MODEL || CFG.DEFAULT_MODEL).toString();
  const voiceName = (opts.voiceName || '').trim();
  const style = (opts.style || '').trim();
  const temperature = typeof opts.temperature === 'number' ? opts.temperature : (parseFloat(env.TEMPERATURE || '0.7') || 0.7);

  const hash = await sha256(`${model}|${voiceName}|${style}|${temperature}|${text}`);
  const key = `tts/${model}/${voiceName || 'auto'}/${hash}.wav`;

  if (env.TTS_AUDIO) {
    const obj = await env.TTS_AUDIO.get(key);
    if (obj) {
      const wav = await obj.arrayBuffer();
      return { wav, cached: true };
    }
  }

  const keys = parseApiKeys(env);
  if (!keys.length) throw new Error('No GEMINI API keys configured');

  const synthRes = await callGeminiWithRotation(keys, { text, model, voiceName, style, temperature, ip: opts.ip || '' });
  const wav = pcmS16ToWav(synthRes.pcm, CFG.SAMPLE_RATE, CFG.CHANNELS);

  if (env.TTS_AUDIO) {
    await env.TTS_AUDIO.put(key, wav, {
      httpMetadata: { contentType: 'audio/wav', cacheControl: 'public, max-age=31536000, immutable' }
    });
  }
  return { wav, cached: false };
}

async function callGeminiTTS({ apiKey, text, model, voiceName, style, temperature }) {
  const endpoint = `${CFG.API}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const parts = [];
  if (style) parts.push({ text: style });
  parts.push({ text });

  const speechCfg = voiceName
    ? { voiceConfig: { prebuiltVoiceConfig: { voiceName } } }
    : undefined;

  const payload = {
    model,
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      temperature: typeof temperature === 'number' ? temperature : 0.7,
      ...(speechCfg ? { speechConfig: speechCfg } : {})
    }
  };

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!resp.ok) {
    const t = await resp.text();
    const err = new Error(`Gemini TTS error ${resp.status}: ${t}`);
    err.status = resp.status;
    err.body = t;
    throw err;
  }

  const data = await resp.json();
  const inline = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inline?.data) throw new Error('No audio data returned');
  const pcm = base64ToArrayBuffer(inline.data);
  return { pcm, mime: inline.mimeType || 'audio/pcm' };
}

// Rotate through multiple keys with stable starting index and retry on quota/auth errors
async function callGeminiWithRotation(keys, params) {
  if (!keys.length) throw new Error('No API keys');
  const start = stableIndex(params.text + '|' + (params.ip || '')) % keys.length;
  let lastErr = null;
  const attempts = Math.min(CFG.KEY_ROTATION_MAX, keys.length);
  for (let i = 0; i < attempts; i++) {
    const key = keys[(start + i) % keys.length];
    try {
      return await callGeminiTTS({ apiKey: key, ...params });
    } catch (e) {
      lastErr = e;
      const status = e && (e.status || 0);
      if (status === 401 || status === 403 || status === 429 || status >= 500) {
        // try next key
        continue;
      }
      // non-retryable
      break;
    }
  }
  throw lastErr || new Error('All API keys failed');
}

function parseApiKeys(env) {
  const keys = [];
  if (env.GEMINI_API_KEYS) {
    keys.push(...String(env.GEMINI_API_KEYS).split(/[\s,;]+/).map(s => s.trim()).filter(Boolean));
  }
  if (env.GEMINI_API_KEYS_JSON) {
    try {
      const arr = JSON.parse(env.GEMINI_API_KEYS_JSON);
      if (Array.isArray(arr)) keys.push(...arr.map(s => String(s).trim()).filter(Boolean));
    } catch (_) {}
  }
  if (env.GEMINI_API_KEY) keys.push(String(env.GEMINI_API_KEY).trim());
  if (env.GOOGLE_TTS_API_KEY) keys.push(String(env.GOOGLE_TTS_API_KEY).trim());
  // de-duplicate
  return [...new Set(keys.filter(Boolean))];
}

function stableIndex(s) {
  let h = 0 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function streamAudio(wavArrayBuffer, origin) {
  return new Response(wavArrayBuffer, {
    status: 200,
    headers: {
      ...corsHeaders(origin),
      'Content-Type': 'audio/wav',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}

function base64ToArrayBuffer(b64) {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function pcmS16ToWav(pcmArrayBuffer, sampleRate, channels) {
  const pcmBytes = new Uint8Array(pcmArrayBuffer);
  const dataLen = pcmBytes.byteLength;
  const blockAlign = channels * 2; // 16-bit
  const byteRate = sampleRate * blockAlign;
  const wavLen = 44 + dataLen;
  const buffer = new ArrayBuffer(wavLen);
  const view = new DataView(buffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataLen, true);
  writeString(view, 8, 'WAVE');

  // fmt chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // PCM chunk size
  view.setUint16(20, 1, true);  // audio format = 1 (PCM)
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // bits per sample

  // data chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataLen, true);

  // copy data
  new Uint8Array(buffer, 44).set(pcmBytes);
  return buffer;
}

function writeString(dataView, offset, str) {
  for (let i = 0; i < str.length; i++) dataView.setUint8(offset + i, str.charCodeAt(i));
}

function corsHeaders(origin = '*') {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

function handleCORS() {
  return new Response(null, { status: 200, headers: corsHeaders() });
}

function isAllowedOrigin(origin, allowedOrigins) {
  if (!origin) return false;
  const allowed = allowedOrigins ? allowedOrigins.split(',') : [
    'https://zhu-jl18.github.io', 'http://localhost:4000', 'http://127.0.0.1:4000'
  ];
  return allowed.some(o => origin === o.trim() || origin.includes('localhost') || origin.includes('127.0.0.1'));
}

async function sha256(input) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(input));
  const bytes = new Uint8Array(buf);
  return [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkRateLimit(ip, env) {
  if (!env.CHAT_RATE_LIMIT) return { allowed: true };
  try {
    const now = Date.now();
    const hourKey = KV_KEYS.RATE_LIMIT(ip);
    const dayKey = KV_KEYS.DAILY_LIMIT(ip);
    const [hourlyData, dailyCount] = await Promise.all([
      env.CHAT_RATE_LIMIT.get(hourKey, 'json'),
      env.CHAT_RATE_LIMIT.get(dayKey)
    ]);

    const reqs = (hourlyData?.requests || []).filter(t => now - t < 3600000);
    if (reqs.length >= CFG.RATE_LIMIT.HOURLY) {
      const oldest = Math.min(...reqs);
      return { allowed: false, message: `每小时上限(${CFG.RATE_LIMIT.HOURLY})已达`, resetTime: new Date(oldest + 3600000).toISOString() };
    }
    const daily = parseInt(dailyCount || '0');
    if (daily >= CFG.RATE_LIMIT.DAILY) {
      return { allowed: false, message: `每日上限(${CFG.RATE_LIMIT.DAILY})已达`, resetTime: new Date(new Date().setHours(24,0,0,0)).toISOString() };
    }
    return { allowed: true };
  } catch (e) {
    console.warn('rate limit check failed', e);
    return { allowed: true };
  }
}

async function recordRequest(ip, env) {
  if (!env.CHAT_RATE_LIMIT) return;
  try {
    const now = Date.now();
    const hourKey = KV_KEYS.RATE_LIMIT(ip);
    const dayKey = KV_KEYS.DAILY_LIMIT(ip);

    const hourlyData = await env.CHAT_RATE_LIMIT.get(hourKey, 'json') || { requests: [] };
    const reqs = (hourlyData.requests || []).filter(t => now - t < 3600000);
    reqs.push(now);
    await env.CHAT_RATE_LIMIT.put(hourKey, JSON.stringify({ requests: reqs }), { expirationTtl: 3600 });

    const dailyCount = parseInt((await env.CHAT_RATE_LIMIT.get(dayKey)) || '0') + 1;
    await env.CHAT_RATE_LIMIT.put(dayKey, String(dailyCount), { expirationTtl: 86400 });
  } catch (e) {
    console.warn('rate record failed', e);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders() } });
}
