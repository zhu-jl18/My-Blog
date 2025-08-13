# 🎵 GitHub CDN 音乐库设置指南

## 📋 概述

本指南将帮助您设置自己的GitHub CDN仓库，用于存储和播放博客音乐，避免外部链接的不稳定性。

## 🚀 步骤1：创建GitHub仓库

1. **登录GitHub**，点击右上角的 `+` 号，选择 `New repository`
2. **仓库设置**：
   - Repository name: `blog-music-cdn` (或您喜欢的名称)
   - Description: `Blog Music CDN Repository`
   - 选择 `Public` (公开，这样CDN才能访问)
   - 不要勾选 `Add a README file`
3. 点击 `Create repository`

## 📁 步骤2：上传音乐文件

### 方法一：使用GitHub Web界面
1. 在仓库页面点击 `uploading an existing file`
2. 将音乐文件拖拽到上传区域
3. 建议创建文件夹结构：
   ```
   music/
   ├── classical/
   │   ├── bach-air.mp3
   │   ├── mozart-serenade.mp3
   │   └── ...
   ├── ambient/
   │   ├── acoustic-breeze.mp3
   │   ├── new-beginning.mp3
   │   └── ...
   └── instrumental/
       ├── ukulele.mp3
       ├── sweet.mp3
       └── ...
   ```

### 方法二：使用Git命令行
```bash
# 克隆仓库
git clone https://github.com/您的用户名/blog-music-cdn.git
cd blog-music-cdn

# 创建文件夹结构
mkdir -p music/{classical,ambient,instrumental}

# 复制音乐文件到相应文件夹
# 然后提交
git add .
git commit -m "Add music files"
git push origin main
```

## 🔗 步骤3：获取CDN链接

GitHub CDN链接格式：
```
https://raw.githubusercontent.com/用户名/仓库名/分支名/文件路径
```

例如：
```
https://raw.githubusercontent.com/yourusername/blog-music-cdn/main/music/ambient/acoustic-breeze.mp3
```

## ⚙️ 步骤4：更新配置文件

编辑 `source/js/music-config.js`，将音乐URL替换为您的GitHub CDN链接：

```javascript
window.MusicConfig = {
  playlistId: 'mixed',
  
  fallbackPlaylist: [
    {
      id: '1',
      title: 'Acoustic Breeze',
      artist: 'Bensound',
      album: 'Relaxing Music',
      duration: 240000,
      url: 'https://raw.githubusercontent.com/您的用户名/blog-music-cdn/main/music/ambient/acoustic-breeze.mp3'
    },
    {
      id: '2',
      title: 'A New Beginning',
      artist: 'Bensound',
      album: 'Inspirational',
      duration: 200000,
      url: 'https://raw.githubusercontent.com/您的用户名/blog-music-cdn/main/music/ambient/new-beginning.mp3'
    },
    // ... 更多音乐
  ],
  
  // 其他配置保持不变
  defaultVolume: 0.5,
  autoPlay: false,
  loop: true,
  shuffle: false
};
```

## 🎼 推荐音乐资源

### 免费音乐网站
1. **Bensound** - 高质量免费音乐
2. **Free Music Archive** - 大量免费音乐
3. **Incompetech** - Kevin MacLeod的免费音乐
4. **ccMixter** - Creative Commons音乐

### 古典音乐推荐
- Bach - Air on the G String
- Mozart - Eine Kleine Nachtmusik
- Beethoven - Moonlight Sonata
- Debussy - Clair de Lune
- Chopin - Nocturne in E-flat

### 轻音乐推荐
- Yiruma - River Flows In You
- Ludovico Einaudi - Experience
- Max Richter - On the Nature of Daylight
- Ólafur Arnalds - Near Light

## 🔧 高级配置

### 自动播放列表生成
您可以创建一个脚本来自动生成播放列表：

```javascript
// 自动生成播放列表的示例
function generatePlaylist(baseUrl, musicList) {
  return musicList.map((music, index) => ({
    id: String(index + 1),
    title: music.title,
    artist: music.artist,
    album: music.album,
    duration: music.duration,
    url: `${baseUrl}/${music.filename}`
  }));
}

const baseUrl = 'https://raw.githubusercontent.com/您的用户名/blog-music-cdn/main/music';
const musicList = [
  { title: 'Acoustic Breeze', artist: 'Bensound', album: 'Relaxing', duration: 240000, filename: 'ambient/acoustic-breeze.mp3' },
  // ... 更多音乐
];

window.MusicConfig.fallbackPlaylist = generatePlaylist(baseUrl, musicList);
```

### 音乐分类
您可以根据不同场景创建不同的播放列表：

```javascript
window.MusicPlaylists = {
  relaxing: [
    // 放松音乐
  ],
  focus: [
    // 专注音乐
  ],
  classical: [
    // 古典音乐
  ],
  ambient: [
    // 环境音乐
  ]
};
```

## ⚠️ 注意事项

1. **文件大小**：GitHub对单个文件有100MB限制
2. **带宽限制**：GitHub CDN有带宽限制，如果访问量很大可能需要考虑其他CDN
3. **版权问题**：确保您上传的音乐有合法的使用权限
4. **备份**：建议定期备份您的音乐文件

## 🎯 优势

- ✅ **稳定性**：不依赖外部网站
- ✅ **速度**：GitHub CDN全球加速
- ✅ **控制**：完全控制音乐内容
- ✅ **免费**：GitHub提供免费CDN服务
- ✅ **版本控制**：可以管理不同版本的音乐

---

*享受您的专属音乐时光！* 🎶
