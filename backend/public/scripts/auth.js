document.getElementById('signup-form').addEventListener('submit', async (event) => {
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
      console.error('Signup Error:', data.errors || data.message);
    }
  } catch (error) {
    console.error('Signup Error:', error);
  }
});

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html'; 
    } else {
      document.getElementById('login-error').textContent = data.message || 'Login failed.';
    }
  } catch (error) {
    console.error('Login Error:', error);
    document.getElementById('login-error').textContent = 'An error occurred. Please try again.';
  }
});
