document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post('http://localhost:3000/api/auth/signup', {
                    name,
                    email,
                    mobile,
                    password
                });

                if (response.status === 201) {
                    alert('Signup successful!');
                    window.location.href = 'login.html';
                } else {
                    alert(`Signup failed: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post('http://localhost:3000/api/auth/login', {
                    email,
                    password
                });

                if (response.status === 200) {
                    const user = response.data;
                    alert('Login successful!');
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = 'index.html';
                } else {
                    alert('Login failed! Invalid credentials.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const user = JSON.parse(localStorage.getItem('user'));
            const token = user ? user.accessToken : null;

            const name = document.getElementById('profileName').value;
            const mobile = document.getElementById('profileMobile').value;
            const careerGoals = document.getElementById('profileCareerGoals').value;

            try {
                const response = await axios.put('http://localhost:3000/api/auth/profile', {
                    name,
                    mobile,
                    career_goals: careerGoals
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });

                if (response.status === 200) {
                    const updatedUser = response.data;
                    alert('Profile updated successfully!');
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } else {
                    alert(`Profile update failed: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});


