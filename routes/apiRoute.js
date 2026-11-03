const express = require('express');
const router = express.Router();
const { createToken } = require('../controllers/authController');
const verifyToekn = require('../middleware/authMiddleware');
const classController = require('../controllers/classController');
const studentController = require('../controllers/studentController');

router.post('/auth/login', createToken);
// Các route phía dưới đều phải có JWT hợp lệ
router.use(verifyToekn);
router.get('/classes/:classId/students', classController.getStudentsByClass);
router.get('/classes/:classId/attendance-summary', classController.getAttendanceByClass);
router.get('/students/:studentId/attendances', studentController.getStudentsAttenddance);

module.exports = router;
