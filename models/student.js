const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const studentSchema = new Schema(
    {
        studentCode: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        }
    }
);

const student = mongoose.model('student', studentSchema);
module.exports = student;