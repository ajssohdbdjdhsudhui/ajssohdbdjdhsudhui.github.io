const cacheName = "Castergllw-Hanoi's Tower-0.1";
const contentToCache = [
    "Build/5a38fc0136d3b6d73ebc5d7deafd80a6.loader.js",
    "Build/737c1c7eecab1c08258cb04b4aea4099.framework.js.gz",
    "Build/7379d367763dbe29e3e2b58e0b1cfd87.data.gz",
    "Build/75fe6f41ad50511a6262910aa3044e18.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
