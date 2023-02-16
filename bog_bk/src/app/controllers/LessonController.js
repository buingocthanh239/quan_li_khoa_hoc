const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class LessonController {
    // [get] /courses/lessons/:slug
    show(req, res, next) {
        Lesson.findOne({ slug: req.params.slug })
            .then(async (lesson) => {
                const course = await Course.findOne({ name: lesson.course });
                const lessons = await Lesson.find({ course: course.name });
                res.render('lessons/show', {
                    lesson: mongooseToObject(lesson),
                    course: mongooseToObject(course),
                    lessons: mutipleMongooseToObject(lessons),
                });
            })
            .catch(next);
    }
    // [get] /courses/lesson/create
    create(req, res, next) {
        res.render('lessons/create');
    }

    // [post] /courses/lessons/store
    store(req, res, next) {
        const lesson = new Lesson(req.body);
        lesson
            .save()
            .then(() => res.redirect('/'))
            .catch(next);
    }
}

module.exports = new LessonController();
