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
  });

  document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
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
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust token handling as per your authentication setup
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Application logged successfully');
      document.getElementById('jobApplicationForm').reset();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error logging application');
    });
  });