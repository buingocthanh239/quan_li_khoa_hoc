const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');

class UserController {
    // [get] /courses/create
    register(req, res, next) {
        res.render('auth/register', { layout: false });
    }

    // [post] /user/register/store
    async registerStore(req, res, next) {
        let isUserRegistered = await User.findOne({ email: req.body.email });
        if (isUserRegistered) return res.redirect('/user/register');
        const newUser = new User({
            name: req.body.fullname,
            email: req.body.email,
            hash_Password: req.body.password,
            role: 'user',
        });
        newUser.hash_Password = bcrypt.hashSync(req.body.password, 10);
        newUser
            .save()
            .then(() => res.redirect('/user/login'))
            .catch(next);
    }

    // [get] /user/login
    login(req, res, next) {
        res.render('auth/login', { layout: false });
    }

    // [post] /user/login
    loginRequired(req, res, next) {
        User.findOne({ email: req.body.email })
            .then(async (user) => {
                let isPassWorrd = await user.comparePassword(req.body.password);
                if (!isPassWorrd) {
                    return res.redirect('login'); // password not match
                }
                const token = jwt.sign(
                    {
                        email: user.email,
                        name: user.name,
                        _id: user._id,
                        role: user.role,
                    },
                    'RESTFULAPIs',
                    { expiresIn: '1d' },
                );
                res.cookie('token', token);

                res.redirect('/');
            })
            .catch(() => res.redirect('login')); // user not found
    }

    // [get] /user/logout
    logout(req, res, next) {
        res.cookie('token', '');
        res.redirect('/');
    }
}

module.exports = new UserController();
