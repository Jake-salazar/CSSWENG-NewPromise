const productsModel = require('../models/Products');

// Function that creates a Product // WORKING
exports.create = function(req, res) {
  var product = {
    productName: req.body.productName,
    productBrand: req.body.productBrand,
    productDesc: req.body.productDesc,
    productPrice: req.body.productPrice,
    productID: req.body.productID
  };
  productsModel.createProduct(product, function(err, product){
      var result;
      
          if (err) {
            console.log(err.errors);
      
            result = { success: false, message: "Product was not created!" }
            res.send(result);
          } else {
            console.log("Successfully added product!");
            console.log(product);
      
            result = { success: true, message: "product created!" }
      
            res.send(result);
          }

  });
};
//-----------------------------------------------------------------------------
// Function that gets all Products from the database // WORKING!
exports.getAllProducts = function(req, res) {

  productsModel.getAll({ name: 1},function(products){
  // uncomment this to sent the products from the database
   res.send(products);
  });
    
};
//------------------------------------------------------------------------------
// Function that deletes a Product from the database // FIXING!
exports.delete = (req, res) => {
  var id = req.params.id;
  
  productsModel.remove(id, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      console.log('Successful');
    }
  }); 
};