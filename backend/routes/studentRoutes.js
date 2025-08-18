const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// 1. Find a Student by SID
router.get('/findBySid/:sid', async (req, res) => {
    const student = await Student.findOne({ sid: req.params.sid });
    res.json(student || { message: 'Student not found' });
});

// 2. Find Students by First Name
router.get('/findByFirstName/:firstName', async (req, res) => {
    const students = await Student.find({ firstName: req.params.firstName });
    if (students.length === 0) {
        res.json({ message: 'No students found with that first name' });
    } else {
        res.json(students);
    }
});

// 3. Find Students by Last Name
router.get('/findByLastName/:lastName', async (req, res) => {
    const students = await Student.find({ lastName: req.params.lastName });
    if (students.length === 0) {
        res.json({ message: 'No students found with that last name' });
    } else {
        res.json(students);
    }
});

// 4. Find Students by Email
router.get('/findByEmail/:email', async (req, res) => {
    const student = await Student.findOne({ email: req.params.email });
    res.json(student || { message: 'Email not found' });
});

// 5. Find Students by Nearest City
router.get('/findByCity/:city', async (req, res) => {
    const students = await Student.find({ nearestCity: req.params.city });
    if (students.length === 0) {
        res.json({ message: 'No students found in that city' });
    } else {
        res.json(students);
    }
});

// 6. Find Students by Course
router.get('/findByCourse/:course', async (req, res) => {
    const students = await Student.find({ course: req.params.course });
    if (students.length === 0) {
        res.json({ message: 'No students found in that course' });
    } else {
        res.json(students);
    }
});

// 7. Find Students by Guardian
router.get('/findByGuardian/:guardian', async (req, res) => {
    const students = await Student.find({ guardian: req.params.guardian });
    if (students.length === 0) {
        res.json({ message: 'No students found with that guardian' });
    } else {
        res.json(students);
    }
});



// Insert a new student
router.post('/insert', async (req, res) => {
    try {
        const { sid, firstName, lastName, email, nearestCity, course, guardian } = req.body;

        // Validate required fields
        if (!sid || !firstName || !lastName || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new student document
        const newStudent = new Student({
            sid,
            firstName,
            lastName,
            email,
            nearestCity,
            course,
            guardian,
        });

        // Save to database
        await newStudent.save();
        res.status(201).json({ message: 'Student inserted successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting student', error: error.message });
    }
});




// Route for updating student by SID
router.put('/updateBySid', async (req, res) => {
    const { sid, firstName, lastName, email, nearestCity, course, guardian } = req.body;

    try {
        const student = await Student.findOneAndUpdate(
            { sid },  // Find student by SID
            { firstName, lastName, email, nearestCity, course, guardian },  // Fields to update
            { new: true }  // Return the updated student
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
});

// Route for updating student by First Name
router.put('/updateByFirstName', async (req, res) => {
    const { firstName, sid, lastName, email, nearestCity, course, guardian } = req.body;

    try {
        const student = await Student.findOneAndUpdate(
            { firstName },  // Find student by First Name
            { sid, lastName, email, nearestCity, course, guardian },  // Fields to update
            { new: true }  // Return the updated student
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
});




//show all students

router.get('/getAllStudents', async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students
        if (students.length === 0) {
            res.json({ message: 'No students found' });
        } else {
            res.json(students);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
});


//delete student

router.delete('/deleteStudent/:sid', async (req, res) => {
    const { sid } = req.params;

    try {
        const student = await Student.findOneAndDelete({ sid });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student' });
    }
});




//count of students
router.get('/countStudents', async (req, res) => {
    try {
        const studentCount = await Student.countDocuments(); // MongoDB query to count the number of students
        res.json({ totalStudents: studentCount });
    } catch (error) {
        res.status(500).json({ message: 'Error counting students' });
    }
});

module.exports = router;
