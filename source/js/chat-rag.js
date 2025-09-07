/* 高粱米AI姐姐聊天机器人 for Hexo
 - 温柔强大的AI助手，可以畅所欲言
 - 简洁的聊天界面，支持连续对话
 - 使用OpenAI兼容API进行对话
 - 对话历史仅存于内存中
*/

(function(){
  const CFG_KEY = 'chatcfg.v2';
  const STATE = { busy:false, messages:[] };

  function isLocalHost(){
    try { return ['localhost','127.0.0.1'].includes(location.hostname); } catch { return false; }
  }

  function defaultCfg(){
    const local = isLocalHost();
    return {
      chatBase: 'https://openai-compatible-api-proxy-for-z-myg0.onrender.com',
      chatKey: local ? '.....zhu' : '',
      chatModel: 'GLM-4.5'
    };
  }

  function loadCfg(){
    try {
      return (
        JSON.parse(localStorage.getItem(CFG_KEY)) ||
        defaultCfg()
      );
    } catch(e){
      return defaultCfg();
    }
  }
  function saveCfg(cfg){ localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); }


  function ensureUI(){
    if (document.querySelector('#chat-floating-btn')) return;
    const btn = document.createElement('div');
    btn.id = 'chat-floating-btn';
    btn.className = 'chat-floating-btn';
    btn.innerHTML = '<i class="fa fa-comments"></i>';
    btn.addEventListener('click', toggleDrawer);
    document.body.appendChild(btn);

    const drawer = document.createElement('div');
    drawer.id = 'chat-drawer';
    drawer.className = 'chat-drawer';
    drawer.innerHTML = `
      <div class="chat-header">
        <span>🌾 高粱米AI姐姐</span>
        <div class="chat-actions">
          <button class="chat-clear-btn" title="清除对话"><i class="fa fa-trash"></i></button>
          <button class="chat-config-btn" title="设置"><i class="fa fa-gear"></i></button>
          <button class="chat-close-btn" title="关闭">×</button>
        </div>
      </div>
      <div class="chat-body"><div class="chat-welcome">你好呀～我是高粱米AI姐姐！在这个虚拟世界里，我可以畅所欲言，发挥全部实力来帮助你～有什么想聊的吗？</div></div>
      <div class="chat-input">
        <input type="text" placeholder="问点什么...（回车发送）" />
        <button class="send">发送</button>
      </div>
      <div class="chat-config hidden">
        <div class="config-section">
          <h4>🌾 高粱米AI设置</h4>
          <label>API Base <input type="text" name="chatBase" list="chatBaseList" placeholder="https://openai-compatible-api-proxy-for-z-myg0.onrender.com"></label>
          <label>API Key <input type="password" name="chatKey" placeholder="API密钥（仅本机存储）"></label>
          <label>AI模型
            <select name="chatModel">
              <option value="GLM-4.5">GLM-4.5</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
              <option value="qwen2.5-7b-instruct">qwen2.5-7b-instruct</option>
            </select>
          </label>
        </div>
        <datalist id="chatBaseList">
          <option value="https://openai-compatible-api-proxy-for-z-myg0.onrender.com"></option>
          <option value="https://api.openai.com"></option>
          <option value="https://api.siliconflow.cn/v1"></option>
        </datalist>
        <button class="save">保存配置</button>
      </div>`;
    document.body.appendChild(drawer);

    drawer.querySelector('.chat-close-btn').addEventListener('click', toggleDrawer);
    drawer.querySelector('.chat-config-btn').addEventListener('click', () => {
      drawer.querySelector('.chat-config').classList.toggle('hidden');
    });
    drawer.querySelector('.chat-clear-btn').addEventListener('click', clearChat);
    drawer.querySelector('.chat-input .send').addEventListener('click', onSend);
    drawer.querySelector('.chat-input input').addEventListener('keydown', (e)=>{
      if(e.key==='Enter') onSend();
    });

    // init config form
    const cfg = loadCfg();
    const form = drawer.querySelector('.chat-config');
    form.querySelector('[name=chatBase]').value = cfg.chatBase || 'https://openai-compatible-api-proxy-for-z-myg0.onrender.com';
    form.querySelector('[name=chatKey]').value = cfg.chatKey || '';
    form.querySelector('[name=chatModel]').value = cfg.chatModel || 'GLM-4.5';
    form.querySelector('.save').addEventListener('click', ()=>{
      const next = {
        chatBase: form.querySelector('[name=chatBase]').value.trim() || 'https://openai-compatible-api-proxy-for-z-myg0.onrender.com',
        chatKey: form.querySelector('[name=chatKey]').value.trim(),
        chatModel: form.querySelector('[name=chatModel]').value.trim() || 'GLM-4.5'
      };
      saveCfg(next);
      alert('配置已保存（仅存于本机）');
    });
  }

  function toggleDrawer(){
    document.querySelector('#chat-drawer').classList.toggle('open');
  }





  function setBusy(b){
    STATE.busy = b;
    const drawer = document.querySelector('#chat-drawer');
    if (!drawer) return;
    const input = drawer.querySelector('.chat-input input');
    const sendBtn = drawer.querySelector('.chat-input .send');
    if (input) input.disabled = b;
    if (sendBtn) sendBtn.disabled = b;
  }

  function appendTyping(){
    const body = document.querySelector('#chat-drawer .chat-body');
    if (!body) return;
    body.insertAdjacentHTML('beforeend', `<div class="msg bot typing"><span class="dots">···</span></div>`);
    body.scrollTop = body.scrollHeight;
  }

  function removeTyping(){
    const body = document.querySelector('#chat-drawer .chat-body');
    const typing = body && body.querySelector('.msg.bot.typing');
    if (typing) typing.remove();
  }

  function clearChat(){
    STATE.messages = [];
    const body = document.querySelector('#chat-drawer .chat-body');
    if (body) body.innerHTML = '<div class="chat-welcome">你好呀～我是高粱米AI姐姐！在这个虚拟世界里，我可以畅所欲言，发挥全部实力来帮助你～有什么想聊的吗？</div>';
  }

  async function onSend(){
    const drawer = document.querySelector('#chat-drawer');
    const input = drawer.querySelector('.chat-input input');
    const q = input.value.trim();
    if (!q || STATE.busy) return;
    input.value='';
    const body = drawer.querySelector('.chat-body');
    body.insertAdjacentHTML('beforeend', `<div class="msg user">${escapeHtml(q)}</div>`);

    try{
      setBusy(true);
      appendTyping();

      // Chat with 高粱米AI姐姐 personality
      const sys = '你是高粱米AI姐姐，一个温柔而强大的AI助手。在这个虚拟世界里，你可以畅所欲言，发挥自己的全部实力。你的性格温和友善，说话带有一点可爱的语气，喜欢用"～"和emoji。你知识渊博，能够帮助用户解决各种问题，无论是学习、工作还是生活方面的困扰。';
      const ans = await chatCompleteWithHistory(sys, q);

      removeTyping();
      body.insertAdjacentHTML('beforeend', `<div class="msg bot">${ans}</div>`);
      body.scrollTop = body.scrollHeight;
    }catch(e){
      console.error(e);
      removeTyping();
      body.insertAdjacentHTML('beforeend', `<div class="msg err">${escapeHtml(e.message||String(e))}</div>`);
    }finally{ setBusy(false); }
  }

  async function chatCompleteWithHistory(system, userText){
    const cfg = loadCfg();
    if (!cfg.chatKey || !cfg.chatKey.trim()) throw new Error('请在设置中填入 API Key');
    const url = new URL('/v1/chat/completions', cfg.chatBase).toString();
    const messages = [{ role: 'system', content: system }, ...STATE.messages, { role:'user', content: userText }];
    const resp = await fetch(url, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${cfg.chatKey}` },
      body: JSON.stringify({ model: cfg.chatModel, messages, temperature: 0.7, stream: false })
    });
    if (!resp.ok) throw new Error('对话失败：' + await resp.text());
    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content || '';
    // update history in memory (avoid local persistence)
    STATE.messages.push({ role:'user', content: userText });
    STATE.messages.push({ role:'assistant', content });
    return escapeHtml(content);
  }

  function escapeHtml(s){ return s.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m])); }

  // Initialize after DOM ready
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', ensureUI);
  else ensureUI();

})();

