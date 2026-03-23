const CACHE_NAME = 'estatelink-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/api.js',
    '/js/app.js',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
