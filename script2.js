// 1. Define mock views for your pages
const routes = {
  "/": "<h1>Home Page</h1><p>Welcome to our single-page app!</p>",
  "/about": "<h1>About Us</h1><p>This is the about page handled via JS history.</p>",
  "/contact": "<h1>Contact Us</h1><p>Get in touch with us here.</p>"
};

// 2. Function to change content and update browser history
function navigateTo(url) {
  // Push a new entry to the browser history stack
  history.pushState(null, null, url);
  
  // Render the appropriate view
  renderRoute();
}

// 3. Render content based on the current pathname
function renderRoute() {
  const path = window.location.pathname;
  const appContainer = document.getElementById("app");
  
  // Match route or fall back to a 404
  appContainer.innerHTML = routes[path] || "<h1>404</h1><p>Page not found.</p>";
}

// 4. Intercept clicks on links to prevent full page reloads
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault(); // Stop default browser navigation
    navigateTo(e.target.getAttribute("href"));
  }
});

// 5. Listen for browser back/forward button clicks
window.addEventListener("popstate", () => {
  renderRoute();
});

// 6. Render the initial route when the script first loads
window.addEventListener("DOMContentLoaded", () => {
  renderRoute();
});