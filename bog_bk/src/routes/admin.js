const express = require('express');
const router = express.Router();
const verifyToken = require('../app/middlewares/verifyToken');

const coursecontroller = require('../app/controllers/CourseController');
const lessoncontroller = require('../app/controllers/LessonController');
const admincontroller = require('../app/controllers/adminController');

router.get('/get-all-users', admincontroller.getAllUsers);
router.get('/get-all-lessons', admincontroller.getAllLessons);
router.get('/edit/:id', admincontroller.getEditUser);
router.put('/edit/:id', admincontroller.editUser);
router.delete('/:id', admincontroller.delete);

module.exports = router;
