const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
module.exports = function getUserMiddleware(req, res, next) {
    try {
        let token = req.cookies.token;
        if (token) {
            jwt.verify(token, 'RESTFULAPIs', (err, decode) => {
                res.locals.user = decode;
                if (!(decode.role === 'admin')) {
                    return res.redirect('/not-found');
                }
            });
        }
    } catch (err) {
        console.log('không thành công');
    }
    next();
};
