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
                const response = await fetch('http://localhost:3000/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, mobile, password })
                });

                if (response.ok) {
                    alert('Signup successful!');
                    window.location.href = 'login.html';
                } else {
                    const data = await response.json();
                    alert(`Signup failed: ${data.message}`);
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
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const user = await response.json();
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
                const response = await fetch('http://localhost:3000/api/auth/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    },
                    body: JSON.stringify({ name, mobile, career_goals: careerGoals })
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    alert('Profile updated successfully!');
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } else {
                    const data = await response.json();
                    alert(`Profile update failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }
});


