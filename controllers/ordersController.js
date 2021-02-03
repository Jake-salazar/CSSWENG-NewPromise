const ordersModel = require('../models/Orders');
var Cart = require('../models/Cart');

exports.creatingOrder = function(req, res,next) {  
  var myDate = new Date(new Date().getTime()+(5*24*60*60*1000));
  
  var order = {
        cart: req.session.cart,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        middleInitial: req.body.middlename,
        emailAddress: req.body.Email,
        facebookName: req.body.facebook,
        contactNumber: req.body.contact,
        address: req.body.address,
        status: "Pending",
        delivery_date: myDate
      };
      if (req.session.cart.totalQty == 0){
        res.redirect("/");
      }else{
        ordersModel.createOrder(order, function(err, product){
          res.locals.order = order;
          var result;
              if (err) {
                console.log(err.errors);
                result = { success: false, message: "Order was not created!" }
               
              } else {
                console.log("Successfully added product!");      
                result = { success: true, message: "Order created!"  }
                next();
              }
      });
      }
};

exports.getAllOrders = (param, callback) =>{
    ordersModel.getAll(param, (err, orders) => {
      if (err) throw err;
      
      const ordersObject = [];
      
      orders.forEach(function(doc) {
        ordersObject.push(doc.toObject());
      });
      callback(ordersObject);
    });
  };


  exports.getID = (req, res) => {
    var id = req.params.id;
    ordersModel.getByID(id, (err, result) => {
      if (err) {
        throw err;
      } else {
        var postObject = result.toObject();
        res(postObject);
      }
    });
  };

  exports.delete = (req, res) => {
    var id = req.params.id;
    
    ordersModel.remove(id, (err, result) => {
      if (err) {
        throw err; 
      } 
      else {
        res.redirect('/admin');
      }
    }); 
  };

  exports.deleteAdminOrder = (req, res) => {
    var id = req.params.id;
    
    ordersModel.remove(id, (err, result) => {
      if (err) {
        throw err; 
      } 
      else {
        res.redirect('/adminorders');
      }
    }); 
  };

  exports.edit = (req, res) => {
    var update = {
      $set: { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleInitial: req.body.middleInitial,
        facebookName: req.body.facebookName,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        status: req.body.status,
        delivery_date: req.body.delivery_date
      } 
    };
    ordersModel.update(req.body._id, update, (err, result) => {
      if (err) {
        res.redirect('/adminorders');
      } else {
        res.redirect('/adminorders');
      }
    });
  };


  exports.searchOrder = (req, res,next) => {
    var query = req.body.searchTitle;
    
    ordersModel.getInfo({ lastName: {$regex: query, $options:'i'}}, { firstName: {$regex: query, $options:'i'}},{ emailAddress: {$regex: query, $options:'i'}},{ facebookName: {$regex: query, $options:'i'}},
    { address: {$regex: query, $options:'i'}}, { status: {$regex: query, $options:'i'}}, (err, result) => {
      if (err) {
        req.flash('error_msg', 'Something happened! Please try again.');
        throw err; 
      } 
      else {
        if (result) { 
          const postObjects = [];
      
          result.forEach(function(doc) {
            postObjects.push(doc.toObject());
          });
          res.locals.postObject = postObjects;
          next();
        } 
        else { 
          console.log("No post found!");
          req.flash('error_msg', 'No search results found. Try again.');
        }
      }
    });
  };