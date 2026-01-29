const CACHE_NAME = 'xuan-lai-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];
// Cài đặt và lưu các file vào bộ nhớ đệm
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Phản hồi dữ liệu khi mất mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});