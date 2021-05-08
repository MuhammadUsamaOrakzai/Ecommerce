const userSchema = require("../model/userSchema");
const User = require('../model/userSchema');
const {userRegisterValidation, userLoginValidation} = require('../validation/uservalidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // here we are validating the incoming request using Joi
       const { error } = userRegisterValidation.validate(req.body);
       if (error) return res.status(400).send(error.details[0].message);
    
    //   existing email verification
       const UserExist = await userSchema.findOne({email: req.body.email});
       if(UserExist) return res.status(400).send('email already exists');
    
    // Hashing the password before storing it in the data base
       const saltUser = await bcrypt.genSalt(10);
       const hashPasswordUser = await bcrypt.hash(req.body.password, saltUser);
    
    //   if email doesnt exist and the data is valid, this will create new user
        const user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: hashPasswordUser,
        });
    
    //  we create a token after we have created our user 
               const tokenCreate = jwt.sign({_id: user._id, name: user.name, email: user.email, role: user.role}, process.env.TOKEN_SECRET);
        try {
            const savedUser = await user.save();
            res.send(tokenCreate);
        } catch (err) {
            res.status(400).send(err);
        }
    
    
    
    }


exports.loginUser = async (req, res) => {

        // we are validating the data using Joi before logging in 
            const { error } = userLoginValidation.validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);
        
        // checking if the email of the user "does not !" exist
          const user = await userSchema.findOne({email: req.body.email});
          if(!user) return res.status(400).send('Email is wrong');
        
        // checking if the password of the user is "incorrect" using bcrypt
          const validPass = await bcrypt.compare(req.body.password, user.password);
          if(!validPass) return res.status(400).send('Invalid Password');
        
        // we create a token after we have logged in so that our user can access private routes
        const token = jwt.sign({_id: user._id, name: user.name, email: user.email, role: user.role}, process.env.TOKEN_SECRET);
        res.header('authentic-token', token).send(token);
        
        
        }