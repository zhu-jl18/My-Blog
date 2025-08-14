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
// 动态生成分类卡片 - 优化版本，确保首次加载成功
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

  let isInitialized = false;

  function generateCategories() {
    const container = document.getElementById('dynamic-categories');
    if (!container) {
      console.log('[Categories] 容器未找到');
      return false;
    }
    
    // 如果已经初始化且容器有内容，跳过
    if (isInitialized && container.children.length > 0) {
      console.log('[Categories] 已初始化，跳过');
      return true;
    }
    
    console.log('[Categories] 开始生成分类内容');
    
    // 强制确保容器可见
    container.style.minHeight = '200px';
    container.style.display = 'grid';
    
    // 清空现有内容
    container.innerHTML = '';
    
    // 生成HTML字符串，一次性插入DOM
    let htmlContent = '';
    Object.entries(categoryConfig).forEach(([key, config]) => {
      const count = categoryCounts[key] || 0;
      htmlContent += `
        <div class="category-item" style="opacity: 1; transform: none;">
          <div class="category-header">
            <span class="category-icon">${config.icon}</span>
            <h4 class="category-title">${config.title}</h4>
            <span class="category-count">${count}篇</span>
          </div>
          <p class="category-desc">${config.desc}</p>
          <a href="/categories/${encodeURIComponent(key)}/" class="category-link">进入分类 →</a>
        </div>
      `;
    });
    
    // 一次性插入所有内容
    container.innerHTML = htmlContent;
    
    // 强制重绘
    container.offsetHeight;
    
    isInitialized = true;
    console.log('[Categories] 分类内容生成完成，共', Object.keys(categoryConfig).length, '个分类');
    return true;
  }

  // 初始化函数
  function initializeCategories() {
    // 确保DOM准备就绪
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', generateCategories);
      return;
    }
    
    // 立即尝试生成
    if (generateCategories()) {
      return;
    }
    
    // 如果失败，使用定时器重试
    let attempts = 0;
    const maxAttempts = 10;
    const retryInterval = setInterval(() => {
      attempts++;
      console.log(`[Categories] 重试第${attempts}次`);
      
      if (generateCategories() || attempts >= maxAttempts) {
        clearInterval(retryInterval);
        if (attempts >= maxAttempts) {
          console.error('[Categories] 初始化失败，已达最大重试次数');
        }
      }
    }, 200);
  }

  // PJAX兼容性处理
  document.addEventListener('pjax:start', () => {
    console.log('[Categories] PJAX开始，重置状态');
    isInitialized = false;
  });
  
  document.addEventListener('pjax:complete', () => {
    console.log('[Categories] PJAX完成，重新初始化');
    setTimeout(initializeCategories, 100);
  });
  
  document.addEventListener('pjax:success', () => {
    console.log('[Categories] PJAX成功，重新初始化');
    setTimeout(initializeCategories, 100);
  });

  // 页面可见性变化时重新检查
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !isInitialized) {
      console.log('[Categories] 页面变为可见，尝试初始化');
      setTimeout(initializeCategories, 100);
    }
  });

  // 立即开始初始化
  initializeCategories();
  
  // 备用初始化（确保在所有情况下都能工作）
  setTimeout(() => {
    if (!isInitialized) {
      console.log('[Categories] 备用初始化启动');
      initializeCategories();
    }
  }, 1000);
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
