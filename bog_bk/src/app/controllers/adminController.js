const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Lesson = require('../models/Lesson');
const User = require('../models/User');
class AdminController {
    // [get] /admin/get-all-users
    getAllUsers(req, res, next) {
        User.find({ delete: false })
            .then((users) => {
                res.render('admin/getAllUsers', {
                    users: mutipleMongooseToObject(users),
                });
            })
            .catch(next);
    }

    // [get] /admin/get-all-lessons
    getAllLessons(req, res, next) {
        Lesson.find({ delete: false })
            .then((lessons) => {
                res.render('admin/getAllLessons', {
                    lessons: mutipleMongooseToObject(lessons),
                });
            })
            .catch(next);
    }

    //[get] /admin/edit/:id
    getEditUser(req, res, next) {
        User.findById(req.params.id)
            .then((user) =>
                res.render('admin/editUser', {
                    userEdit: mongooseToObject(user),
                }),
            )
            .catch(next);
    }

    //[put] /admin//edit/:id
    editUser(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/get-all-users'))
            .catch(next);
    }

    // [post] /admin/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new AdminController();
