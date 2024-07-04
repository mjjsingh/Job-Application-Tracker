document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('nav ul li a');

  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const jobApplicationForm = document.getElementById('jobApplicationForm');
  if (jobApplicationForm) {
      jobApplicationForm.addEventListener('submit', function(event) {
          event.preventDefault();
      
          const formData = {
              companyName: document.getElementById('companyName').value,
              jobTitle: document.getElementById('jobTitle').value,
              applicationDate: document.getElementById('applicationDate').value,
              status: document.getElementById('status').value,
              notes: document.getElementById('notes').value
          };
      
          fetch('/api/applications', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
              },
              body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              alert('Application logged successfully');
              jobApplicationForm.reset();
          })
          .catch((error) => {
              console.error('Error:', error);
              alert('Error logging application');
          });
      });
  }

  const companyInfoForm = document.getElementById('companyInfoForm');
  if (companyInfoForm) {
      companyInfoForm.addEventListener('submit', function(event) {
          event.preventDefault();

          const formData = {
              companyName: document.getElementById('companyName').value,
              contactName: document.getElementById('contactName').value,
              email: document.getElementById('email').value,
              phone: document.getElementById('phone').value,
              industry: document.getElementById('industry').value,
              notes: document.getElementById('notes').value
          };

          fetch('/api/companies', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              alert('Company information saved successfully');
              companyInfoForm.reset(); 
          })
          .catch((error) => {
              console.error('Error:', error);
              alert('Error saving company information');
          });
      });
  }
});
// main.js

document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('nav ul li a');

  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Function to update profile
  const updateProfile = () => {
    const username = document.getElementById('username').value; // Get username field value
    const careerGoals = document.getElementById('careerGoals').value;

    const formData = {
      username: username, // Include username in formData
      careerGoals: careerGoals
    };

    fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Profile updated successfully');
      // Update profile info display
      document.getElementById('profileUsername').textContent = data.username || '';
      document.getElementById('profileCareerGoals').textContent = data.careerGoals || '';
      // Update form fields with updated data
      document.getElementById('username').value = data.username || ''; // Ensure username field is updated
      document.getElementById('careerGoals').value = data.careerGoals || '';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error updating profile');
    });
  };

  // Function to delete profile
  const deleteProfile = () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      fetch('/api/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (response.ok) {
          alert('Profile deleted successfully');
          // Optionally handle redirection or display message
        } else {
          throw new Error('Failed to delete profile');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error deleting profile');
      });
    }
  };

  // Attach updateProfile function to the Update Profile button click event
  const updateProfileButton = document.getElementById('updateProfileBtn');
  if (updateProfileButton) {
    updateProfileButton.addEventListener('click', updateProfile);
  }

  // Attach deleteProfile function to the Delete Profile button click event
  const deleteProfileButton = document.getElementById('deleteProfileBtn');
  if (deleteProfileButton) {
    deleteProfileButton.addEventListener('click', deleteProfile);
  }

  // Function to fetch and display initial profile information
  const getProfile = () => {
    fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Profile Data:', data);
      // Display profile information
      document.getElementById('profileUsername').textContent = data.username || '';
      document.getElementById('profileCareerGoals').textContent = data.careerGoals || '';
      // Pre-fill form with current profile data
      document.getElementById('username').value = data.username || ''; // Ensure username field is pre-filled
      document.getElementById('careerGoals').value = data.careerGoals || '';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error fetching profile information');
    });
  };

  // Call getProfile function to fetch initial profile data when the page loads
  getProfile();

});
