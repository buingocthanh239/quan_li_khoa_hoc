const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [get] /home
    home(req, res, next) {
        Course.find({ deleted: false })
            .then((courses) => {
                res.render('home', {
                    layout: 'home',
                    courses: mutipleMongooseToObject(courses), // vấn đề chung khi dùng handlebars (tính bảo mật)
                });
            })
            .catch(next);
    }

    //[get] /not-found
    notFound(req, res) {
        res.render('notFound');
    }
}

module.exports = new SiteController();
