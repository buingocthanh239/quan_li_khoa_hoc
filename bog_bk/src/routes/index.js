const meRouter = require('./me');
const siteRouter = require('./site');
const courseRouter = require('./course');
const userRouter = require('./user');
const adminRouter = require('./admin');

const verifyToken = require('../app/middlewares/verifyToken');
const getUserMiddleware = require('../app/middlewares/getUserMiddleware');
const isAdmin = require('../app/middlewares/isAdmin');
const isEditor = require('../app/middlewares/isEditor');

function route(app) {
    app.use('/me', verifyToken, isEditor, meRouter);

    app.use('/', getUserMiddleware, siteRouter);

    app.use('/courses', verifyToken, getUserMiddleware, courseRouter);

    app.use('/user', userRouter);

    app.use('/admin', verifyToken, isAdmin, adminRouter);
}

module.exports = route;
