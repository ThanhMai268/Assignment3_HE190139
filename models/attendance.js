const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const attendanceSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'student',
            required: true
        },
        classId: {
            type: Schema.Types.ObjectId,
            ref: 'class',
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["PRESENT", "ABSENT"],
            default: "PRESENT"
        },
    }
);

const attendance = mongoose.model('attendance', attendanceSchema);
module.exports = attendance;