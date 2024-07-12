console.log('Job Application JS Loaded');

const apiUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token');

// Event listener for the job application button
const jobApplicationBtn = document.getElementById('job_application');
if (jobApplicationBtn) {
  jobApplicationBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/jobApplicationPage`;
  });
}

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
          'Authorization': `${authToken}`
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

