let cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil (
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/index.html",
        "/",
        "/users"
      ])
    })
  )
})

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(caches.open(cacheData).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        if(cachedResponse) {
          return cachedResponse;
        }
        // let requestUrl = event.request.clone();
        // return fetch(requestUrl);

        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());

          return networkResponse;
        });

        return cachedResponse || fetchedResponse;
      });
    }));
    // event.respondWith(
    //   caches.match(event.request).then((resp) => {
    //     if(resp) {
    //       return resp;
    //     }
    //     let requestUrl = event.request.clone();
    //     return fetch(requestUrl);
    //   })
    // )
  }
})

this.addEventListener("activate", (event) => {
  console.log('service worker has been activated.');
})
