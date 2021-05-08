const express = require("express");
const { createUser, loginUser } = require("../controller/user");
const router = express.Router();


// this is the create a new user route
router.post('/create', createUser);


// this is the Login route 
router.post('/login', loginUser);

module.exports = router;