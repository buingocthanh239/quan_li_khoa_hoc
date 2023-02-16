const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/user/login');

    try {
        const verified = jwt.verify(token, 'RESTFULAPIs');
        next();
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};
