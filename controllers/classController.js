const Student = require('../models/student');
const Subject = require('../models/subject');
const Class = require('../models/class');
const Attendance = require('../models/attendance');

const mongoose = require('mongoose');

// GET /api/classes/:classId/students?status=enrolled
const getStudentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: `Invalid classId: ${classId}` });
        }
        const classes = await Class.findById(classId).populate('enrollments.studentId');
        if (!classes) {
            return res.status(404).json({ error: `Class with id = ${classId} not found` });
        }
        const { status } = req.query;
        let students = classes.enrollments;
        if (status === "enrolled" || status === "dropped") {
            students = students.filter(student => student.status === status);
        } else {
            return res.status(400).json({ error: `Invalid status: ${status}` });
        }
        const result = students.map(item => ({
            id: item.studentId?._id,
            studentCode: item.studentId?.studentCode,
            fullName: item.studentId?.fullName,
            email: item.studentId?.email
        }));
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students by class', error: error.message });
    }
};

// GET /api/classes/:classId/attendance-summary
const getAttendanceByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: `Invalid classId: ${classId}` });
        }
        const classes = await Class.findById(classId).populate('enrollments.studentId');
        if (!classes) {
            return res.status(404).json({ error: `Class with id = ${classId} not found` });
        }
        // lay cac ban ghi diem danh
        const attendance = await Attendance.find({ classId });
        // tim ban ghi tuong ung cua each student trong collection classes 
        // item la từng phần tử populate('enrollments.studentId')
        const result = classes.enrollments
            .filter(item => item.studentId)
            .map(item => {
                const records = attendance.filter(record =>
                    record.studentId.toString() === item.studentId._id.toString()
                );
                const present = records.filter(r => r.status === 'PRESENT').length;
                const absent = records.filter(r => r.status === 'ABSENT').length;
                const totalSessions = present + absent;
                let attendanceRate = 0;
                if (totalSessions > 0) {
                    attendanceRate = Number(((present / totalSessions) * 100).toFixed(1));
                } else attendanceRate = 0;
                const warning = attendanceRate < 80.0;
                return {
                    studentCode: item.studentId.studentCode,
                    fullName: item.studentId.fullName,
                    totalSessions,
                    present,
                    absent,
                    attendanceRate,
                    warning
                };
            });
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students by class', error: error.message });
    }
};

module.exports = {
    getStudentsByClass,
    getAttendanceByClass
};