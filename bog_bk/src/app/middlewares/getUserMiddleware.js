const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
module.exports = function getUserMiddleware(req, res, next) {
    //res.locals.user.isUser = false;
    try {
        let token = req.cookies.token;
        if (token) {
            jwt.verify(token, 'RESTFULAPIs', (err, decode) => {
                res.locals.user = decode;
                //res.locals.user.isUser = true;
            });
        }
    } catch (err) {
        console.log('không thành công');
    }
    next();
};
