const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', userData);

            
            if (response.data.token) {
               
                window.location.href = 'login.html';
            } else {
                console.error('Token not found in response'); // Handle this case if needed
            }
        } catch (error) {
            console.error('Signup Error:', error.message);
        }
    });
}

// Login Form Handling
const loginForm = document.getElementById('loginForm');

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

            
            if (response.data.token) {
                console.log('Login Successful');
                
                window.location.href = '/dashboard.html';  // Adjust path as per your frontend setup
            } else {
                console.error('Token not found in response'); // Handle this case if needed
            }
        } catch (error) {
            console.error('Login Error:', error.message);
        }
    });
}
  
