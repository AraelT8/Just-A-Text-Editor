const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);


registerRoute(({request}) => ['style','script','worker'].includes(request.destination),
// assets cache strategy that uses stale-while-revalidate to get the latest version of the asset from the network while returning the cached version if the network is unavailable and updating the cache in the background also setting a max age of 30 days for the cache 
new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0,200],
    }),
    new ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60,
    })
  ],
})
);
