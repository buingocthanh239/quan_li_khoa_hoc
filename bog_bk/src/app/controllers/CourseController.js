const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const CourseUser = require('../models/CourseUser');
const Lesson = require('../models/Lesson');


class CourseController {
    // [get] /courses/:smutipleMongooseToObjectlug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(async (course) => {
                const lessons = await Lesson.find({ course: course.name });
                //res.json({lesson,course})
                res.render('courses/show', {
                    course: mongooseToObject(course),
                    lessons: mutipleMongooseToObject(lessons),
                });
            })
            .catch(next);
    }
    // [get] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [post] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
    }

    // [get] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [put] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [delete] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [delete] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [patch] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[post] /courses/handle-form-actions/stored
    handleFormActionsStored(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    //[post] /courses/handle-form-actions/trush
    handleFormActionsTrush(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'destroy':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

     //[post] /courses/:idCoure/:idUser/store
    async handleStoreCourseUsers(req, res, next) {
        
        let  isCourseUser  = await CourseUser.findOne({
            userId: req.params.idUser,
            courseId: req.params.idCourse
        })

        if(!isCourseUser) {
            const courseUser = new CourseUser({
                userId: req.params.idUser,
                courseId: req.params.idCourse
            });

            courseUser
            .save()
            .then(() => res.redirect('back'))
            .catch(next);
        } else return res.redirect('back');
     
     } 
     //[get] /courses/store/:email
    async handleGetAllCouresUser(req, res, next) {
        const coursUsers = await CourseUser.find({ idCourse: req.params.email})
        Promise.all(coursUsers.map(async (coursUser) => {
            let course = await Course.findOne({
                _id: coursUser.courseId,
            })
            return course
        }))
            .then((arrayOfResults) => {
                res.render('me/course-user', {
                    courses: mutipleMongooseToObject(arrayOfResults), 
                }); 
            })
            .catch(next)

        // const promise = new Promise((resolve, reject) => {           
        //     coursUsers.forEach( async (coursUser,index) => {
        //         let course = await Course.findOne({
        //             _id: coursUser.courseId,
        //         })
        //         courses1.push(course);
        //         resolve(() => courses1);                                   
        //     })           
        // })

        // promise
        //     .then(() => {
        //         res.render('me/course-user', {
        //             courses: mutipleMongooseToObject(courses1), 
        //         }); 
        //     })
                          
            

        

             

     }
}

module.exports = new CourseController();
