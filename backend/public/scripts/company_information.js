console.log('Company Information JS Loaded');

const apiUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token');

// Event listener for the company information button
const companyInformationBtn = document.getElementById('company_information');
if (companyInformationBtn) {
  companyInformationBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = `${apiUrl}/api/redirecting/companyInformationPage`;
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
          'Authorization': `${authToken}`
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

