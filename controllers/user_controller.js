const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const env = require('../config/environment');

module.exports.registerUser = async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(500).json({
         message: 'Email or Password is invalid'
      });
   }
   // find the user by email id
   try {
      const user = await User.findOne({ email: email });
      // if user
      // return back
      if (user) {
         return res.status(500).json({
            message: 'User already exist'
         });
      }
      await User.create(req.body);
      console.log('User created successfully');
      return res.status(200).json({
         message: 'User created successfully'
      });
   } catch (error) {
      console.log('Something went wrong while creating user', error);
      return res.status(500).json({
         message: 'Something went wrong, Please try again'
      });
   }
};

module.exports.login = async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(500).json({
         message: 'Email or Password is invalid'
      });
   }
   // find the user by its email
   try {
      const user = await User.findOne({ email: email });
      if (!user) {
         // if no user
         return res.status(500).json({
            message: 'No user found with this email id'
         });
      } else {
         // if there is an user
         // check its password
         if (user.password !== password) {
            return res.status(500).json({
               message: 'Invalid credentials'
            });
         } else {
            // passwrd matched
            // create a json web token
            // send the token
            jwt.sign(
               { user: user.email },
               env.JWT_KEY,
               { expiresIn: 6000 * 20 },
               (err, token) => {
                  console.log(err);
                  if (err) {
                     return res.status(500).json({
                        message:
                           'Something went wrong while generating auth token'
                     });
                  }
                  return res.status(200).json({
                     message: 'Auth token',
                     data: {
                        token: token,
                        email: user.email
                     }
                  });
               }
            );
         }
      }
   } catch (error) {
      console.log(error);
   }
};
