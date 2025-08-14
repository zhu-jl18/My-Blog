---
title: 🗂️ 知识导航
date: 2025-08-13 11:00:00
type: navigation
comments: false
---

<div class="navigation-intro">
  <h2>🧭 探索知识的脉络</h2>
  <p>通过分类和标签，发现知识之间的关联，让学习更加系统化和趣味化。</p>
</div>

<div class="navigation-stats">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon">📁</div>
      <div class="stat-content">
        <span class="stat-number" id="total-categories">5</span>
        <span class="stat-label">个分类</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🏷️</div>
      <div class="stat-content">
        <span class="stat-number" id="total-tags">25</span>
        <span class="stat-label">个标签</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">📖</div>
      <div class="stat-content">
        <span class="stat-number" id="total-posts">18</span>
        <span class="stat-label">篇文章</span>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon">🎯</div>
      <div class="stat-content">
        <span class="stat-number" id="coverage-rate">0%</span>
        <span class="stat-label">分类覆盖</span>
      </div>
    </div>
  </div>
</div>

<div class="navigation-tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="categories">📚 学习分类</button>
    <button class="tab-btn" data-tab="tags">🏷️ 知识标签</button>
  </div>
</div>

<!-- 分类标签页 -->
<div class="tab-content active" id="categories-tab">
  <div class="categories-section">
    <div class="section-header">
      <h3>📊 分类统计概览</h3>
      <p>按学习领域组织的知识体系，每个分类代表一个专门的学习方向</p>
    </div>
    
    <div class="category-cards">
      <div class="category-card math-category">
        <div class="category-header">
          <div class="category-icon">🧮</div>
          <div class="category-info">
            <h4>Math - 数学探索</h4>
            <span class="category-count" id="math-count">0 篇文章</span>
          </div>
        </div>
        <p class="category-description">
          深入数学的美妙世界，从基础概念到高深理论，记录数学学习路上的思考与发现。
        </p>
        <div class="category-topics">
          <span class="topic-tag">线性代数</span>
          <span class="topic-tag">微积分</span>
          <span class="topic-tag">数学分析</span>
          <span class="topic-tag">对偶理论</span>
        </div>
        <div class="category-action">
          <a href="/categories/Math/" class="category-link">探索更多 →</a>
        </div>
      </div>
      
      <div class="category-card tech-category">
        <div class="category-header">
          <div class="category-icon">💻</div>
          <div class="category-info">
            <h4>技术折腾 - Tech Exploration</h4>
            <span class="category-count" id="tech-count">0 篇文章</span>
          </div>
        </div>
        <p class="category-description">
          技术学习与实践记录，包括编程技巧、工具使用、博客优化等技术相关内容。
        </p>
        <div class="category-topics">
          <span class="topic-tag">博客优化</span>
          <span class="topic-tag">AI协作</span>
          <span class="topic-tag">前端开发</span>
          <span class="topic-tag">自动化</span>
        </div>
        <div class="category-action">
          <a href="/categories/技术折腾/" class="category-link">探索更多 →</a>
        </div>
      </div>
      
      <div class="category-card ai-category">
        <div class="category-header">
          <div class="category-icon">🤖</div>
          <div class="category-info">
            <h4>AI - 人工智能</h4>
            <span class="category-count" id="ai-count">0 篇文章</span>
          </div>
        </div>
        <p class="category-description">
          AI技术学习与应用实践，探索人工智能在学习和工作中的可能性。
        </p>
        <div class="category-topics">
          <span class="topic-tag">大语言模型</span>
          <span class="topic-tag">AI工具</span>
          <span class="topic-tag">技术研究</span>
          <span class="topic-tag">应用实践</span>
        </div>
        <div class="category-action">
          <a href="/categories/AI/" class="category-link">探索更多 →</a>
        </div>
      </div>
      
      <div class="category-card language-category">
        <div class="category-header">
          <div class="category-icon">🗣️</div>
          <div class="category-info">
            <h4>English - 语言学习</h4>
            <span class="category-count" id="english-count">0 篇文章</span>
          </div>
        </div>
        <p class="category-description">
          英语学习心得与日常练习，记录语言能力提升的点点滴滴。
        </p>
        <div class="category-topics">
          <span class="topic-tag">日常学习</span>
          <span class="topic-tag">语法总结</span>
          <span class="topic-tag">口语练习</span>
          <span class="topic-tag">阅读理解</span>
        </div>
        <div class="category-action">
          <a href="/categories/English/" class="category-link">探索更多 →</a>
        </div>
      </div>
      
      <div class="category-card latex-category">
        <div class="category-header">
          <div class="category-icon">📝</div>
          <div class="category-info">
            <h4>LaTeX - 排版艺术</h4>
            <span class="category-count" id="latex-count">0 篇文章</span>
          </div>
        </div>
        <p class="category-description">
          LaTeX学习与使用技巧，追求完美的数学公式和文档排版效果。
        </p>
        <div class="category-topics">
          <span class="topic-tag">数学排版</span>
          <span class="topic-tag">文档设计</span>
          <span class="topic-tag">效率优化</span>
          <span class="topic-tag">模板制作</span>
        </div>
        <div class="category-action">
          <a href="/categories/LaTeX/" class="category-link">探索更多 →</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 标签标签页 -->
<div class="tab-content" id="tags-tab">
  <div class="tags-section">
    <div class="section-header">
      <h3>🔍 标签云与搜索</h3>
      <p>用标签串联起知识的脉络，每个标签都是学习路径上的重要节点</p>
    </div>
    
    <div class="tags-controls">
      <div class="search-box">
        <input type="text" id="tag-search" placeholder="🔍 搜索标签..." />
        <div class="search-stats">
          <span id="visible-tags">0</span> / <span id="total-tags-display">0</span> 个标签
        </div>
      </div>
      
      <div class="tag-filters">
        <h4>📚 按领域筛选</h4>
        <div class="filter-buttons">
          <button class="filter-btn active" data-filter="all">全部</button>
          <button class="filter-btn" data-filter="math">🧮 数学</button>
          <button class="filter-btn" data-filter="tech">💻 技术</button>
          <button class="filter-btn" data-filter="ai">🤖 AI</button>
          <button class="filter-btn" data-filter="language">🗣️ 语言</button>
          <button class="filter-btn" data-filter="tools">🛠️ 工具</button>
        </div>
      </div>
    </div>
    
    <div class="tags-visualization">
      <h4>📊 标签热力图</h4>
      <div class="heatmap-legend">
        <span class="legend-item">
          <span class="legend-color cold"></span>
          <span>较少使用</span>
        </span>
        <span class="legend-item">
          <span class="legend-color warm"></span>
          <span>经常使用</span>
        </span>
        <span class="legend-item">
          <span class="legend-color hot"></span>
          <span>频繁使用</span>
        </span>
      </div>
    </div>
    
    <div class="tags-cloud-container">
      <!-- 标签云将由JavaScript动态生成 -->
      <div class="tag-cloud" id="dynamic-tag-cloud">
        <div class="loading">正在加载标签云...</div>
      </div>
    </div>
  </div>
</div>

<style>
/* 知识导航页面样式 */
.navigation-intro {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.navigation-intro h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.navigation-intro p {
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
  line-height: 1.5;
}

/* 统计卡片 */
.navigation-stats {
  margin: 2rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;
}

.stat-card:hover {
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

/* 标签页系统 */
.navigation-tabs {
  margin: 2rem 0;
  text-align: center;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.tab-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.tab-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* 分类卡片样式 */
.categories-section {
  max-width: 1000px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-header h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.section-header p {
  margin: 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  transition: transform 0.3s ease;
  transform: scaleX(0);
  transform-origin: left;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-card.math-category::before {
  background: linear-gradient(90deg, #ff9a9e, #fecfef);
}

.category-card.tech-category::before {
  background: linear-gradient(90deg, #a8edea, #fed6e3);
}

.category-card.ai-category::before {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.category-card.language-category::before {
  background: linear-gradient(90deg, #ffecd2, #fcb69f);
}

.category-card.latex-category::before {
  background: linear-gradient(90deg, #89f7fe, #66a6ff);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.category-icon {
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.category-info h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.category-count {
  font-size: 0.85rem;
  color: #667eea;
  font-weight: 500;
}

.category-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.category-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.topic-tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.category-action {
  text-align: right;
}

.category-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.category-link:hover {
  color: #8b5cf6;
}

/* 标签页样式 */
.tags-section {
  max-width: 800px;
  margin: 0 auto;
}

.tags-controls {
  margin-bottom: 2rem;
}

.search-box {
  text-align: center;
  margin-bottom: 1.5rem;
}

#tag-search {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
}

#tag-search:focus {
  border-color: #667eea;
}

.search-stats {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.tag-filters h4 {
  text-align: center;
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.tags-visualization {
  margin: 1.5rem 0;
  text-align: center;
}

.tags-visualization h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.heatmap-legend {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.cold {
  background: #e2e8f0;
}

.legend-color.warm {
  background: #ffa726;
}

.legend-color.hot {
  background: #ef5350;
}

.tags-cloud-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  margin-top: 1.5rem;
}

/* 标签云样式增强 */
.tags-cloud-container .tag-cloud a {
  display: inline-block;
  margin: 0.25rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white !important;
  text-decoration: none;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tags-cloud-container .tag-cloud a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.tags-cloud-container .tag-cloud a:hover::before {
  left: 100%;
}

.tags-cloud-container .tag-cloud a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

/* 暗黑模式适配 */
[data-theme="dark"] .stat-card,
[data-theme="dark"] .category-card,
[data-theme="dark"] .tags-cloud-container {
  background: #2d3748;
  color: #e2e8f0;
}

[data-theme="dark"] .category-info h4,
[data-theme="dark"] .stat-number,
[data-theme="dark"] .section-header h3 {
  color: #e2e8f0;
}

[data-theme="dark"] .category-description,
[data-theme="dark"] .section-header p,
[data-theme="dark"] .stat-label {
  color: #a0aec0;
}

[data-theme="dark"] .tab-btn,
[data-theme="dark"] .filter-btn {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

[data-theme="dark"] #tag-search {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

[data-theme="dark"] .topic-tag {
  background: #4a5568;
  color: #e2e8f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navigation-intro {
    padding: 1.5rem;
    margin: 1rem 0;
  }
  
  .navigation-intro h2 {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.3rem;
  }
  
  .tab-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .tab-btn {
    width: 200px;
  }
  
  .category-cards {
    grid-template-columns: 1fr;
  }
  
  .category-card {
    padding: 1rem;
  }
  
  .category-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .category-icon {
    margin-right: 0;
  }
  
  .filter-buttons {
    gap: 0.25rem;
  }
  
  .filter-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .heatmap-legend {
    gap: 0.5rem;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 统计数据模拟
  const stats = {
    categories: 5,
    tags: 25,
    posts: 18,
    coverage: 85
  };
  
  // 更新统计数据
  function updateStats() {
    document.getElementById('total-categories').textContent = stats.categories;
    document.getElementById('total-tags').textContent = stats.tags;
    document.getElementById('total-posts').textContent = stats.posts;
    document.getElementById('coverage-rate').textContent = stats.coverage + '%';
    document.getElementById('total-tags-display').textContent = stats.tags;
    document.getElementById('visible-tags').textContent = stats.tags;
  }
  
  // 标签页切换
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // 更新按钮状态
      tabButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 更新内容显示
      tabContents.forEach(content => {
        if (content.id === targetTab + '-tab') {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
  
  // 标签搜索功能 - 修复动态生成问题
  function initializeTagSearch() {
    const searchInput = document.getElementById('tag-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      let visibleCount = 0;
      
      // 重新获取动态生成的标签链接
      const tagLinks = document.querySelectorAll('.tag-cloud a');
      
      tagLinks.forEach(link => {
        const tagText = link.textContent.toLowerCase();
        const isVisible = tagText.includes(searchTerm);
        
        link.style.display = isVisible ? 'inline-block' : 'none';
        if (isVisible) visibleCount++;
      });
      
      document.getElementById('visible-tags').textContent = visibleCount;
    });
  }
  
  // 标签过滤功能 - 修复动态生成问题
  function initializeTagFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // 重新获取动态生成的标签链接并过滤
        const tagLinks = document.querySelectorAll('.tag-cloud-item');
        let visibleCount = 0;
        
        tagLinks.forEach(link => {
          const category = link.getAttribute('data-category');
          const isVisible = filter === 'all' || category === filter;
          
          link.style.display = isVisible ? 'inline-block' : 'none';
          if (isVisible) visibleCount++;
        });
        
        document.getElementById('visible-tags').textContent = visibleCount;
        
        // 清空搜索框
        const searchInput = document.getElementById('tag-search');
        if (searchInput) {
          searchInput.value = '';
        }
      });
    });
  }
  
  // 分类文章数量模拟
  const categoryCounts = {
    'math-count': '8 篇文章',
    'tech-count': '6 篇文章',
    'ai-count': '3 篇文章',
    'english-count': '1 篇文章',
    'latex-count': '2 篇文章'
  };
  
  // 更新分类计数
  Object.keys(categoryCounts).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = categoryCounts[id];
    }
  });
  
  // 生成动态标签云
  function generateTagCloud() {
    const tagCloudContainer = document.getElementById('dynamic-tag-cloud');
    
    // 模拟标签数据
    const tags = [
      { name: '数学公式', count: 8, category: 'math' },
      { name: 'Hexo', count: 6, category: 'tech' },
      { name: 'Next主题', count: 4, category: 'tech' },
      { name: 'AI协作', count: 5, category: 'ai' },
      { name: '前端', count: 3, category: 'tech' },
      { name: 'GitHub', count: 4, category: 'tools' },
      { name: 'LaTeX', count: 7, category: 'tools' },
      { name: 'MathJax', count: 5, category: 'math' },
      { name: '线性代数', count: 3, category: 'math' },
      { name: 'duality', count: 2, category: 'math' },
      { name: 'isomorphism', count: 2, category: 'math' },
      { name: '语言学习', count: 2, category: 'language' },
      { name: 'CSS优化', count: 4, category: 'tech' },
      { name: '博客优化', count: 6, category: 'tech' },
      { name: '自动化', count: 3, category: 'tools' },
      { name: 'AI', count: 4, category: 'ai' },
      { name: 'LLM', count: 3, category: 'ai' },
      { name: 'Gemini', count: 2, category: 'ai' },
      { name: 'Pandoc', count: 2, category: 'tools' },
      { name: '阅读体验', count: 3, category: 'tech' }
    ];
    
    // 生成标签云HTML
    let tagCloudHTML = '';
    tags.forEach(tag => {
      const fontSize = Math.min(0.8 + (tag.count * 0.2), 1.5);
      tagCloudHTML += '<a href="/tags/' + tag.name + '/" class="tag-cloud-item" data-category="' + tag.category + '" data-count="' + tag.count + '" style="font-size: ' + fontSize + 'rem;">' + tag.name + '</a>';
    });
    
    tagCloudContainer.innerHTML = tagCloudHTML;
  }
  
  // 初始化
  setTimeout(() => {
    updateStats();
    generateTagCloud();
    // 标签云生成后初始化搜索和过滤功能
    setTimeout(() => {
      initializeTagSearch();
      initializeTagFilters();
    }, 100);
  }, 300);
  
  // 动画计数
  function animateCounter(element, target) {
    const finalValue = target;
    let current = 0;
    const increment = Math.ceil(finalValue / 20);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        current = finalValue;
        clearInterval(timer);
      }
      
      if (typeof finalValue === 'string' && finalValue.includes('%')) {
        element.textContent = current + '%';
      } else {
        element.textContent = current;
      }
    }, 50);
  }
  
  // 当统计卡片进入视野时开始动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (statNumber) {
          const id = statNumber.id;
          const targetValue = stats[id.replace('total-', '').replace('-rate', '')];
          
          if (id === 'coverage-rate') {
            animateCounter(statNumber, targetValue);
          } else {
            animateCounter(statNumber, targetValue);
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
  });
});
</script>