const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    sid: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    nearestCity: { type: String, required: true },
    course: { type: String, required: true },
    guardian: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
