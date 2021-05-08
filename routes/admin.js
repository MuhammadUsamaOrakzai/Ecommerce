const express = require("express");
const {createAdmin, loginAdmin} = require('../controller/admin');
const router = express.Router();




// here we are creating an account as an admin
router.post('/create', createAdmin);

// this is the Login route 
router.post('/login', loginAdmin);



module.exports = router;