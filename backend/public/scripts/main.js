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


