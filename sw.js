const CACHE_NAME = "CACHE"
const ASSETS = ["/main.css", "/index.html", "/main.js", "/images/favicon.png"]

self.addEventListener("install", event=>{
    event.waitUntil((async () => {
        if(!self.registration.scope.includes("127")) {
            console.log("Caching files")
            let cache = await caches.open(CACHE_NAME)
            await cache.addAll(ASSETS)
        }
    })())
});

self.addEventListener("fetch", event => {
    event.respondWith(get_request(event))
});

async function get_request(request_event) {
    let request = request_event.request
    let url = request.url

    let abort_controller = new AbortController()
    let abort_signal = abort_controller.signal
    let timeout_id = setTimeout(() => abort_controller.abort(), 5000)

    return fetch(request, {signal: abort_signal}).then(data => {
        clearTimeout(timeout_id)
        return data
    }).catch(err => caches.match(request, {cacheName: CACHE_NAME}))
}