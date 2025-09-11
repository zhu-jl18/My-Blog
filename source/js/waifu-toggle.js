// 看板娘开关控制器
(function() {
  'use strict';
  
  class WaifuToggle {
    constructor() {
      this.storageKey = 'waifu-enabled';
      this.waifuContainer = null;
      this.toggleButton = null;
      this.init();
    }
    
    init() {
      this.createToggleButton();
      this.createWaifuContainer();
      this.loadState();
      this.bindEvents();
    }
    
    createToggleButton() {
      // 创建开关按钮
      this.toggleButton = document.createElement('div');
      this.toggleButton.className = 'waifu-toggle';
      this.toggleButton.setAttribute('role', 'button');
      this.toggleButton.setAttribute('aria-label', '切换看板娘');
      this.toggleButton.innerHTML = `
        <i class="fa fa-power-off"></i>
        <span class="waifu-tooltip">看板娘开关</span>
      `;
      
      document.body.appendChild(this.toggleButton);
    }
    
    createWaifuContainer() {
      // 创建看板娘容器（预留给Live2D等看板娘使用）
      this.waifuContainer = document.createElement('div');
      this.waifuContainer.className = 'waifu-container hidden';
      this.waifuContainer.id = 'waifu-container';
      document.body.appendChild(this.waifuContainer);
    }
    
    loadState() {
      // 从本地存储加载状态
      const enabled = localStorage.getItem(this.storageKey) === 'true';
      this.setEnabled(enabled);
    }
    
    setEnabled(enabled) {
      if (enabled) {
        this.toggleButton.classList.add('active');
        this.waifuContainer.classList.remove('hidden');
        // 这里可以添加看板娘初始化代码
        this.initWaifu();
      } else {
        this.toggleButton.classList.remove('active');
        this.waifuContainer.classList.add('hidden');
        // 这里可以添加看板娘销毁代码
        this.destroyWaifu();
      }
      localStorage.setItem(this.storageKey, enabled);
    }
    
    initWaifu() {
      // 初始化看板娘
      console.log('[Waifu] 看板娘已启用');
      
      // 创建简单的看板娘角色
      this.createSimpleWaifu();
      
      // 如果有Live2D看板娘，可以在这里初始化
      if (typeof loadLive2D === 'function') {
        loadLive2D();
      }
    }
    
    destroyWaifu() {
      // 销毁看板娘
      console.log('[Waifu] 看板娘已禁用');
      
      // 清除定时器
      if (this.messageTimer) {
        clearInterval(this.messageTimer);
      }
      
      // 清除看板娘内容
      if (this.waifuContainer) {
        this.waifuContainer.innerHTML = '';
      }
      
      // 如果有Live2D看板娘，可以在这里销毁
      if (typeof destroyLive2D === 'function') {
        destroyLive2D();
      }
    }
    
    bindEvents() {
      // 绑定点击事件
      this.toggleButton.addEventListener('click', () => {
        const isEnabled = this.toggleButton.classList.contains('active');
        this.setEnabled(!isEnabled);
      });
      
      // 绑定键盘快捷键（Ctrl+Shift+W）
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'W') {
          e.preventDefault();
          const isEnabled = this.toggleButton.classList.contains('active');
          this.setEnabled(!isEnabled);
        }
      });
      
      // PJAX页面切换后重新初始化
      document.addEventListener('pjax:success', () => {
        this.reinit();
      });
    }
    
    reinit() {
      // 重新初始化（用于PJAX页面切换）
      const existingToggle = document.querySelector('.waifu-toggle');
      const existingContainer = document.querySelector('#waifu-container');
      
      if (!existingToggle) {
        this.createToggleButton();
      }
      
      if (!existingContainer) {
        this.createWaifuContainer();
      }
      
      this.loadState();
    }
    
    createSimpleWaifu() {
      // 创建简单的看板娘角色
      this.waifuContainer.innerHTML = `
        <div class="waifu-character">
          <div class="waifu-avatar">
            <div class="waifu-face">🌸</div>
          </div>
          <div class="waifu-message" id="waifu-message">
            你好呀！我是芷鱼姐姐~有什么可以帮你的吗？💕
          </div>
          <div class="waifu-actions">
            <button class="waifu-btn" onclick="waifuToggle.sayRandomMessage()">聊天</button>
            <button class="waifu-btn" onclick="waifuToggle.dance()">跳舞</button>
          </div>
        </div>
      `;
      
      // 添加一些交互效果
      this.addWaifuInteractions();
    }
    
    addWaifuInteractions() {
      // 定时随机消息
      this.messageTimer = setInterval(() => {
        if (this.toggleButton.classList.contains('active')) {
          this.showRandomTip();
        }
      }, 30000); // 30秒一次
      
      // 鼠标悬停效果
      const avatar = this.waifuContainer.querySelector('.waifu-avatar');
      if (avatar) {
        avatar.addEventListener('mouseenter', () => {
          avatar.style.transform = 'scale(1.1)';
        });
        avatar.addEventListener('mouseleave', () => {
          avatar.style.transform = 'scale(1)';
        });
      }
    }
    
    sayRandomMessage() {
      const messages = [
        'mako今天真可爱呢~ 💕',
        '要不要来杯奶茶？🥤',
        '加油哦！你是最棒的！🌟',
        '记得休息一下，不要太累了~ 😊',
        '芷鱼姐姐一直在陪着你呢！💖',
        '今天过得怎么样呀？',
        '要不要听个笑话？😄',
        '学习辛苦了呢，放松一下吧~ 🎵'
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      this.showMessage(randomMessage);
    }
    
    showMessage(text) {
      const messageEl = this.waifuContainer.querySelector('#waifu-message');
      if (messageEl) {
        messageEl.textContent = text;
        messageEl.style.animation = 'none';
        setTimeout(() => {
          messageEl.style.animation = 'fadeIn 0.5s ease';
        }, 10);
      }
    }
    
    showRandomTip() {
      const tips = [
        '记得多喝水哦~ 💧',
        '坐久了要站起来活动一下~ 🚶‍♀️',
        '眼睛疲劳了吗？看看远处吧~ 👀',
        '今天的任务完成了吗？✅',
        '要好好照顾自己哦~ 💕'
      ];
      
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      this.showMessage(randomTip);
    }
    
    dance() {
      const avatar = this.waifuContainer.querySelector('.waifu-avatar');
      if (avatar) {
        avatar.style.animation = 'dance 0.5s ease 3';
        this.showMessage('来一起跳舞吧！🎵💃');
        
        setTimeout(() => {
          avatar.style.animation = '';
          this.showMessage('跳舞真开心！😊');
        }, 1500);
      }
    }
  }
  
  // 等待DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.waifuToggle = new WaifuToggle();
    });
  } else {
    window.waifuToggle = new WaifuToggle();
  }
  
  // 暴露到全局，供其他脚本调用
  window.WaifuToggle = WaifuToggle;
})();