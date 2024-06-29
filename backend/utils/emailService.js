document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('nav ul li a');
  
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  });