---
title: 📖 文章归档
date: 2025-08-13 10:40:00
type: archives
comments: false
---

<div class="archives-intro">
  <h2>📚 我的学习足迹</h2>
  <p>时间记录着每一次思考，文字见证着每一步成长。在这里探索我的知识轨迹。</p>
</div>

<div class="archives-stats">
  <div class="stats-container">
    <div class="stat-item">
      <div class="stat-icon">📝</div>
      <div class="stat-content">
        <span class="stat-number" id="total-posts">{{ site.posts.length }}</span>
        <span class="stat-label">篇文章</span>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">📅</div>
      <div class="stat-content">
        <span class="stat-number" id="total-years">4</span>
        <span class="stat-label">年历程</span>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">📚</div>
      <div class="stat-content">
        <span class="stat-number" id="total-words">0</span>
        <span class="stat-label">字符</span>
      </div>
    </div>
    <div class="stat-item">
      <div class="stat-icon">⏱️</div>
      <div class="stat-content">
        <span class="stat-number" id="read-time">0</span>
        <span class="stat-label">分钟阅读</span>
      </div>
    </div>
  </div>
</div>

<div class="archives-timeline">
  <h3>⏰ 按年份浏览</h3>
  <div class="year-tabs">
    <button class="year-tab active" data-year="all">全部</button>
    <button class="year-tab" data-year="2025">2025</button>
    <button class="year-tab" data-year="2024">2024</button>
    <button class="year-tab" data-year="2023">2023</button>
  </div>
</div>

<div class="elegant-archives">
  <div class="archives-container" id="archives-list">
    <!-- 这里将显示文章列表，使用与首页相同的优美样式 -->
    <div class="loading-placeholder">
      <div class="loading-spinner"></div>
      <p>正在加载文章归档...</p>
    </div>
  </div>
</div>

<style>
/* 归档页面样式 - 采用与首页一致的优美设计 */
.archives-intro {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.archives-intro h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.archives-intro p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
  line-height: 1.5;
}

/* 统计卡片样式 */
.archives-stats {
  margin: 2rem 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.stat-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

/* 年份标签页 */
.archives-timeline {
  margin: 2rem 0;
  text-align: center;
}

.year-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.year-tab {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.year-tab:hover {
  border-color: #667eea;
  color: #667eea;
}

.year-tab.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* 文章列表容器 */
.elegant-archives {
  margin: 2rem 0;
}

.archives-container {
  max-width: 800px;
  margin: 0 auto;
}

/* 文章卡片样式 - 与首页保持一致 */
.archive-post {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.archive-post::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #8b5cf6, #f59e0b);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}

.archive-post:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.archive-post:hover::before {
  transform: scaleX(1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.post-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  margin: 0;
  flex: 1;
  line-height: 1.4;
}

.post-title:hover {
  color: #667eea;
}

.post-date {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 1rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-item i {
  color: #667eea;
  font-size: 0.9rem;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background: #667eea;
  color: white;
}

/* 年份分组标题 */
.year-group {
  margin: 2rem 0 1rem 0;
  position: relative;
}

.year-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
}

.year-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #8b5cf6);
  border-radius: 1px;
}

/* 加载状态 */
.loading-placeholder {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 暗黑模式适配 */
[data-theme="dark"] .archive-post,
[data-theme="dark"] .stat-item {
  background: #2d3748;
  color: #e2e8f0;
  border-left-color: #667eea;
}

[data-theme="dark"] .post-title {
  color: #e2e8f0;
}

[data-theme="dark"] .post-title:hover {
  color: #667eea;
}

[data-theme="dark"] .post-excerpt {
  color: #a0aec0;
}

[data-theme="dark"] .post-meta {
  color: #a0aec0;
}

[data-theme="dark"] .year-tab {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

[data-theme="dark"] .post-tag {
  background: #4a5568;
  color: #e2e8f0;
}

[data-theme="dark"] .year-title {
  color: #e2e8f0;
}

[data-theme="dark"] .stat-number {
  color: #e2e8f0;
}

[data-theme="dark"] .stat-label {
  color: #a0aec0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .archives-intro {
    padding: 1.5rem;
    margin: 1rem 0;
  }
  
  .archives-intro h2 {
    font-size: 1.5rem;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .stat-item {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.3rem;
  }
  
  .archive-post {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .post-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .post-date {
    margin-left: 0;
    align-self: flex-end;
  }
  
  .post-title {
    font-size: 1.1rem;
  }
  
  .post-meta {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .year-tabs {
    gap: 0.25rem;
  }
  
  .year-tab {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

/* 入场动画 */
.archive-post {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.archive-post:nth-child(1) { animation-delay: 0.1s; }
.archive-post:nth-child(2) { animation-delay: 0.2s; }
.archive-post:nth-child(3) { animation-delay: 0.3s; }
.archive-post:nth-child(4) { animation-delay: 0.4s; }
.archive-post:nth-child(5) { animation-delay: 0.5s; }
.archive-post:nth-child(6) { animation-delay: 0.6s; }
.archive-post:nth-child(7) { animation-delay: 0.7s; }
.archive-post:nth-child(8) { animation-delay: 0.8s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 模拟文章数据和统计信息
  const mockPosts = [
    {
      title: "AI工具在数学学习中的探索与实践",
      date: "2025-08-13",
      year: "2025",
      excerpt: "系统性探索如何使用Claude、ChatGPT等AI工具提升数学学习效率，包括概念理解、证明思路、习题求解等方面的实践心得。",
      tags: ["AI应用", "数学学习", "学习方法"],
      readTime: 8,
      wordCount: 2400
    },
    {
      title: "博客功能全面升级：从单调到丰富的完整改造",
      date: "2025-08-13",
      year: "2025",
      excerpt: "记录为Hexo博客添加7个新功能的完整过程：评论系统、搜索功能、暗黑模式、图片优化、游戏彩蛋等，让静态博客焕发新生机。",
      tags: ["博客优化", "Hexo", "前端开发", "用户体验"],
      readTime: 12,
      wordCount: 3600
    },
    {
      title: "线性代数中的对偶性理论深度解析",
      date: "2025-08-01",
      year: "2025",
      excerpt: "深入探讨线性代数中对偶空间、对偶映射的概念，通过具体例子理解对偶性在数学中的重要作用和几何意义。",
      tags: ["线性代数", "对偶理论", "数学证明"],
      readTime: 15,
      wordCount: 4500
    },
    {
      title: "数学分析学习心得：从极限到积分的思维构建",
      date: "2024-12-15",
      year: "2024",
      excerpt: "总结高等数学学习过程中的核心概念理解，包括极限理论、连续性、微分法、积分法等知识点的深度思考。",
      tags: ["数学分析", "微积分", "学习总结"],
      readTime: 20,
      wordCount: 6000
    },
    {
      title: "个人博客搭建完全指南：Hexo + NexT主题配置",
      date: "2024-10-20",
      year: "2024",
      excerpt: "从零开始搭建个人技术博客的完整教程，包括Hexo安装配置、NexT主题美化、GitHub Pages部署等详细步骤。",
      tags: ["博客搭建", "Hexo", "GitHub Pages"],
      readTime: 10,
      wordCount: 3000
    },
    {
      title: "制定高效学习计划：目标导向的时间管理策略",
      date: "2024-06-01",
      year: "2024",
      excerpt: "分享个人学习规划制定的方法和实践，包括目标设定、时间分配、进度跟踪、效果评估等系统性学习管理思路。",
      tags: ["学习规划", "时间管理", "效率提升"],
      readTime: 6,
      wordCount: 1800
    }
  ];

  // 更新统计数据
  function updateStats() {
    const totalWords = mockPosts.reduce((sum, post) => sum + post.wordCount, 0);
    const totalReadTime = mockPosts.reduce((sum, post) => sum + post.readTime, 0);
    
    document.getElementById('total-posts').textContent = mockPosts.length;
    document.getElementById('total-words').textContent = (totalWords / 1000).toFixed(1) + 'k';
    document.getElementById('read-time').textContent = totalReadTime;
  }

  // 渲染文章列表
  function renderPosts(posts, year = 'all') {
    const container = document.getElementById('archives-list');
    
    // 过滤文章
    const filteredPosts = year === 'all' ? posts : posts.filter(post => post.year === year);
    
    // 按年份分组
    const groupedPosts = {};
    filteredPosts.forEach(post => {
      if (!groupedPosts[post.year]) {
        groupedPosts[post.year] = [];
      }
      groupedPosts[post.year].push(post);
    });
    
    // 生成HTML
    let html = '';
    const years = Object.keys(groupedPosts).sort().reverse();
    
    years.forEach(yearKey => {
      if (year === 'all') {
        html += `<div class="year-group">
          <h3 class="year-title">${yearKey}年</h3>
        </div>`;
      }
      
      groupedPosts[yearKey].forEach(post => {
        html += `
          <article class="archive-post">
            <div class="post-header">
              <h2 class="post-title">${post.title}</h2>
              <div class="post-date">${post.date}</div>
            </div>
            <div class="post-meta">
              <div class="meta-item">
                <i class="far fa-clock"></i>
                <span>${post.readTime}分钟阅读</span>
              </div>
              <div class="meta-item">
                <i class="far fa-file-alt"></i>
                <span>${post.wordCount}字</span>
              </div>
            </div>
            <div class="post-excerpt">${post.excerpt}</div>
            <div class="post-tags">
              ${post.tags.map(tag => `<a href="#" class="post-tag">${tag}</a>`).join('')}
            </div>
          </article>
        `;
      });
    });
    
    container.innerHTML = html;
  }

  // 年份标签页切换
  const yearTabs = document.querySelectorAll('.year-tab');
  yearTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // 更新标签状态
      yearTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // 渲染对应年份的文章
      const year = this.getAttribute('data-year');
      renderPosts(mockPosts, year);
    });
  });

  // 初始化
  setTimeout(() => {
    updateStats();
    renderPosts(mockPosts);
  }, 500);

  // 统计数字动画
  function animateCounter(element, target) {
    const current = 0;
    const increment = target / 30;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const value = Math.floor(increment * step);
      
      if (target.toString().includes('k')) {
        element.textContent = (value / 1000).toFixed(1) + 'k';
      } else {
        element.textContent = value;
      }
      
      if (step >= 30) {
        clearInterval(timer);
        element.textContent = target;
      }
    }, 50);
  }

  // 当统计卡片进入视野时开始动画
  const statNumbers = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const finalValue = element.textContent;
        element.textContent = '0';
        
        setTimeout(() => {
          if (finalValue.includes('k')) {
            animateCounter(element, parseFloat(finalValue) * 1000);
          } else {
            animateCounter(element, parseInt(finalValue));
          }
        }, 200);
        
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(number => observer.observe(number));
});
</script>