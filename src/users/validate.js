const { check } = require("express-validator");

const validateRegisterUser = () => {
    return [ 
      check('username', 'username does not Empty').not().isEmpty(),
      check('username', 'username must be Alphanumeric').isAlphanumeric(),
      check('username', 'username more than 6 degits').isLength({ min: 6 }),
      check('email', 'Invalid does not Empty').not().isEmpty(),
      check('email', 'Invalid email').isEmail(),
      check('password', 'password more than 6 degits').isLength({ min: 6 }),
      check('firstname','Không được bỏ trống').isEmpty(),
    ]; 
}

const validateLogin = () => {
    return [ 
        check('email', 'Email length should be 10 to 30 characters').isEmail().isLength({ min: 10, max: 30 }),
        check('name', 'Name length should be 10 to 20 characters').isLength({ min: 10, max: 20 }),
        check('mobile', 'Mobile number should contains 10 digits')
                .isLength({ min: 10, max: 10 }),
        check('password', 'Password length should be 8 to 10 characters')
        .isLength({ min: 8, max: 10 })
    ]; 
}
const validate = {
    validateRegisterUser: validateRegisterUser,
    validateLogin: validateLogin
  };
  
  module.exports = {validate};