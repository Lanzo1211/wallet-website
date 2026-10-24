function changePage(path) {
    
      window.history.pushState({}, '', path);

      // 2. CHANGE THE CONTENT ON THE SCREEN MANUALLY
      const contentDiv = document.getElementById('content');
      
      if (path === '/') {
        contentDiv.innerHTML = '<h1>Home Page</h1><p>You are looking at the home route.</p>';
      } else if (path === '/about') {
        contentDiv.innerHTML = '<h1>About Us</h1><p>You are looking at the about route.</p>';
      } else if (path === '/contact') {
        contentDiv.innerHTML = '<h1>Contact Us</h1><p>You are looking at the contact route.</p>';
      }
    }

    // 3. HANDLE BACK / FORWARD BUTTONS
    window.addEventListener('popstate', () => {
      // When the user clicks the browser's back button, sync the page content with the current URL
      changePage(window.location.pathname);
    });