console.log('dashboard DOM loaded');

const apiUrl = "http://localhost:3000";

const dashboardForm = document.getElementById('dashboard');

document.addEventListener("DOMContentLoaded", function() {
    const profileBtn = document.getElementById('profile');
    const job_applicationBtn = document.getElementById('job_application');
    const company_informationBtn = document.getElementById('company_information');

    profileBtn.addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = `${apiUrl}/api/redirecting/profilePage`;
    });

    job_applicationBtn.addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = `${apiUrl}/api/redirecting/jobApplicationPage`;
    });

    company_informationBtn.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = `${apiUrl}/api/redirecting/companyInformationPage`;
      });
  });