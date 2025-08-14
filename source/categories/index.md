---
title: 📚 学习分类目录
date: 2021-03-20 22:25:39
comments: false
---

<div align="center">
  <h3>📖 知识分类索引</h3>
</div>

<div class="categories-overview">
  <div class="categories-grid" id="dynamic-categories">
    <!-- 分类内容将通过JavaScript生成 -->
  </div>
</div>

<script>
// 动态生成分类卡片 - 修复PJAX加载问题
(function() {
  // 分类配置
  const categoryConfig = {
    'Math': {
      title: '数学探索',
      icon: '🧮',
      desc: '深入数学的美妙世界，从基础概念到高深理论，记录在数学学习路上的思考与发现'
    },
    '技术折腾': {
      title: '技术折腾',
      icon: '💻',
      desc: '技术学习与实践记录，包括编程技巧、工具使用、博客优化等技术相关内容'
    },
    'English': {
      title: '语言学习',
      icon: '🗣️',
      desc: '英语学习心得与日常练习，记录语言能力提升的点点滴滴'
    },
    'AI': {
      title: '人工智能',
      icon: '🤖',
      desc: 'AI技术学习与应用实践，探索人工智能在学习和工作中的可能性'
    },
    'LaTeX': {
      title: '排版艺术',
      icon: '📝',
      desc: 'LaTeX学习与使用技巧，追求完美的数学公式和文档排版效果'
    },
    '技术测试': {
      title: '技术测试',
      icon: '🧪',
      desc: '各种技术测试与实验，记录探索过程中的尝试与发现'
    }
  };

  // 分类文章数量（静态配置，避免重复加载闪烁）
  const categoryCounts = {
    'Math': 2,
    '技术折腾': 3,
    'English': 7,
    'AI': 2,
    'LaTeX': 1,
    '技术测试': 1
  };

  let initialized = false;

  function initCategories() {
    const container = document.getElementById('dynamic-categories');
    if (!container) {
      console.log('容器未找到，等待重试');
      return false;
    }
    
    // 检查是否已经有内容了（防止重复初始化）
    if (container.children.length > 0 && initialized) {
      console.log('内容已存在，跳过初始化');
      return true;
    }
    
    console.log('开始初始化分类页面');
    
    // 清空容器
    container.innerHTML = '';
    
    // 生成分类卡片
    Object.entries(categoryConfig).forEach(([key, config]) => {
      const categoryItem = document.createElement('div');
      categoryItem.className = 'category-item';
      
      // 直接使用静态数量，避免闪烁
      const count = categoryCounts[key] || 0;
      
      categoryItem.innerHTML = `
        <div class="category-header">
          <span class="category-icon">${config.icon}</span>
          <h4 class="category-title">${config.title}</h4>
          <span class="category-count">${count}篇</span>
        </div>
        <p class="category-desc">${config.desc}</p>
        <a href="/categories/${encodeURIComponent(key)}/" class="category-link">进入分类 →</a>
      `;
      
      container.appendChild(categoryItem);
    });

    initialized = true;
    console.log('分类页面初始化完成，生成了', Object.keys(categoryConfig).length, '个分类');
    return true;
  }

  // 多重初始化策略 - 确保各种情况下都能成功加载
  function startInitialization() {
    // 立即尝试初始化
    if (initCategories()) {
      console.log('立即初始化成功');
      return;
    }
    
    // 如果立即初始化失败，设置重试机制
    let retryCount = 0;
    const maxRetries = 20; // 增加重试次数
    const retryInterval = setInterval(() => {
      retryCount++;
      console.log(`第${retryCount}次重试初始化`);
      
      if (initCategories()) {
        console.log('重试初始化成功');
        clearInterval(retryInterval);
      } else if (retryCount >= maxRetries) {
        console.error('初始化失败，已达到最大重试次数');
        clearInterval(retryInterval);
      }
    }, 100); // 缩短重试间隔到100ms
  }

  // 多种初始化时机
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInitialization);
  } else {
    startInitialization();
  }
  
  // 立即初始化备份
  setTimeout(startInitialization, 0);
  
  // 延迟初始化备份
  setTimeout(() => {
    if (!initialized) {
      console.log('延迟备份初始化启动');
      startInitialization();
    }
  }, 200);
  
  // 更长延迟的备份
  setTimeout(() => {
    if (!initialized) {
      console.log('长延迟备份初始化启动');
      startInitialization();
    }
  }, 500);
  
  // PJAX 兼容性 - 重置初始化状态并重新初始化
  document.addEventListener('pjax:start', () => {
    console.log('PJAX导航开始，重置状态');
    initialized = false;
  });
  
  document.addEventListener('pjax:complete', () => {
    console.log('PJAX导航完成，开始重新初始化');
    setTimeout(startInitialization, 0);
  });
  
  document.addEventListener('pjax:success', () => {
    console.log('PJAX导航成功，开始重新初始化');
    setTimeout(startInitialization, 0);
  });
  
  // Next.js兼容
  if (window.NexT && window.NexT.utils) {
    window.NexT.utils.registerExtURL();
  }
})();
</script>

<style>
.categories-overview {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.category-item {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.category-item:hover {
  border-color: #2c3e50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.75rem;
}

.category-icon {
  font-size: 1.25rem;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0;
  flex: 1;
}

.category-count {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.category-desc {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
  font-size: 0.9rem;
}

.category-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.category-link:hover {
  border-bottom-color: #2c3e50;
}

/* 暗色模式适配 */
[data-theme="dark"] .category-item {
  background: #1f2937;
  border-color: #374151;
}

[data-theme="dark"] .category-item:hover {
  border-color: #9ca3af;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .category-title {
  color: #f9fafb;
}

[data-theme="dark"] .category-desc {
  color: #d1d5db;
}

[data-theme="dark"] .category-link {
  color: #e5e7eb;
}

[data-theme="dark"] .category-link:hover {
  border-bottom-color: #e5e7eb;
}

[data-theme="dark"] .category-count {
  background: #374151;
  color: #d1d5db;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .category-item {
    padding: 1rem;
  }
}
</style>
