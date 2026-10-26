function changePage(path) {
    
      window.history.pushState({}, '', path);

      const contentDiv = document.getElementById('content');
      
      if (path === '/') {
        contentDiv.innerHTML = '<h1>Home Page</h1><p>You are looking at the home route.</p>';
      } else if (path === '/about') {
        contentDiv.innerHTML = '<h1>About Us</h1><p>You are looking at the about route.</p>';
      } else if (path === '/contact') {
        contentDiv.innerHTML = '<h1>Contact Us</h1><p>You are looking at the contact route.</p>';
      }
    }

    window.addEventListener('popstate', () => {

      changePage(window.location.pathname);
    });