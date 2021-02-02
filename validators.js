const { body } = require('express-validator');


const loginValidation = [
    // Username should not be empty
    body('username').not().isEmpty().withMessage("Please enter username."),

    // Password should not be empty
    body('password').not().isEmpty().withMessage("Please enter password.")
  ];


  module.exports = loginValidation ;