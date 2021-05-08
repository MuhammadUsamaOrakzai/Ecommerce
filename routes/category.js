const express = require('express');
const { tokenlogin } = require('../controller/admin');
const router = express.Router();
const { createCategory, getCategory } = require('../controller/category');

router.post('/create', createCategory);
router.get('/getcategories', getCategory);
module.exports = router;