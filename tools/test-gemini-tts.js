#!/usr/bin/env node
/**
 * Quick Gemini TTS test script
 * Usage:
 *   $env:GEMINI_API_KEY="..."; node tools/test-gemini-tts.js --text "你好，这是测试。" --voice "Kore" --model gemini-2.5-flash-preview-tts --out out.wav
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    console.error('Error: Set GEMINI_API_KEY or GOOGLE_TTS_API_KEY in env');
    process.exit(1);
  }

  const text = args.text || '你好，这是一个语音合成测试。';
  const out = path.resolve(args.out || 'out.wav');
  const voiceName = args.voice || '';
  const model = args.model || 'gemini-2.5-flash-preview-tts';
  const style = args.style || '';

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const parts = [];
  if (style) parts.push({ text: style });
  parts.push({ text });

  const body = {
    model,
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      ...(voiceName ? { speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName } } } } : {})
    }
  };

  console.log(`[gemini-tts] requesting ${model} voice=${voiceName || 'auto'}`);
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const t = await resp.text();
    console.error(`[gemini-tts] error ${resp.status}:\n${t}`);
    process.exit(2);
  }

  const data = await resp.json();
  const inline = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData;
  if (!inline?.data) {
    console.error('No audio data returned. Full response:', JSON.stringify(data, null, 2));
    process.exit(3);
  }

  const pcm = base64ToBuffer(inline.data);
  const wav = pcmS16ToWav(pcm, 24000, 1);
  fs.writeFileSync(out, wav);
  console.log(`[gemini-tts] wrote ${out} (${wav.length} bytes)`);
}

function parseArgs(argv) {
  const o = {};
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    if (k === '--text') o.text = argv[++i];
    else if (k === '--voice') o.voice = argv[++i];
    else if (k === '--model') o.model = argv[++i];
    else if (k === '--out') o.out = argv[++i];
    else if (k === '--style') o.style = argv[++i];
  }
  return o;
}

function base64ToBuffer(b64) {
  return Buffer.from(b64, 'base64');
}

function pcmS16ToWav(pcmBuffer, sampleRate, channels) {
  const dataLen = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLen, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM
  header.writeUInt16LE(1, 20);  // format PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * channels * 2, 28); // byte rate
  header.writeUInt16LE(channels * 2, 32); // block align
  header.writeUInt16LE(16, 34); // bits per sample
  header.write('data', 36);
  header.writeUInt32LE(dataLen, 40);
  return Buffer.concat([header, pcmBuffer]);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
