function searchStudent() {
    const searchType = document.getElementById('searchType').value;
    const searchValue = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';

    if (!searchValue) {
        alert('Please enter a search value.');
        return;
    }

    $.ajax({
        url: `http://localhost:5000/api/students/${searchType}/${searchValue}`,
        type: 'GET',
        success: function(data) {
            // Check if no student is found
            if (data.message) {
                resultsDiv.innerHTML = `<p>No records found: ${data.message}</p>`;
            } else {
                // If the result is an array (multiple students), handle it accordingly
                if (Array.isArray(data)) {
                    resultsDiv.innerHTML = `<h3>Multiple Students Found:</h3>`;
                    data.forEach(student => {
                        resultsDiv.innerHTML += `
                            <div class="student-info">
                                <p><strong>SID:</strong> ${student.sid}</p>
                                <p><strong>First Name:</strong> ${student.firstName}</p>
                                <p><strong>Last Name:</strong> ${student.lastName}</p>
                                <p><strong>Email:</strong> ${student.email}</p>
                                <p><strong>Nearest City:</strong> ${student.nearestCity || 'Not Available'}</p>
                                <p><strong>Course:</strong> ${student.course || 'Not Available'}</p>
                                <p><strong>Guardian:</strong> ${student.guardian || 'Not Available'}</p>
                            </div>
                        `;
                    });
                } else {
                    // If it's a single student
                    resultsDiv.innerHTML = `
                        <h3>Student Information</h3>
                        <div class="student-info">
                            <p><strong>SID:</strong> ${data.sid}</p>
                            <p><strong>First Name:</strong> ${data.firstName}</p>
                            <p><strong>Last Name:</strong> ${data.lastName}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Nearest City:</strong> ${data.nearestCity || 'Not Available'}</p>
                            <p><strong>Course:</strong> ${data.course || 'Not Available'}</p>
                            <p><strong>Guardian:</strong> ${data.guardian || 'Not Available'}</p>
                        </div>
                    `;
                }
            }

            resultsDiv.style.display = 'block';
        },
        error: function(xhr, status, error) {
            resultsDiv.innerHTML = '<p>There was an error with the request. Please try again.</p>';
            resultsDiv.style.display = 'block';
        }
    });
}
