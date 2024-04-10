const Student = require('../model/studentdata')

// Create a student record
const createStudent = async (req, res) => {

    if (!req.body.name && !req.body.roll && !req.body.registration && !req.body.subjects) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const student = new Student({
        name: req.body.name,
        roll: req.body.roll,
        registration: req.body.registration,
        subjects: req.body.subjects
    });
    
    await student.save().then(data => {
        res.send({
            message:"Student created successfully!!",
            student:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
}

// Get all student records
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get a specific student record
const getSpecStudent = async (req, res) => {
    const roll = req.params.roll;
    try {
        const student = await Student.findOne({ roll: roll });
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update a student record
const updateStudent = async (req, res) => {
    const roll = req.params.roll;
    try {
        const updatedStudent = await Student.findOneAndUpdate({ roll: roll }, req.body, { new: true });
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete a student record
const deleteStudent = async (req, res) => {
    const roll = req.params.roll;
    try {
        await Student.findOneAndDelete({ roll: roll });
        res.status(204).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createStudent,
    getStudents,
    getSpecStudent,
    updateStudent,
    deleteStudent
}

