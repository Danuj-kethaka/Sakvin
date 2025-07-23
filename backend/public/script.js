document.getElementById('insertStudentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        sid: document.getElementById('sid').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        nearestCity: document.getElementById('nearestCity').value,
        course: document.getElementById('course').value,
        guardian: document.getElementById('guardian').value,
    };

    $.ajax({
        url: 'http://localhost:5000/api/students/insert',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
            alert('Student inserted successfully!');
            document.getElementById('insertStudentForm').reset();
        },
        error: function(xhr, status, error) {
            const result = JSON.parse(xhr.responseText);
            alert(`Error: ${result.message}`);
        }
    });
});
