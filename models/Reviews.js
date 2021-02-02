const mongoose = require('./Connection');

const reviewschema = mongoose.Schema({
    fullName: {type:String,required: true},
    email: {type: String ,required:true},
    review: {type:String, required:true}
},{
    timestamps: true
}
);

const Reviews = mongoose.model('Reviews',reviewschema);

exports.createReview = function(obj, next) {
    const review = new Reviews(obj);
    review.save(function(err, order) {
      next(err, order);
    });
  };

  exports.getAll = (param, next) => {
    Reviews.find({}, (err, review) => {
      next(err, review);
    });
  };

  exports.getByID = function(query, next) {
    Reviews.findById(query, function(err, review) {
      next(err, review);
    });
  };

  exports.remove = function(query, next) {
    Reviews.findByIdAndRemove(query, function(err, review){
      next(err, review);
    });
  };
