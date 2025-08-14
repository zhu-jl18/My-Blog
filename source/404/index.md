---
title: 404 - 页面未找到
date: 2025-08-03 00:29:04
comments: false
---

<div class="not-found-container">
  <h1>🦕 页面走丢了！</h1>
  <p>别担心，来玩个小游戏吧 ~</p>
  <p><strong>按空格键开始/跳跃</strong></p>
  
  <div id="dino-game">
    <canvas id="gameCanvas" width="800" height="200"></canvas>
    <div id="score">得分: 0</div>
    <div id="gameOver" style="display: none;">
      <h3>游戏结束！</h3>
      <p>按空格键重新开始</p>
    </div>
  </div>
</div>

<style>
.not-found-container {
  text-align: center;
  padding: 2rem 1rem;
  max-width: 900px;
  margin: 0 auto;
}

#dino-game {
  margin: 2rem auto;
  position: relative;
}

#gameCanvas {
  border: 2px solid #ccc;
  display: block;
  margin: 0 auto;
  background: linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%);
}

#score {
  font-size: 1.2em;
  font-weight: bold;
  margin: 1rem 0;
  color: #333;
}

#gameOver {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

[data-theme="dark"] #gameCanvas {
  border-color: #555;
  background: linear-gradient(to bottom, #2c3e50 0%, #34495e 100%);
}

[data-theme="dark"] #score {
  color: #fff;
}
</style>

<script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

let game = {
  running: false,
  score: 0,
  speed: 4
};

let dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  dy: 0,
  jumpHeight: 15,
  grounded: true
};

let obstacles = [];
let ground = canvas.height - 20;

function drawDino() {
  ctx.fillStyle = '#228B22';
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
  
  // 简单的恐龙眼睛
  ctx.fillStyle = '#000';
  ctx.fillRect(dino.x + 25, dino.y + 10, 5, 5);
  
  // 恐龙腿部
  ctx.fillStyle = '#228B22';
  ctx.fillRect(dino.x + 5, dino.y + 35, 8, 15);
  ctx.fillRect(dino.x + 25, dino.y + 35, 8, 15);
}

function drawObstacle(obstacle) {
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function drawGround() {
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, ground, canvas.width, 20);
}

function createObstacle() {
  obstacles.push({
    x: canvas.width,
    y: ground - 30,
    width: 20,
    height: 30
  });
}

function updateGame() {
  if (!game.running) return;
  
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 更新恐龙位置
  if (!dino.grounded) {
    dino.dy += 0.8; // 重力
    dino.y += dino.dy;
    
    if (dino.y >= ground - dino.height) {
      dino.y = ground - dino.height;
      dino.grounded = true;
      dino.dy = 0;
    }
  }
  
  // 更新障碍物
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].x -= game.speed;
    
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      game.score += 10;
    }
  }
  
  // 碰撞检测
  for (let obstacle of obstacles) {
    if (dino.x < obstacle.x + obstacle.width &&
        dino.x + dino.width > obstacle.x &&
        dino.y < obstacle.y + obstacle.height &&
        dino.y + dino.height > obstacle.y) {
      gameOver();
      return;
    }
  }
  
  // 生成新障碍物
  if (Math.random() < 0.005) {
    createObstacle();
  }
  
  // 绘制所有元素
  drawGround();
  drawDino();
  for (let obstacle of obstacles) {
    drawObstacle(obstacle);
  }
  
  // 更新得分
  scoreElement.textContent = `得分: ${game.score}`;
  
  // 增加游戏速度
  if (game.score > 0 && game.score % 100 === 0) {
    game.speed += 0.1;
  }
  
  requestAnimationFrame(updateGame);
}

function jump() {
  if (dino.grounded) {
    dino.dy = -dino.jumpHeight;
    dino.grounded = false;
  }
}

function startGame() {
  game.running = true;
  game.score = 0;
  game.speed = 4;
  obstacles = [];
  dino.y = ground - dino.height;
  dino.grounded = true;
  dino.dy = 0;
  gameOverElement.style.display = 'none';
  updateGame();
}

function gameOver() {
  game.running = false;
  gameOverElement.style.display = 'block';
}

// 键盘事件
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    e.preventDefault();
    if (game.running) {
      jump();
    } else {
      startGame();
    }
  }
});

// 初始绘制
drawGround();
drawDino();
</script>

<div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
  <h3>🏠 返回主页</h3>
  <p><a href="/">← 回到首页</a> | <a href="/archives/">查看文章</a></p>
</div>
