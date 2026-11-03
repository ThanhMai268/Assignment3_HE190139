const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const subjectSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        credits: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            required: true,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        }
    }
);

const subject = mongoose.model('subject', subjectSchema);
module.exports = subject;