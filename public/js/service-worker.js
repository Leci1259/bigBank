const FILES_TO_CACHE = [
    "/",
    "../icons/icon-192x192.png",
    "../icons/icon-512x512.png",
    "../css/styles.css",
    "../html/index.html",
    "../manifest.json",
    "./index.js",
    "./db.js",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// Install Function
self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});
// Activate Function

//Fetch Function