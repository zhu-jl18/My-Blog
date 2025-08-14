// 简单可靠的GitHub音乐播放器
// 适配现有的HTML结构和样式

class SimpleMusicPlayer {
  constructor() {
    // 基础配置
    this.config = window.MusicConfig || {
      mode: 'vercel',
      vercel: {
        baseUrl: 'https://cdn4blog.vercel.app',
        musicPath: 'music'
      }
    };
    
    // 播放器状态
    this.currentTrack = 0;
    this.isPlaying = false;
    this.playlist = [];
    this.volume = 0.7;
    
    // HTML元素（适配现有结构）
    this.songTitle = document.querySelector('.song-title');
    this.songArtist = document.querySelector('.song-artist');
    this.playBtn = document.querySelector('.play-btn');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.playerToggle = document.getElementById('player-toggle');
    this.musicWidget = document.getElementById('music-player-widget');
    
    // 初始化
    this.init();
  }
  
  async init() {
    console.log('🎵 初始化简单音乐播放器');
    
    try {
      // 绑定事件
      this.bindEvents();
      
      // 加载播放列表
      await this.loadPlaylist();
      
      // 更新显示
      this.updateDisplay();
      
      console.log(`✅ 音乐播放器就绪，共 ${this.playlist.length} 首歌曲`);
      
    } catch (error) {
      console.error('❌ 音乐播放器初始化失败:', error);
      this.showError('音乐加载失败');
    }
  }
  
  // 绑定事件
  bindEvents() {
    // 播放控制按钮
    if (this.playBtn) this.playBtn.addEventListener('click', () => this.toggle());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    
    // 收缩控制
    if (this.playerToggle && this.musicWidget) {
      this.playerToggle.addEventListener('click', () => this.toggleWidget());
    }
  }
  
  // 收缩/展开播放器
  toggleWidget() {
    this.musicWidget.classList.toggle('collapsed');
    const icon = this.playerToggle.querySelector('i');
    if (icon) {
      icon.className = this.musicWidget.classList.contains('collapsed') 
        ? 'fa fa-chevron-right' 
        : 'fa fa-chevron-left';
    }
  }
  
  // 从GitHub或Vercel加载音乐列表
  async loadPlaylist() {
    const { mode } = this.config;
    
    if (mode === 'vercel') {
      // Vercel 模式 - 使用固定的播放列表
      console.log('📡 从Vercel加载音乐列表');
      this.playlist = this.loadVercelPlaylist();
    } else {
      // GitHub 模式
      const { owner, repo, musicPath } = this.config.github;
      console.log(`📡 从GitHub加载: ${owner}/${repo}/${musicPath}`);
      
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${musicPath}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`GitHub API请求失败: ${response.status}`);
      }
      
      const files = await response.json();
      
      // 过滤音频文件
      const audioFiles = files.filter(file => 
        file.type === 'file' && 
        /\.(mp3|wav|ogg|flac|m4a)$/i.test(file.name)
      );
      
      if (audioFiles.length === 0) {
        throw new Error('未找到音频文件');
      }
      
      // 生成播放列表
      this.playlist = audioFiles.map((file, index) => {
        const title = file.name.replace(/\.(mp3|wav|ogg|flac|m4a)$/i, '');
        
        // 智能解析艺术家和标题
        let artist = 'Background Music';
        let songTitle = title;
        
        if (title.includes(' - ')) {
          [artist, songTitle] = title.split(' - ', 2);
        }
        
        return {
          id: index,
          title: songTitle.trim(),
          artist: artist.trim(),
          url: this.buildMusicUrl(file.name)
        };
      });
    }
    
    console.log(`✅ 加载完成，共 ${this.playlist.length} 首歌曲`);
  }
  
  // 加载Vercel播放列表（固定）
  loadVercelPlaylist() {
    const { baseUrl, musicPath } = this.config.vercel;
    const pathPrefix = musicPath ? `${musicPath}/` : '';
    
    return [
      {
        id: 1,
        title: 'acoustic breeze',
        artist: 'Background Music',
        url: `${baseUrl}/${pathPrefix}acoustic%20breeze.mp3`
      },
      {
        id: 2,
        title: 'The Sounds of Silence',
        artist: 'Simon & Garfunkel',
        url: `${baseUrl}/${pathPrefix}The%20Sounds%20of%20Silence.mp3`
      }
    ];
  }
  
  // 构建音乐URL
  buildMusicUrl(filename) {
    const { mode } = this.config;
    
    if (mode === 'vercel') {
      const { baseUrl, musicPath } = this.config.vercel;
      return `${baseUrl}/${musicPath}/${encodeURIComponent(filename)}`;
    } else {
      const { owner, repo, branch, musicPath, cdnType } = this.config.github;
      
      switch (cdnType) {
        case 'jsdelivr':
          return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${musicPath}/${filename}`;
        case 'statically':
          return `https://cdn.statically.io/gh/${owner}/${repo}/${branch}/${musicPath}/${filename}`;
        default:
          return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${musicPath}/${encodeURIComponent(filename)}`;
      }
    }
  }
  
  // 播放音乐
  async play() {
    if (this.playlist.length === 0) return;
    
    const track = this.playlist[this.currentTrack];
    const audioElement = this.getAudioElement();
    
    try {
      console.log(`🎵 播放: ${track.title}`);
      console.log(`🔗 URL: ${track.url}`);
      
      audioElement.src = track.url;
      await audioElement.play();
      
      this.isPlaying = true;
      this.updatePlayButton();
      
    } catch (error) {
      console.error('❌ 播放失败:', error);
      this.showError(`播放失败: ${track.title}`);
      
      // 尝试下一首
      if (this.currentTrack < this.playlist.length - 1) {
        this.next();
      }
    }
  }
  
  // 暂停
  pause() {
    const audioElement = this.getAudioElement();
    audioElement.pause();
    this.isPlaying = false;
    this.updatePlayButton();
  }
  
  // 播放/暂停切换
  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  // 下一首
  next() {
    this.currentTrack = (this.currentTrack + 1) % this.playlist.length;
    this.updateDisplay();
    if (this.isPlaying) {
      this.play();
    }
  }
  
  // 上一首
  prev() {
    this.currentTrack = (this.currentTrack - 1 + this.playlist.length) % this.playlist.length;
    this.updateDisplay();
    if (this.isPlaying) {
      this.play();
    }
  }
  
  // 获取或创建音频元素
  getAudioElement() {
    if (!this.audio) {
      this.audio = document.createElement('audio');
      this.audio.volume = this.volume;
      
      // 自动播放下一首
      this.audio.addEventListener('ended', () => {
        this.next();
      });
      
      // 错误处理
      this.audio.addEventListener('error', (e) => {
        console.error('音频错误:', e);
        this.next();
      });
    }
    
    return this.audio;
  }
  
  // 更新显示
  updateDisplay() {
    if (this.playlist.length === 0) return;
    
    const track = this.playlist[this.currentTrack];
    
    // 更新歌曲信息
    if (this.songTitle) this.songTitle.textContent = track.title;
    if (this.songArtist) this.songArtist.textContent = track.artist;
  }
  
  // 更新播放按钮
  updatePlayButton() {
    if (this.playBtn) {
      const icon = this.playBtn.querySelector('i');
      if (icon) {
        icon.className = this.isPlaying ? 'fa fa-pause' : 'fa fa-play';
      }
    }
  }
  
  // 显示错误
  showError(message) {
    if (this.songTitle) {
      this.songTitle.textContent = message;
      this.songTitle.style.color = '#ff6b6b';
    }
  }
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 确保不重复初始化
  if (window.simpleMusicPlayer) return;
  
  console.log('🚀 启动简单音乐播放器');
  window.simpleMusicPlayer = new SimpleMusicPlayer();
});