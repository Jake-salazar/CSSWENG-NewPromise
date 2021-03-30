const mongoose = require('./Connection');

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true, min:5, max:15  },
    password: { type: String, required: true, min:5, max:18 },
});

const User = mongoose.model('users', userSchema);

exports.create = function(obj, next) {
    const user = new User(obj);
    console.log(user);
    user.save(function(err, user) {
      next(err, user);
    });
  };

  exports.getOne = function(query, next) {
    User.findOne(query, function(err, user) {
      next(err, user);
    });
  };


  exports.update = function(id, update, next) {
    User.findOneAndUpdate({_id: id}, update, { new: true }, function(err, post) {
      next(err, post);
    })
  };