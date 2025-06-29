const mongoose = require('mongoose');
const Joi = require('joi');

const studentSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  isEnrolled: {
    type: Boolean,
    default: false
  },
  Phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 13
  },
  Email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Student = mongoose.model("Student", studentSchema);

function validateData(student) {
  const schema = Joi.object({
    Name: Joi.string().min(2).max(50).required(),
    isEnrolled: Joi.boolean().optional(),
    Phone: Joi.string().min(10).max(13).required(),
    Email: Joi.string().min(5).max(50).required().email()
  });

  return schema.validate(student);
}

exports.Student = Student;
exports.validate = validateData;
