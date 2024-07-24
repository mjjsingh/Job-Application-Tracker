console.log("Job Application JS Loaded");

const apiUrl = "http://localhost:3000";
const authToken = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", function () {
  const dashboardBtn = document.getElementById("Dashboard");
  const companyInformationBtn = document.getElementById("company_information");

  dashboardBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/dashboardPage`;
  });

  companyInformationBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/companyInformationPage`;
  });

  const jobApplicationForm = document.getElementById("jobApplicationForm");
  if (jobApplicationForm) {
    jobApplicationForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = new FormData(jobApplicationForm);

      try {
        const response = await axios.post(`${apiUrl}/api/applications`, formData, {
          headers: {
            authorization: `${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log("Success:", response.data);
        alert("Application logged successfully");
        jobApplicationForm.reset();
      } catch (error) {
        console.error("Error:", error);
        alert("Error logging application");
      }
    });
  }
});
