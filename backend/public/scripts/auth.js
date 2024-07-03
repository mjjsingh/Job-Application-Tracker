document.addEventListener('DOMContentLoaded', function() {
  // Signup Form Submission
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
          window.location.href = 'login.html'; 
        } else {
          console.error('Signup Error:', data.errors || data.message);
        }
      } catch (error) {
        console.error('Signup Error:', error);
      }
    });
  } 

  // Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Login successful');
          // Store the token in localStorage or cookies
          localStorage.setItem('token', data.token);
          // Redirect to the dashboard page
          window.location.href = 'dashboard.html';
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  } else {
    console.error('Login form not found');
  }
});
