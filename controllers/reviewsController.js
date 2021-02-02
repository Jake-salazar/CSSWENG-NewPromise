const reviewsModel = require('../models/Reviews');
var Cart = require('../models/Cart');

exports.creatingReview = function(req, res,next) {
    var review = {
      review: req.body.Message,
      fullName: req.body.Name,
      email: req.body.Email,
      shown: false
      };
      console.log("review:")
      console.log(review);
      res.locals.review = review
      reviewsModel.createReview(review, function(err, product){
        var result;
            if (err) {
              console.log(err.errors);
              result = { success: false, message: "Review was not created!" }
              res.send(result);
            } else {
              console.log("Successfully added product!");      
              result = { success: true, message: "Review created!"  }
              next();
            }
    });
};

exports.getIdReview = (req, res) => {
  var id = req.params.id;
  reviewsModel.getByID(id, (err, result) => {
    if (err) {
      throw err;
    } else {
      var postObject = result.toObject();
      res(postObject);
    }
  });
};


exports.getAllReviews = (param, callback) =>{
  reviewsModel.getAll(param, (err, review) => {
    if (err) throw err;

    const reviewsObject = [];
    
    review.forEach(function(doc) {
      reviewsObject.push(doc.toObject());
    });
    callback(reviewsObject);
  });
};


exports.search = (req, callback) => {  
  reviewsModel.getShown(req, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      callback(result)
    }
  }); 
};

exports.searchVisible = (req, callback) => {  
  reviewsModel.getShownVisible(req, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      console.log(result)
      callback(result)
    }
  }); 
};



exports.setVisible = (req, res) => {  
  var id = req.params.id;
  var update = {
    $set: { 
      shown:true
    } 
  };
  reviewsModel.update(id, update, (err, result) => {
    if (err) {
      res.redirect('/adminreviews-pending');
    } else {
      res.redirect('/adminreviews-pending');
    }
  });
};

exports.setHide = (req, res) => { 
  console.log("inside set hide"); 
  var id = req.params.id;
  var update = {
    $set: { 
      shown:false
    } 
  };
  reviewsModel.update(id, update, (err, result) => {
    if (err) {
      res.redirect('/adminreviews-public');
    } else {
      res.redirect('/adminreviews-public');
    }
  });
};

exports.deletePending = (req, res) => {
  var id = req.params.id;
  reviewsModel.remove(id, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      res.redirect('/adminreviews-pending');
    }
  }); 
};

exports.deletePublic = (req, res) => {
  var id = req.params.id;
  reviewsModel.remove(id, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      res.redirect('/adminreviews-public');
    }
  }); 
};

