// hexo-offline 配置文件
// 基于 workbox-build 的 generateSW 方法

module.exports = {
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB
  globDirectory: 'public',
  globPatterns: [
    '**/*.{html,js,css,png,jpg,gif,svg,webp,ico,json,xml,txt,woff,woff2,eot,ttf}'
  ],
  skipWaiting: true,
  clientsClaim: true,
  swDest: 'public/sw.js',
  offlineGoogleAnalytics: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'jsdelivr-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp|ico)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
      },
    },
    {
      urlPattern: /\/$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
        networkTimeoutSeconds: 3,
      },
    }
  ],
};