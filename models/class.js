const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const classSchema = new Schema(
    {
        className: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: 'subject',
            required: true
        },
        lecturerName: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["OPEN", "CLOSED"],
            default: "OPEN"
        },
        enrollments: [{
            studentId: {
                type: Schema.Types.ObjectId,
                ref: 'student',
                required: true
            },
            status: {
                type: String,
                required: true,
                enum: ["enrolled", "dropped"],
                default: "enrolled"
            },
        }]
    }
);

const Class = mongoose.model('class', classSchema);
module.exports = Class;