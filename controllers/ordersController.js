const ordersModel = require('../models/Orders');
var Cart = require('../models/Cart');

exports.creatingOrder = function(req, res) {
    var order = {
        cart: req.session.cart,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        middleInitial: req.body.middlename,
        emailAddress: req.body.Email,
        facebookName: req.body.facebook,
        contactNumber: req.body.contact,
        address: req.body.address
      };

      ordersModel.createOrder(order, function(err, product){
        console.log("product of createorder")  
        console.log(product)
        var result;
            if (err) {
              console.log(err.errors);
              result = { success: false, message: "Order was not created!" }
              res.redirect("/");
            } else {
              console.log("Successfully added product!");      
              result = { success: true, message: "Order created!"  }
              req.session.cart = null;
              res.redirect("/");
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



