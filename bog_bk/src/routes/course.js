const express = require('express');
const router = express.Router();
const isEditor = require('../app/middlewares/isEditor');

const coursecontroller = require('../app/controllers/CourseController');
const lessoncontroller = require('../app/controllers/LessonController');



// route store course-users
router.get('/store/:email',coursecontroller.handleGetAllCouresUser)
router.post('/:idCourse/:idUser/store',coursecontroller.handleStoreCourseUsers)

//newcontroller.index


router.get('/create', isEditor, coursecontroller.create);
router.post('/store', coursecontroller.store);
router.get('/:id/edit', isEditor, coursecontroller.edit);
router.post(
    '/handle-form-actions/stored',
    coursecontroller.handleFormActionsStored,
);
router.post(
    '/handle-form-actions/trush',
    coursecontroller.handleFormActionsTrush,
);
router.put('/:id', coursecontroller.update);
router.patch('/:id/restore', coursecontroller.restore);
router.delete('/:id', coursecontroller.delete);
router.delete('/:id/force', coursecontroller.forceDelete);
router.get('/:slug', coursecontroller.show);

// route lessons
router.get('/lessons/create', isEditor, lessoncontroller.create);
router.post('/lessons/store', lessoncontroller.store);
router.get('/lessons/:slug', lessoncontroller.show);

module.exports = router;
