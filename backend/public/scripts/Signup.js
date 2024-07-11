console.log('Signup DOM loaded');

const apiUrl = "http://localhost:3000";

const signupForm = document.getElementById('signup-form');

document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById('login');
    const homeBtn = document.getElementById('home');

    loginBtn.addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = `${apiUrl}/api/redirecting/loginPage`;
    });

    homeBtn.addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = `${apiUrl}/api/redirecting/welcome`;
    });
  });


if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    console.log(userData);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', userData);
        console.log(response);
        localStorage.setItem("token",response.data.token)

        window.location.href = `${apiUrl}/api/redirecting/dashboardPage`
        
    } catch (error) {
        console.log(error)
    }
  });
}
