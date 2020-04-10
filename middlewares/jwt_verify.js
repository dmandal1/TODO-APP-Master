const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const env = require('../config/environment');

module.exports.verifyJWT = async (req, res, next) => {
   const authToken = req.headers['authorization'];
   if (!authToken) {
      return res.status(401).json({
         message: 'Unauthorized access to our api, go back '
      });
   } else {
      jwt.verify(authToken, env.JWT_KEY, async (err, data) => {
         if (err) {
            return res.status(401).json({
               message: 'Unauthorized access to our api, go back '
            });
         } else {
            const email = data['user'];
            // validate user from the database
            try {
               const user = await User.findOne({ email: email });
               if (!user) {
                  return res.status(401).json({
                     message: 'Unauthorized access to our api, go back '
                  });
               } else {
                  req.user = user;
                  next();
               }
            } catch (error) {
               console.log(error);
               return res.status(500).json({
                  message: 'User not found error occured'
               });
            }
         }
      });
   }
};
