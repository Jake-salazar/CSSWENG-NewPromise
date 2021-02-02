const ordersModel = require('../models/Orders');
var Cart = require('../models/Cart');

exports.creatingOrder = function(req, res,next) {  
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
      };

      ordersModel.createOrder(order, function(err, product){
        res.locals.order = order;
        var result;
            if (err) {
              console.log(err.errors);
              result = { success: false, message: "Order was not created!" }
              res.redirect("/");
            } else {
              console.log("Successfully added product!");      
              result = { success: true, message: "Order created!"  }
              next();
            }
    });
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
