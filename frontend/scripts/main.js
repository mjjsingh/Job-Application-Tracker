document.addEventListener('DOMContentLoaded', async () => {
    const jobsContainer = document.getElementById('job-applications');
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;

    // Fetch job applications on page load
    try {
        const response = await axios.get('http://localhost:4000/api/applications', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const jobs = response.data;

        jobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <h3>${job.company}</h3>
                <p><strong>Job Title:</strong> ${job.jobTitle}</p>
                <p><strong>Status:</strong> ${job.status}</p>
                <p><strong>Application Date:</strong> ${new Date(job.applicationDate).toLocaleDateString()}</p>
                <p><strong>Notes:</strong> ${job.notes || 'N/A'}</p>
                <button class="edit-btn" data-id="${job.id}">Edit</button>
                <button class="delete-btn" data-id="${job.id}">Delete</button>
            `;
            jobsContainer.appendChild(jobCard);
        });

    } catch (error) {
        console.error('Error fetching job applications:', error.message);
    }

    // Handle form submission for creating job applications
    const jobApplicationForm = document.getElementById('jobApplicationForm');
    jobApplicationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const company = document.getElementById('company').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const applicationDate = document.getElementById('applicationDate').value;
        const status = document.getElementById('status').value;
        const notes = document.getElementById('notes').value;

        try {
            const response = await axios.post('http://localhost:4000/api/applications', {
                company,
                jobTitle,
                applicationDate,
                status,
                notes
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            console.log('Job application created successfully:', response.data);
            // Optionally, update UI or redirect after successful creation
            jobApplicationForm.reset(); // Clear form fields
        } catch (error) {
            console.error('Error creating job application:', error.message);
        }
    });

    // Example: Edit job application
    jobsContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const jobId = event.target.getAttribute('data-id');
            // Implement edit functionality as needed
            console.log(`Edit job application with id ${jobId}`);
        }
    });

    // Example: Delete job application
    jobsContainer.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const jobId = event.target.getAttribute('data-id');

            try {
                const response = await axios.delete(`http://localhost:4000/api/applications/${jobId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                console.log('Job application deleted successfully:', response.data);
                // Optionally, update UI after successful deletion
            } catch (error) {
                console.error('Error deleting job application:', error.message);
            }
        }
    });
});


