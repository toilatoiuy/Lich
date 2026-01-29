const CACHE_NAME = 'xuan-lai-v1';

// Cài đặt: Lưu trữ mọi thứ vào bộ nhớ đệm
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['./', './index.html', './manifest.json'])));
});

// Kích hoạt: Xóa bộ nhớ đệm cũ nếu có cập nhật
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))));
});

// Phản hồi: Ưu tiên lấy từ bộ nhớ đệm, nếu không có mới tải từ mạng
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});