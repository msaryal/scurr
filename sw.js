const CACHE = 'network-or-cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll([
                '/scurr/',
                '/scurr/index.html',
                '/scurr/ico/favicon-96x96.png',
                '/scurr/ico/favicon.svg',
                '/scurr/ico/favicon.ico',
                '/scurr/ico/apple-touch-icon.png',
                '/scurr/ico/site.webmanifest',
                '/scurr/style.css',
                '/scurr/script.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js'
            ])
        ));
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request);
        })
    );
});