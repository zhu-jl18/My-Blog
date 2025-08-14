---
title: PJAX测试页面
date: 2025-08-14 11:30:00
comments: true
abbrlink: pjax-test
---

# PJAX测试页面

这个页面用于测试PJAX的行为。

## 测试内容

### 1. 脚本执行测试
<div id="test-result">等待测试...</div>

### 2. PJAX事件监听
<div id="pjax-events">事件监听已启动</div>

<script data-pjax>
// 这个脚本应该在PJAX跳转后执行
console.log('🎯 PJAX脚本执行测试 - 带有data-pjax属性');
document.getElementById('test-result').innerHTML = '✅ 带有data-pjax的脚本执行成功！';
</script>

<script>
// 这个脚本不应该在PJAX跳转后执行
console.log('❌ 普通脚本测试 - 不带data-pjax属性');
if (!document.getElementById('test-result').innerHTML.includes('✅')) {
    document.getElementById('test-result').innerHTML = '❌ 普通脚本执行了（不应该在PJAX后执行）';
}
</script>

<script data-pjax>
// 监听PJAX事件
const events = ['pjax:send', 'pjax:start', 'pjax:success', 'pjax:complete', 'pjax:error'];
const eventLog = [];

events.forEach(eventName => {
    document.addEventListener(eventName, (e) => {
        console.log(`📡 PJAX事件: ${eventName}`);
        eventLog.push(`${eventName}: ${new Date().toLocaleTimeString()}`);
        document.getElementById('pjax-events').innerHTML = 
            '<strong>最近的事件:</strong><br>' + 
            eventLog.slice(-3).join('<br>');
    });
});

// 测试全局变量
window.testPjaxGlobal = '我在PJAX跳转后应该还存在';
</script>

## 测试方法

1. 直接访问这个页面 - 所有脚本都应该执行
2. 从其他页面通过链接点击进入 - 只有带`data-pjax`的脚本应该执行
3. 检查控制台日志和页面显示的结果

## 期望结果

- 带有`data-pjax`属性的脚本：在PJAX跳转后应该执行
- 不带`data-pjax`属性的脚本：只在首次加载时执行
- 全局变量：在PJAX跳转后应该保留