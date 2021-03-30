const userModel = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.loginUser = (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { username, password } = req.body;
      userModel.getOne({ username: username }, (err, user) => {
        if (err) {
          // Database error occurred...
          req.flash('error_msg', 'Invalid Credentials');
          res.redirect('/login');
        } else {
          // Successful query
          if (user) { // If user is found!
            bcrypt.compare(password, user.password, (err, result) => {
              // passwords match (result == true)
              if (result) {
                // Update session object once matched!
                req.session.user = user._id;
                req.session.email = user.email;
                req.session.username = user.username;
                console.log(req.session);
                res.redirect('/admin');
              } else {  // If passwords don't match
                req.flash('error_msg', 'Invalid Credentials');
                res.redirect('/login');
              }
            });
          } else {  // No user found
            req.flash('error_msg', 'Invalid Credentials');
            res.redirect('/login');
          }
        }
      });
    } else {
      const messages = errors.array().map((item) => item.msg);
      req.flash('error_msg', messages.join(' '));
      res.redirect('/login');
    }
  };

  exports.logoutUser = (req, res) => {
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
      });
    }
  };


  exports.edit = (req, res) => {
    const saltRounds = 10;
    bcrypt.hash( req.body.npassword, saltRounds, (err, hashed) => {
      var hashedpassword = hashed;

      var update = {
        $set: { 
          email: req.body.email,
          username: req.body.username,
          password: hashedpassword
        } 
      };
      console.log(update);
      userModel.update(req.session.user, update, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.redirect('/admin');
        }
      });
    });
  
  };

  exports.getOneUser = (req,callback)=>{
    userModel.getOne({ username: "admin_newpromise" }, (err, user) => {
      console.log("assda")
      console.log(user);
      console.log('zzasds');
      console.log(user.email);
     callback(user.email);
    });
  }
      