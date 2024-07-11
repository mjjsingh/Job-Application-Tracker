console.log('in dom of main');
const apiUrl = 'http://localhost:3000';

// Element selectors
const profileBtn = document.getElementById('profile');
const jobApplicationBtn = document.getElementById('job_application');
const companyInformationBtn = document.getElementById('company_information');

document.addEventListener("DOMContentLoaded", function () {

  // Event listeners for navigation buttons
  profileBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/profilePage`;
  });

  jobApplicationBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/jobApplicationPage`;
  });

  companyInformationBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/companyInformationPage`;
  });

  // Highlight the current active link in the navigation
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('nav ul li a');

  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Job Application Form Submission
  const jobApplicationForm = document.getElementById('jobApplicationForm');
  if (jobApplicationForm) {
    jobApplicationForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const formData = {
        companyName: document.getElementById('companyName').value,
        jobTitle: document.getElementById('jobTitle').value,
        applicationDate: document.getElementById('applicationDate').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value
      };

      try {
        const response = await axios.post('/api/applications', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Use Bearer token for authorization
          }
        });

        console.log('Success:', response.data);
        alert('Application logged successfully');
        jobApplicationForm.reset();
      } catch (error) {
        console.error('Error:', error);
        alert('Error logging application');
      }
    });
  }

  // Company Information Form Submission
  const companyInfoForm = document.getElementById('companyInfoForm');
  if (companyInfoForm) {
    companyInfoForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const formData = {
        companyName: document.getElementById('companyName').value,
        contactName: document.getElementById('contactName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        industry: document.getElementById('industry').value,
        notes: document.getElementById('notes').value
      };

      try {
        const response = await axios.post('/api/companies', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Use Bearer token for authorization
          }
        });

        console.log('Success:', response.data);
        alert('Company information saved successfully');
        companyInfoForm.reset();
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving company information');
      }
    });
  }

  // Profile Page JavaScript
  const updateProfile = async () => {
    const username = document.getElementById('username').value;
    const careerGoals = document.getElementById('careerGoals').value;

    const formData = { username, careerGoals };

    try {
      const response = await axios.put('/api/profile', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Use Bearer token for authorization
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
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Use Bearer token for authorization
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

  // Fetch profile information and populate the form
  const getProfile = async () => {
    try {
      const response = await axios.get('/api/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Use Bearer token for authorization
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
});