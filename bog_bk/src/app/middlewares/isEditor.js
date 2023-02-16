const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
module.exports = function getUserMiddleware(req, res, next) {
    //res.locals.user.isUser = false;
    try {
        let token = req.cookies.token;
        if (token) {
            jwt.verify(token, 'RESTFULAPIs', (err, decode) => {
                res.locals.user = decode;
                if (decode.role === 'user') {
                    return res.redirect('/not-found');
                }
            });
        }
    } catch (err) {
        console.log('không thành công');
    }
    next();
};
