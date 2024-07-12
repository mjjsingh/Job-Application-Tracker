console.log('Profile JS Loaded');

const apiUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token');

// Event listener for the profile button
const profileBtn = document.getElementById('profile');
if (profileBtn) {
  profileBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/profilePage`;
  });
}

const updateProfile = async () => {
  const username = document.getElementById('username').value;
  const careerGoals = document.getElementById('careerGoals').value;

  const formData = { username, careerGoals };

  try {
    const response = await axios.put('/api/profile', formData, {
      headers: {
        'Authorization': `${authToken}`
      }
    });

    console.log('Success:', response.data);
    alert('Profile updated successfully');
    document.getElementById('profileUsername').textContent = response.data.username || '';
    document.getElementById('profileCareerGoals').textContent = response.data.careerGoals || '';
    document.getElementById('username').value = response.data.username || '';
    document.getElementById('careerGoals').value = response.data.careerGoals || '';
  } catch (error) {
    console.error('Error:', error);
    alert('Error updating profile');
  }
};

const deleteProfile = async () => {
  if (confirm('Are you sure you want to delete your profile?')) {
    try {
      const response = await axios.delete('/api/profile', {
        headers: {
          'Authorization': `${authToken}`
        }
      });

      if (response.status === 200) {
        alert('Profile deleted successfully');
      } else {
        throw new Error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting profile');
    }
  }
};

const updateProfileButton = document.getElementById('updateProfileBtn');
if (updateProfileButton) {
  updateProfileButton.addEventListener('click', updateProfile);
}

const deleteProfileButton = document.getElementById('deleteProfileBtn');
if (deleteProfileButton) {
  deleteProfileButton.addEventListener('click', deleteProfile);
}

const getProfile = async () => {
  try {
    const response = await axios.get('/api/profile', {
      headers: {
        'Authorization': `${authToken}`
      }
    });

    console.log('Profile Data:', response.data);
    document.getElementById('profileUsername').textContent = response.data.username || '';
    document.getElementById('profileCareerGoals').textContent = response.data.careerGoals || '';
    document.getElementById('username').value = response.data.username || '';
    document.getElementById('careerGoals').value = response.data.careerGoals || '';
  } catch (error) {
    console.error('Error:', error);
    alert('Error fetching profile information');
  }
};

// Call getProfile to load the profile data when the page loads
getProfile();
