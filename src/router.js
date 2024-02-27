// Thanks to http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html

// A hash to store our routes:
var routes = {};
// The route registering function:
function route (path) {
  routes[path] = options;
}

(function() {
    var el = null;
    function router () {
        // Lazy load view element:
        el = el || document.getElementById('view');
        // Current route url (getting rid of '#' in hash as well):
        var url = location.hash.slice(1) || '/';
        // Get route by url:
        var route = routes[url];
        // Do we have both a view and a route?
        if (el) {
            if (route.page) {
                // Render route template with John Resig's template engine:
                fetch('pages/' + route.page + '.html').then(function(response) {
                    el.innerHTML = response;
                    if (typeof(route.callback) == 'function') {
                        route.callback();
                    }
                });
            } 
            if (route.element) {

            }
            if (route.callback) {
                
            }
        }
    }
    // Listen on hash change:
    window.addEventListener('hashchange', router);

    // Listen on page load:
    window.addEventListener('load', router);

})();
