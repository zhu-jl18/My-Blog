/**
 * Cloudflare Workers AI Chat Proxy
 * 为博客提供安全的AI聊天代理服务
 * 
 * 部署步骤：
 * 1. 登录 Cloudflare Dashboard
 * 2. 进入 Workers & Pages
 * 3. 创建新的 Worker
 * 4. 复制此代码并部署
 * 5. 在 Worker 设置中添加环境变量：
 *    - CHAT_API_KEY: 你的真实API密钥
 *    - ALLOWED_ORIGINS: 你的域名（如 https://zhu-jl18.github.io）
 */

// 配置
const CONFIG = {
  // API配置
  API_BASE: 'https://huggingface.qzz.io',
  DEFAULT_MODEL: '[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05',
  
  // 速率限制（每个IP）
  RATE_LIMIT: {
    REQUESTS_PER_HOUR: 20,
    REQUESTS_PER_DAY: 100
  },
  
  // 允许的模型列表
  ALLOWED_MODELS: [
    '[CLI反代]流式抗截断/gemini-2.5-pro-preview-06-05',
    '[CLI反代]gemini-2.5-pro-preview-06-05'
  ]
};

// KV存储键名
const KV_KEYS = {
  RATE_LIMIT: (ip) => `rate_limit:${ip}`,
  DAILY_LIMIT: (ip) => `daily_limit:${ip}:${new Date().toISOString().split('T')[0]}`
};

export default {
  async fetch(request, env, ctx) {
    // CORS预检请求
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    try {
      // 验证请求方法
      if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
      }

      // 验证来源域名
      const origin = request.headers.get('Origin');
      if (!isAllowedOrigin(origin, env.ALLOWED_ORIGINS)) {
        return jsonResponse({ error: 'Origin not allowed' }, 403);
      }

      // 获取客户端IP
      const clientIP = request.headers.get('CF-Connecting-IP') || 
                      request.headers.get('X-Forwarded-For') || 
                      'unknown';

      // 检查速率限制
      const rateLimitResult = await checkRateLimit(clientIP, env);
      if (!rateLimitResult.allowed) {
        return jsonResponse({ 
          error: rateLimitResult.message,
          resetTime: rateLimitResult.resetTime 
        }, 429);
      }

      // 解析请求体
      const body = await request.json();
      
      // 验证请求参数
      const validation = validateRequest(body);
      if (!validation.valid) {
        return jsonResponse({ error: validation.error }, 400);
      }

      // 调用AI API
      const aiResponse = await callAIAPI(body, env.CHAT_API_KEY);
      
      // 记录成功请求（用于速率限制）
      await recordRequest(clientIP, env);
      
      // 返回AI响应
      return new Response(aiResponse.body, {
        status: aiResponse.status,
        headers: {
          ...getCORSHeaders(origin),
          'Content-Type': aiResponse.headers.get('Content-Type') || 'application/json'
        }
      });

    } catch (error) {
      console.error('Proxy error:', error);
      return jsonResponse({ 
        error: 'Internal server error',
        message: error.message 
      }, 500);
    }
  }
};

// 验证来源域名
function isAllowedOrigin(origin, allowedOrigins) {
  if (!origin) return false;
  
  const allowed = allowedOrigins ? allowedOrigins.split(',') : [
    'https://zhu-jl18.github.io',
    'http://localhost:4000',
    'http://127.0.0.1:4000'
  ];
  
  return allowed.some(allowedOrigin => 
    origin === allowedOrigin.trim() || 
    origin.endsWith('.github.io') ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1')
  );
}

// 检查速率限制
async function checkRateLimit(ip, env) {
  if (!env.CHAT_RATE_LIMIT) {
    // 如果没有KV存储，跳过速率限制
    return { allowed: true };
  }

  const now = Date.now();
  const hourKey = KV_KEYS.RATE_LIMIT(ip);
  const dayKey = KV_KEYS.DAILY_LIMIT(ip);

  try {
    // 获取当前计数
    const [hourlyData, dailyCount] = await Promise.all([
      env.CHAT_RATE_LIMIT.get(hourKey, 'json'),
      env.CHAT_RATE_LIMIT.get(dayKey)
    ]);

    // 检查小时限制
    const hourlyRequests = hourlyData?.requests || [];
    const validHourlyRequests = hourlyRequests.filter(time => now - time < 3600000); // 1小时
    
    if (validHourlyRequests.length >= CONFIG.RATE_LIMIT.REQUESTS_PER_HOUR) {
      const oldestRequest = Math.min(...validHourlyRequests);
      const resetTime = new Date(oldestRequest + 3600000).toISOString();
      return { 
        allowed: false, 
        message: `每小时请求次数已达上限(${CONFIG.RATE_LIMIT.REQUESTS_PER_HOUR}次)，请稍后再试`,
        resetTime 
      };
    }

    // 检查日限制
    const dailyRequestCount = parseInt(dailyCount || '0');
    if (dailyRequestCount >= CONFIG.RATE_LIMIT.REQUESTS_PER_DAY) {
      return { 
        allowed: false, 
        message: `每日请求次数已达上限(${CONFIG.RATE_LIMIT.REQUESTS_PER_DAY}次)，请明天再试`,
        resetTime: new Date(new Date().setHours(24, 0, 0, 0)).toISOString()
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true }; // 出错时允许请求
  }
}

// 记录请求（用于速率限制）
async function recordRequest(ip, env) {
  if (!env.CHAT_RATE_LIMIT) return;

  const now = Date.now();
  const hourKey = KV_KEYS.RATE_LIMIT(ip);
  const dayKey = KV_KEYS.DAILY_LIMIT(ip);

  try {
    // 更新小时计数
    const hourlyData = await env.CHAT_RATE_LIMIT.get(hourKey, 'json') || { requests: [] };
    const validRequests = hourlyData.requests.filter(time => now - time < 3600000);
    validRequests.push(now);
    
    await env.CHAT_RATE_LIMIT.put(hourKey, JSON.stringify({ requests: validRequests }), {
      expirationTtl: 3600 // 1小时后过期
    });

    // 更新日计数
    const dailyCount = await env.CHAT_RATE_LIMIT.get(dayKey);
    const newDailyCount = parseInt(dailyCount || '0') + 1;
    
    await env.CHAT_RATE_LIMIT.put(dayKey, newDailyCount.toString(), {
      expirationTtl: 86400 // 24小时后过期
    });
  } catch (error) {
    console.error('Failed to record request:', error);
  }
}

// 验证请求参数
function validateRequest(body) {
  if (!body.messages || !Array.isArray(body.messages)) {
    return { valid: false, error: 'Invalid messages format' };
  }

  if (body.model && !CONFIG.ALLOWED_MODELS.includes(body.model)) {
    return { valid: false, error: 'Model not allowed' };
  }

  // 检查消息长度
  const totalLength = body.messages.reduce((sum, msg) => sum + (msg.content?.length || 0), 0);
  if (totalLength > 10000) {
    return { valid: false, error: 'Message too long' };
  }

  return { valid: true };
}

// 调用AI API
async function callAIAPI(body, apiKey) {
  if (!apiKey) {
    throw new Error('API key not configured');
  }

  const url = `${CONFIG.API_BASE}/v1/chat/completions`;
  
  // 构建请求体
  const requestBody = {
    model: body.model || CONFIG.DEFAULT_MODEL,
    messages: body.messages,
    temperature: Math.min(Math.max(body.temperature || 0.7, 0), 2),
    max_tokens: Math.min(body.max_tokens || 2000, 4000),
    stream: body.stream || false,
    stop: ["让我们一步一步思考", "思考过程", "用户询问"]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API error: ${response.status} ${errorText}`);
  }

  return response;
}

// CORS处理
function handleCORS() {
  return new Response(null, {
    status: 200,
    headers: getCORSHeaders()
  });
}

function getCORSHeaders(origin = '*') {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

// JSON响应辅助函数
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...getCORSHeaders()
    }
  });
}
