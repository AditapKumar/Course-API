const express = require('express');
const { Student, validate } = require('../models/studentsModel');
const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// POST a new student
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = new Student({
    Name: req.body.Name,
    isEnrolled: req.body.isEnrolled,
    Phone: req.body.Phone,
    Email: req.body.Email
  });

  await student.save();
  res.send(student);
});

// PUT - update student by ID
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      Name: req.body.Name,
      isEnrolled: req.body.isEnrolled,
      Phone: req.body.Phone,
      Email: req.body.Email
    },
    { new: true }
  );

  if (!student)
    return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
});

// DELETE a student by ID
router.delete("/:id", async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student)
    return res.status(404).send("The student with the given ID was not found.");
  res.send(student);
});

// GET a student by ID
router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res.status(404).send("The student with the given ID was not found.");
  res.send(student);
});

module.exports = router;
 