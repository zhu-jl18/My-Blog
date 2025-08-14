// 音乐播放器配置文件
// 支持GitHub CDN音乐仓库、网易云歌单和本地音乐

window.MusicConfig = {
  // 播放模式：'github-repo', 'github-cdn', 'netease', 'local'
  mode: 'github-repo', // 使用GitHub仓库音乐
  
  // GitHub音乐仓库配置
  github: {
    owner: 'zhu-jl18',              // 你的GitHub用户名
    repo: 'cdn4blog',               // 你的CDN仓库名
    musicPath: 'music',             // 音乐文件夹路径
    branch: 'main',                 // 分支名
    
    // CDN服务 - 使用jsDelivr更稳定
    cdnType: 'jsdelivr', // 'jsdelivr' 或 'raw' 或 'statically'
    
    // 支持的音频格式
    audioFormats: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'],
    
    // 是否递归扫描子文件夹
    recursive: true,
    
    // 是否启用自动刷新（每次访问都重新获取）
    autoRefresh: false
  },
  
  // 网易云音乐配置（备用）
  netease: {
    playlistId: '2558923436', // 你的歌单
    backupPlaylists: [
      '2558923436', // 你的歌单
      '60198', // 轻音乐
    ],
    apiServers: [
      'https://netease-cloud-music-api-sand-six.vercel.app',
      'https://music-api-tau-two.vercel.app'
    ]
  },
  
  // GitHub CDN音乐（备用）
  fallbackPlaylist: [
    {
      id: '1',
      title: 'acoustic breeze',
      artist: 'Background Music',
      album: 'CDN Music Collection',
      duration: 240000,
      url: 'https://raw.githubusercontent.com/zhu-jl18/cdn4blog/main/music/acoustic%20breeze.mp3'
    }
  ],
  
  // 播放器设置
  settings: {
    defaultVolume: 0.5,
    autoPlay: false,
    loop: true,
    shuffle: false,
    showCover: true,
    showLyrics: false
  }
};
