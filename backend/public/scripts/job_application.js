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
//console.log("abc")

});

//Event listener for the job application button
// const homeBtn = document.getElementById("home");

//   homeBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     window.location.href = `${apiUrl}/api/redirecting/welcome`;
//   });


// Job Application Form Submission
const jobApplicationForm = document.getElementById("jobApplicationForm");
if (jobApplicationForm) {
  jobApplicationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      companyName: document.getElementById("companyName").value,
      jobTitle: document.getElementById("jobTitle").value,
      applicationDate: document.getElementById("applicationDate").value,
      status: document.getElementById("status").value,
      notes: document.getElementById("notes").value,
    };

    try {
      const response = await axios.post("/api/applications", formData, {
        headers: {
          authorization: `${authToken}`,
        },
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
