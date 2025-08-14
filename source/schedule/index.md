---
title: 📅 我的学习日程
date: 2025-08-03 00:25:15
type: schedule
comments: false
---

<div class="schedule-intro">
  <h2>🎯 学习与成长计划</h2>
  <p>记录我的学习安排、重要事件和成长里程碑，让时间更有意义。</p>
</div>

<div class="schedule-dashboard">
  <div class="dashboard-grid">
    <div class="dashboard-card today">
      <div class="card-header">
        <span class="card-icon">📅</span>
        <h3>今日安排</h3>
      </div>
      <div class="card-content" id="today-events">
        <div class="loading">📡 正在加载今日日程...</div>
      </div>
    </div>
    
    <div class="dashboard-card upcoming">
      <div class="card-header">
        <span class="card-icon">⏰</span>
        <h3>即将到来</h3>
      </div>
      <div class="card-content" id="upcoming-events">
        <div class="loading">📡 正在加载即将到来的事件...</div>
      </div>
    </div>
    
    <div class="dashboard-card stats">
      <div class="card-header">
        <span class="card-icon">📊</span>
        <h3>本月统计</h3>
      </div>
      <div class="card-content">
        <div class="stat-row">
          <span class="stat-label">📚 学习时间</span>
          <span class="stat-value" id="study-hours">-- 小时</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">🎯 完成事件</span>
          <span class="stat-value" id="completed-events">-- 个</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">⭐ 重要事件</span>
          <span class="stat-value" id="important-events">-- 个</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="schedule-categories">
  <h3>📋 日程分类</h3>
  <div class="category-filters">
    <button class="category-btn active" data-category="all">全部</button>
    <button class="category-btn" data-category="study">📚 学习</button>
    <button class="category-btn" data-category="work">💼 工作</button>
    <button class="category-btn" data-category="personal">🏠 个人</button>
    <button class="category-btn" data-category="milestone">🏆 里程碑</button>
  </div>
</div>

<div class="schedule-timeline">
  <h3>📅 时间轴视图</h3>
  <div class="timeline-controls">
    <button class="timeline-btn" data-view="week">本周</button>
    <button class="timeline-btn active" data-view="month">本月</button>
    <button class="timeline-btn" data-view="year">本年</button>
  </div>
  <div id="timeline-container">
    <div class="loading">📡 正在加载时间轴...</div>
  </div>
</div>

<div class="achievement-section">
  <h3>🏆 成长里程碑</h3>
  <div class="achievement-grid" id="achievements">
    <div class="achievement-card completed">
      <div class="achievement-icon">🎓</div>
      <div class="achievement-content">
        <h4>博客功能升级</h4>
        <p>成功添加7个新功能</p>
        <span class="achievement-date">2025-08-13</span>
      </div>
    </div>
    
    <div class="achievement-card completed">
      <div class="achievement-icon">🧮</div>
      <div class="achievement-content">
        <h4>数学学习</h4>
        <p>完成对偶性理论学习</p>
        <span class="achievement-date">2025-08-01</span>
      </div>
    </div>
    
    <div class="achievement-card in-progress">
      <div class="achievement-icon">🤖</div>
      <div class="achievement-content">
        <h4>AI工具应用</h4>
        <p>探索AI在学习中的应用</p>
        <span class="achievement-date">进行中</span>
      </div>
    </div>
  </div>
</div>

<style>
.schedule-intro {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.schedule-dashboard {
  margin: 2rem 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.dashboard-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.dashboard-card.today {
  border-left: 4px solid #4ade80;
}

.dashboard-card.upcoming {
  border-left: 4px solid #f59e0b;
}

.dashboard-card.stats {
  border-left: 4px solid #8b5cf6;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
}

.card-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #374151;
}

.loading {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 1rem 0;
}

.event-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.event-item:last-child {
  border-bottom: none;
}

.event-title {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.event-time {
  font-size: 0.875rem;
  color: #6b7280;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.stat-label {
  color: #6b7280;
  font-size: 0.9rem;
}

.stat-value {
  font-weight: bold;
  color: #374151;
  font-size: 1.1rem;
}

.schedule-categories,
.schedule-timeline {
  margin: 2rem 0;
}

.category-filters,
.timeline-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.category-btn,
.timeline-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.category-btn:hover,
.timeline-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.category-btn.active,
.timeline-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

#timeline-container {
  margin-top: 1.5rem;
  min-height: 300px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

.achievement-section {
  margin: 2rem 0;
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.achievement-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.achievement-card:hover {
  transform: translateY(-2px);
}

.achievement-card.completed {
  border-left: 4px solid #10b981;
}

.achievement-card.in-progress {
  border-left: 4px solid #f59e0b;
}

.achievement-icon {
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.achievement-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: #374151;
}

.achievement-content p {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.achievement-date {
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
}

/* 暗黑模式适配 */
[data-theme="dark"] .dashboard-card,
[data-theme="dark"] #timeline-container,
[data-theme="dark"] .achievement-card {
  background: #2d3748;
  color: #e2e8f0;
}

[data-theme="dark"] .card-header h3,
[data-theme="dark"] .event-title,
[data-theme="dark"] .stat-value,
[data-theme="dark"] .achievement-content h4 {
  color: #e2e8f0;
}

[data-theme="dark"] .category-btn,
[data-theme="dark"] .timeline-btn {
  background: #2d3748;
  border-color: #4a5568;
  color: #e2e8f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .schedule-intro {
    padding: 1.5rem;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .category-filters,
  .timeline-controls {
    justify-content: flex-start;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 模拟加载今日事件
  setTimeout(() => {
    const todayEventsContainer = document.getElementById('today-events');
    todayEventsContainer.innerHTML = `
      <div class="event-item">
        <div class="event-title">📚 数学分析学习</div>
        <div class="event-time">09:00 - 11:00</div>
      </div>
      <div class="event-item">
        <div class="event-title">💻 博客功能测试</div>
        <div class="event-time">14:00 - 16:00</div>
      </div>
      <div class="event-item">
        <div class="event-title">🤖 AI工具探索</div>
        <div class="event-time">19:00 - 21:00</div>
      </div>
    `;
  }, 1000);
  
  // 模拟加载即将到来的事件
  setTimeout(() => {
    const upcomingEventsContainer = document.getElementById('upcoming-events');
    upcomingEventsContainer.innerHTML = `
      <div class="event-item">
        <div class="event-title">🎯 博客文章撰写</div>
        <div class="event-time">明天 10:00</div>
      </div>
      <div class="event-item">
        <div class="event-title">📖 英语口语练习</div>
        <div class="event-time">后天 15:00</div>
      </div>
      <div class="event-item">
        <div class="event-title">🏆 月度学习总结</div>
        <div class="event-time">本月底</div>
      </div>
    `;
  }, 1500);
  
  // 模拟统计数据
  setTimeout(() => {
    document.getElementById('study-hours').textContent = '45 小时';
    document.getElementById('completed-events').textContent = '12 个';
    document.getElementById('important-events').textContent = '3 个';
  }, 800);
  
  // 模拟时间轴加载
  setTimeout(() => {
    const timelineContainer = document.getElementById('timeline-container');
    timelineContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 2rem; margin-bottom: 1rem;">📊</div>
        <h4>本月学习时间分布</h4>
        <div style="margin-top: 1rem; color: #6b7280;">
          <p>📚 数学学习: 18小时</p>
          <p>💻 技术实践: 15小时</p>
          <p>🗣️ 语言学习: 8小时</p>
          <p>🤖 AI探索: 4小时</p>
        </div>
      </div>
    `;
  }, 2000);
  
  // 分类过滤功能
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      categoryBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.getAttribute('data-category');
      console.log(`切换到分类: ${category}`);
      // 这里可以添加实际的过滤逻辑
    });
  });
  
  // 时间轴视图切换
  const timelineBtns = document.querySelectorAll('.timeline-btn');
  timelineBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      timelineBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const view = this.getAttribute('data-view');
      console.log(`切换到视图: ${view}`);
      // 这里可以添加实际的视图切换逻辑
    });
  });
  
  // Google Calendar API集成 (需要实际的API密钥和配置)
  // 这里可以添加真实的Google Calendar数据获取逻辑
});
</script>
