console.log('indom')
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
console.log(userData)
    try {
      const response = await axios.post('/api/auth/register', userData);

      if (response.data.token) {
        console.log('Signup Successful');

        
       // window.location.href = 'login.html';
      } else {
        console.error('Token not found in response');
      }
    } catch (error) {
     
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        errors.forEach(error => {
          console.error(`${error.type}: ${error.msg}`);
        });
      } else {
        console.error('Signup Error:', error.message);
      }
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
            const response = await axios.post('/api/auth/login', userData);

            
            if (response.data.token) {
                console.log('Login Successful');
                
               // window.location.href = '/dashboard.html';  
            } else {
                console.error('Token not found in response'); 
            }
        } catch (error) {
            console.error('Login Error:', error.message);
        }
    });
}
  
