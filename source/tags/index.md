---
title: 🏷️ 知识标签云
date: 2025-08-02 22:57:01
type: tags
comments: false
---

<div class="tags-intro">
  <h2>🎯 我的知识图谱</h2>
  <p>用标签串联起知识的脉络，每个标签都是学习路径上的重要节点。</p>
</div>

<div class="tags-search">
  <div class="search-box">
    <input type="text" id="tag-search" placeholder="🔍 搜索标签..." />
    <div class="search-stats">
      <span id="visible-tags">0</span> / <span id="total-tags">0</span> 个标签
    </div>
  </div>
</div>

<div class="tags-categories">
  <h3>📚 按领域分类</h3>
  <div class="filter-buttons">
    <button class="filter-btn active" data-filter="all">全部</button>
    <button class="filter-btn" data-filter="math">🧮 数学</button>
    <button class="filter-btn" data-filter="tech">💻 技术</button>
    <button class="filter-btn" data-filter="ai">🤖 AI</button>
    <button class="filter-btn" data-filter="language">🗣️ 语言</button>
    <button class="filter-btn" data-filter="tools">🛠️ 工具</button>
  </div>
</div>

<div class="tags-visualization">
  <h3>📊 标签热力图</h3>
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

<style>
.tags-intro {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.tags-search {
  margin: 2rem 0;
  text-align: center;
}

.search-box {
  max-width: 400px;
  margin: 0 auto;
}

#tag-search {
  width: 100%;
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

.tags-categories {
  margin: 2rem 0;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
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
  margin: 2rem 0;
}

.heatmap-legend {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
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

/* 暗黑模式适配 */
[data-theme="dark"] #tag-search {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

[data-theme="dark"] .filter-btn {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

[data-theme="dark"] .search-stats,
[data-theme="dark"] .legend-item {
  color: #a0aec0;
}

/* 标签云样式增强 */
.tag-cloud a {
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

.tag-cloud a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.tag-cloud a:hover::before {
  left: 100%;
}

.tag-cloud a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

/* 根据使用频率调整标签大小和颜色 */
.tag-cloud a[data-count="1"] {
  font-size: 0.8rem;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
  color: #4a5568 !important;
}

.tag-cloud a[data-count="2"] {
  font-size: 0.9rem;
  background: linear-gradient(135deg, #ffa726 0%, #ff9800 100%);
}

.tag-cloud a[data-count="3"],
.tag-cloud a[data-count="4"] {
  font-size: 1rem;
  background: linear-gradient(135deg, #ef5350 0%, #f44336 100%);
}

.tag-cloud a[data-count="5"] {
  font-size: 1.1rem;
  background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tags-intro {
    padding: 1.5rem;
  }
  
  .filter-buttons {
    justify-content: flex-start;
  }
  
  .heatmap-legend {
    justify-content: flex-start;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 搜索功能
  const searchInput = document.getElementById('tag-search');
  const tagLinks = document.querySelectorAll('.tag-cloud a');
  const visibleTagsSpan = document.getElementById('visible-tags');
  const totalTagsSpan = document.getElementById('total-tags');
  
  // 初始化统计
  totalTagsSpan.textContent = tagLinks.length;
  visibleTagsSpan.textContent = tagLinks.length;
  
  // 模拟标签数据（实际应该从Hexo数据中获取）
  const tagCategories = {
    'math': ['数学公式', 'duality', 'isomorphism', 'math'],
    'tech': ['Hexo', 'Next主题', '前端', 'CSS优化', '博客优化'],
    'ai': ['AI', 'LLM', 'Gemini', 'AI协作'],
    'language': ['语言学习'],
    'tools': ['LaTeX', 'Pandoc', 'GitHub', '自动化']
  };
  
  // 为标签添加分类属性
  tagLinks.forEach(link => {
    const tagText = link.textContent.trim();
    let category = 'other';
    
    for (const [cat, tags] of Object.entries(tagCategories)) {
      if (tags.some(tag => tagText.includes(tag))) {
        category = cat;
        break;
      }
    }
    
    link.setAttribute('data-category', category);
  });
  
  // 搜索功能
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    let visibleCount = 0;
    
    tagLinks.forEach(link => {
      const tagText = link.textContent.toLowerCase();
      const isVisible = tagText.includes(searchTerm);
      
      link.style.display = isVisible ? 'inline-block' : 'none';
      if (isVisible) visibleCount++;
    });
    
    visibleTagsSpan.textContent = visibleCount;
  });
  
  // 过滤功能
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // 更新按钮状态
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      let visibleCount = 0;
      
      tagLinks.forEach(link => {
        const category = link.getAttribute('data-category');
        const isVisible = filter === 'all' || category === filter;
        
        link.style.display = isVisible ? 'inline-block' : 'none';
        if (isVisible) visibleCount++;
      });
      
      visibleTagsSpan.textContent = visibleCount;
      searchInput.value = ''; // 清空搜索
    });
  });
  
  // 为标签添加使用次数（模拟数据）
  tagLinks.forEach(link => {
    const count = Math.floor(Math.random() * 5) + 1;
    link.setAttribute('data-count', count);
  });
});
</script>
