const reviewsModel = require('../models/Reviews');
var Cart = require('../models/Cart');

exports.creatingReview = function(req, res) {
    var review = {
      review: req.body.Message,
      fullName: req.body.Name,
      email: req.body.Email
      };
      console.log("review:")
      console.log(review);
      reviewsModel.createReview(review, function(err, product){
        var result;
            if (err) {
              console.log(err.errors);
              result = { success: false, message: "Review was not created!" }
              res.send(result);
            } else {
              console.log("Successfully added product!");      
              result = { success: true, message: "Review created!"  }
              res.send(result);
            }
    });
};
