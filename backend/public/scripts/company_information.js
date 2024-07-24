console.log('Company Information JS Loaded');

const apiUrl = 'http://localhost:3000';
const authToken = localStorage.getItem('token');

// Company Information Form Submission
const companyInfoForm = document.getElementById('companyInformationForm');
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
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('Success:', response.data);
      alert('Company information saved successfully');
      companyInfoForm.reset();
      loadCompanies();
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving company information');
    }
  });
}

// Job Listing Form Submission
const jobListingForm = document.getElementById('jobListingForm');
if (jobListingForm) {
  jobListingForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
      jobTitle: document.getElementById('jobTitle').value,
      description: document.getElementById('description').value,
      requirements: document.getElementById('requirements').value,
      applicationDeadline: document.getElementById('applicationDeadline').value,
      companyId: document.getElementById('companyId').value
    };

    try {
      const response = await axios.post(`/api/companies/${formData.companyId}/job-listings`, formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      console.log('Success:', response.data);
      alert('Job listing saved successfully');
      jobListingForm.reset();
      loadJobListings(formData.companyId);
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving job listing');
    }
  });
}

// Load Companies
async function loadCompanies() {
  try {
    const response = await axios.get('/api/companies', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const companiesList = document.getElementById('companiesList');
    companiesList.innerHTML = '';

    response.data.forEach(company => {
      const companyDiv = document.createElement('div');
      companyDiv.innerHTML = `
        <h3>${company.companyName}</h3>
        <p>Contact Name: ${company.contactName}</p>
        <p>Email: ${company.email}</p>
        <p>Phone: ${company.phone}</p>
        <p>Industry: ${company.industry}</p>
        <p>Notes: ${company.notes}</p>
        <button onclick="editCompany(${company.id})">Edit</button>
        <button onclick="deleteCompany(${company.id})">Delete</button>
      `;
      companiesList.appendChild(companyDiv);
    });
  } catch (error) {
    console.error('Error loading companies:', error);
  }
}

// Load Job Listings for a Company
async function loadJobListings(companyId) {
  try {
    const response = await axios.get(`/api/companies/${companyId}/job-listings`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const jobListingsList = document.getElementById('jobListingsList');
    jobListingsList.innerHTML = '';

    response.data.forEach(listing => {
      const listingDiv = document.createElement('div');
      listingDiv.innerHTML = `
        <h3>${listing.jobTitle}</h3>
        <p>Description: ${listing.description}</p>
        <p>Requirements: ${listing.requirements}</p>
        <p>Application Deadline: ${listing.applicationDeadline}</p>
        <button onclick="editJobListing(${listing.id})">Edit</button>
        <button onclick="deleteJobListing(${listing.id})">Delete</button>
      `;
      jobListingsList.appendChild(listingDiv);
    });
  } catch (error) {
    console.error('Error loading job listings:', error);
  }
}

// Initialize
loadCompanies();

