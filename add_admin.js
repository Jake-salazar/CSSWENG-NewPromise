const userModel = require('./models/User');
const bcrypt = require('bcrypt');  

addAdminUser()

function addAdminUser(){
    const saltRounds = 10;
    const user = {
      email: "new_promise@gmail.com",
      username: "admin_newpromise",
      password: "cssweng4.0"
    };
    bcrypt.hash(user.password, saltRounds, (err, hashed) => {
      user.password = hashed;
      userModel.create(user, function (err, result) {
        if (err) throw err;
      }); 
    });
  }