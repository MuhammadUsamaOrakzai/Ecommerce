const adminSchema = require('../model/adminSchema');
const Admin = require('../model/adminSchema');
const {adminRegisterValidation, adminLoginValidation} = require('../validation/adminvalidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createAdmin =  async ( req, res) => {

    // here we are validating the incoming request using Joi
          const { error } = adminRegisterValidation.validate(req.body);
          if (error) return res.status(400).send(error.details[0].message);
        
    //   existing email verification
          const AdminExist = await adminSchema.findOne({email: req.body.email});
          if(AdminExist) return res.status(400).send('email already exists');
        
    // Hashing the password before storing it in the data base
          const saltAdmin = await bcrypt.genSalt(10);
          const hashPasswordAdmin = await bcrypt.hash(req.body.password, saltAdmin);
        
    //   if email doesnt exist and the data is valid, this will create new admin
          const admin = new Admin ({
            name: req.body.name,
            email: req.body.email,
            password: hashPasswordAdmin,
        });
    // we create a token after we have created an admin
            const tokenCreate = jwt.sign({_id: admin._id, name: admin.name, email: admin.email, role: admin.role}, process.env.TOKEN_SECRET);
        
        try {
            const savedAdmin = await admin.save();
            res.send(tokenCreate);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    exports.loginAdmin = async (req, res) => {

        // we are validating the data using Joi before logging in 
            const { error } = adminLoginValidation.validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);
        
        // checking if the email of the admin "does not !" exist
          const admin = await adminSchema.findOne({email: req.body.email});
          if(!admin) return res.status(400).send('Email is wrong');
        
        // checking if the password of the user is "incorrect" using bcrypt
          const validPass = await bcrypt.compare(req.body.password, admin.password);
          if(!validPass) return res.status(400).send('Invalid Password');
        
        // we create a token after we have logged in so that our user can access private routes
        const tokenlogin = jwt.sign({_id: admin._id, name: admin.name, email: admin.email, role: admin.role}, process.env.TOKEN_SECRET);
        res.header('auth-token', tokenlogin).send(tokenlogin);
        
      }