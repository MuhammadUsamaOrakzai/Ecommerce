const joi = require('@hapi/joi');


// this validation checks data of user when creating an account
const adminRegisterValidation = joi.object({
    name: joi.string().min(4).max(55).required(),
    email: joi.string().email().required(),
    password: joi.string().lowercase().uppercase(1).regex(/^[a-zA-Z0-9!@#$%&*]{3,30}$/)
});

// this validation checks data of user when loging in
const adminLoginValidation = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(26).lowercase().uppercase()
    });


module.exports.adminRegisterValidation = adminRegisterValidation;
module.exports.adminLoginValidation = adminLoginValidation;

