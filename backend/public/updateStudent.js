// Handle Update by SID Form Submission
document.getElementById('updateBySidForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const studentData = {
        sid: formData.get('sid'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        nearestCity: formData.get('nearestCity'),
        course: formData.get('course'),
        guardian: formData.get('guardian'),
    };

    console.log('Form Data:', studentData); // Check the data before sending

    $.ajax({
        url: 'http://localhost:5000/api/students/updateBySid',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(studentData),
        success: function(data) {
            alert(data.message); // Show success or failure message
        },
        error: function(xhr, status, error) {
            alert('Error updating student');
            console.error(error);
        }
    });
});

// Handle Update by First Name Form Submission
document.getElementById('updateByFirstNameForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const studentData = {
        firstName: formData.get('firstName'),  // This is the field you're using to find the student
        sid: formData.get('sid'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        nearestCity: formData.get('nearestCity'),
        course: formData.get('course'),
        guardian: formData.get('guardian'),
    };

    $.ajax({
        url: 'http://localhost:5000/api/students/updateByFirstName',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(studentData),
        success: function(data) {
            alert(data.message); // Show success or failure message
        },
        error: function(xhr, status, error) {
            alert('Error updating student');
            console.error(error);
        }
    });
});
