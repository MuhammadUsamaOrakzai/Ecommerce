const joi = require('@hapi/joi');


// this validation checks data of user when creating an account
const categoryValidation = joi.object({
    name: joi.string().min(2).max(55).required()
});

module.exports.categoryValidation = categoryValidation