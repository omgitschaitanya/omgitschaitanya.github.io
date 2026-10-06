// The previous landing page loaded this file. A browser that still has that page's HTML cached lands here:
// reload with a fresh query string so the current page is fetched instead of the cached one.
location.replace(location.pathname + '?fresh=' + Date.now());
