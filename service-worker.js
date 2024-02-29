// Service worker code (sw.js)

// Cache name
const CACHE_NAME = 'my-cache-v3';

// Files to cache
const urlsToCache = [
    '/',
    '/js/bootstrap.min.js',
    '/js/popper.js',
    '/js/firebase/db.js',
    '/js/firebase/firebase-app.js',
    '/css/fonts/bootstrap-icons.woff',
    '/css/fonts/bootstrap-icons.woff2'
];

// Install event
self.addEventListener('install', event => {
  // Perform installation steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        // Make network request and cache it if successful
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});

function checkTime() {
    const time =  new Date().toLocaleString().split(',');
      // If it's 10 AM, trigger the push notification
      self.registration.showNotification('Notification--', {
        body: `It is now ${time}!`,
      });

  }
  
  // Check the time every minute
  setInterval(checkTime, 5000); // 60 seconds * 1000 milliseconds
