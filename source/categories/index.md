---
title: 📚 学习分类目录
date: 2021-03-20 22:25:39
type: categories
comments: false
---

<div class="categories-intro">
  <h2>🎓 我的学习领域</h2>
  <p>记录不同领域的学习心得与成长轨迹，每个分类都是我探索知识海洋的一个方向。</p>
</div>

<div class="categories-stats">
  <div class="stats-card">
    <h3>📊 学习统计</h3>
    <div class="stats-grid">
      <div class="stat-item">
        <span class="stat-icon">📖</span>
        <span class="stat-label">总文章</span>
        <span class="stat-value" id="total-posts">{{ site.posts.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">📁</span>
        <span class="stat-label">分类数</span>
        <span class="stat-value" id="total-categories">{{ site.categories.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-icon">🏷️</span>
        <span class="stat-label">标签数</span>
        <span class="stat-value" id="total-tags">{{ site.tags.length }}</span>
      </div>
    </div>
  </div>
</div>

<div class="category-descriptions">
  <h3>🗂️ 分类说明</h3>
  
  <div class="category-card math">
    <div class="category-header">
      <span class="category-icon">🧮</span>
      <h4>Math - 数学探索</h4>
    </div>
    <p>深入数学的美妙世界，从基础概念到高深理论，记录我在数学学习路上的思考与发现。</p>
    <div class="category-tags">
      <span class="tag">线性代数</span>
      <span class="tag">微积分</span>
      <span class="tag">数学分析</span>
    </div>
  </div>
  
  <div class="category-card tech">
    <div class="category-header">
      <span class="category-icon">💻</span>
      <h4>技术折腾 - Tech Exploration</h4>
    </div>
    <p>技术学习与实践记录，包括编程技巧、工具使用、博客优化等技术相关内容。</p>
    <div class="category-tags">
      <span class="tag">博客优化</span>
      <span class="tag">AI协作</span>
      <span class="tag">前端开发</span>
    </div>
  </div>
  
  <div class="category-card language">
    <div class="category-header">
      <span class="category-icon">🗣️</span>
      <h4>English - 语言学习</h4>
    </div>
    <p>英语学习心得与日常练习，记录语言能力提升的点点滴滴。</p>
    <div class="category-tags">
      <span class="tag">日常学习</span>
      <span class="tag">语法总结</span>
      <span class="tag">口语练习</span>
    </div>
  </div>
  
  <div class="category-card ai">
    <div class="category-header">
      <span class="category-icon">🤖</span>
      <h4>AI - 人工智能</h4>
    </div>
    <p>AI技术学习与应用实践，探索人工智能在学习和工作中的可能性。</p>
    <div class="category-tags">
      <span class="tag">大语言模型</span>
      <span class="tag">AI工具</span>
      <span class="tag">技术研究</span>
    </div>
  </div>
  
  <div class="category-card latex">
    <div class="category-header">
      <span class="category-icon">📝</span>
      <h4>LaTeX - 排版艺术</h4>
    </div>
    <p>LaTeX学习与使用技巧，追求完美的数学公式和文档排版效果。</p>
    <div class="category-tags">
      <span class="tag">数学排版</span>
      <span class="tag">文档设计</span>
      <span class="tag">效率优化</span>
    </div>
  </div>
</div>

<style>
.categories-intro {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.categories-stats {
  margin: 2rem 0;
}

.stats-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.stat-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.category-descriptions {
  margin: 2rem 0;
}

.category-card {
  margin: 1.5rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.category-card.math {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
}

.category-card.tech {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.category-card.language {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.category-card.ai {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.category-card.latex {
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.category-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
}

.category-header h4 {
  margin: 0;
  font-size: 1.2rem;
}

.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.category-card.ai .tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* 暗黑模式适配 */
[data-theme="dark"] .stats-card {
  background: #2d3748;
}

[data-theme="dark"] .stat-item {
  background: #4a5568;
  color: #e2e8f0;
}

[data-theme="dark"] .stat-value {
  color: #e2e8f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .categories-intro {
    padding: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .category-card {
    padding: 1rem;
  }
}
</style>
