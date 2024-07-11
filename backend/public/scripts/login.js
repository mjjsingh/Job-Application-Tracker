console.log('in login dom');

const apiUrl = "http://localhost:3000";
// Login Form Handling
const loginForm = document.getElementById('loginForm');

document.addEventListener("DOMContentLoaded", function() {
 
  const signupBtn = document.getElementById('signup');
  const homeBtn = document.getElementById('home');


  signupBtn.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/signupPage`;
  });
  homeBtn.addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/welcome`;
  });
});

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', userData);

      console.log(response);
      console.log(response.data.token);
      localStorage.setItem("token",response.data.token)
      window.location.href = `${apiUrl}/api/redirecting/dashboardPage`

    } catch (error) {
      console.error('Login Error:', error.message);
    }
  });
}
