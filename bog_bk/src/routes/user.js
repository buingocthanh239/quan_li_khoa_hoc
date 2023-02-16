const express = require('express');
const router = express.Router();

const usercontroller = require('../app/controllers/UserController');

router.post('/register', usercontroller.registerStore);
router.get('/register', usercontroller.register);
router.get('/login', usercontroller.login);
router.post('/login', usercontroller.loginRequired);
router.get('/logout', usercontroller.logout);
module.exports = router;
