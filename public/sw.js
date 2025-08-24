// Basic service worker for offline cache of static assets and navigation fallback
const CACHE_NAME = 'sensus-cache-v1'
const ASSETS = [
  '/',
  '/logo.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : Promise.resolve()))
      )
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  // Network first for navigation requests, cache fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/'))
    )
    return
  }

  // Cache-first for GET static requests
  if (req.method === 'GET') {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached || fetch(req).then((res) => {
          const resClone = res.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone))
          return res
        }).catch(() => cached)
      )
    )
  }
})


