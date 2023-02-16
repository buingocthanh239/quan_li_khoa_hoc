const express = require('express');
const router = express.Router();

const sitecontroller = require('../app/controllers/SiteController');

//newcontroller.index

router.get('/not-found', sitecontroller.notFound);
router.get('/', sitecontroller.home);

module.exports = router;
