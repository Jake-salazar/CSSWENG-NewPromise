const productsModel = require('../models/Products');

// Function that creates a Product // WORKING
exports.create = function(req, res) {
  var folder = "assets/"+req.file.originalname;
  console.log(folder);

  var product = {
    img: folder,
    productName: req.body.name,
    productBrand: req.body.Brand,
    productCategory: req.body.Category,
    productDesc: req.body.Description,
    productPrice: req.body.Price,
    productQuantity: req.body.Quantity
  };
  productsModel.createProduct(product, function(err, product){
      var result;
      
          if (err) {
            console.log(err.errors);
      
            result = { success: false, message: "Product was not created!" }
            res.send(result);
          } else {
            console.log("Successfully added product!");      
            result = { success: true, message: "product created!" }
      
            res.send(result);
          }

  });
};
//-----------------------------------------------------------------------------
// Function that gets all Products from the database // WORKING!
exports.getAllProducts = function(req, res) {

  productsModel.getAll({ name: 1},function(products){
  console.log("all of the Products")
  console.log(products);
  res.render('products');
  // res.send(products);
  // uncomment this to sent the products from the database
  // callback(products);
  // console.log(products);
  
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


exports.getAllPosts = (param, callback) =>{
  productsModel.getAll(param, (err, posts) => {
    if (err) throw err;
    
    const postObjects = [];
    
    posts.forEach(function(doc) {
      postObjects.push(doc.toObject());
    });
    
    callback(postObjects);
  });
};


// get ID
exports.getID = (req, res) => {
  var id = req.params.id;

  productsModel.getByID(id, (err, result) => {
    if (err) {
      throw err;
    } else {
      var postObject = result.toObject();
      res(postObject);
    }
  });
};

exports.getByID = (req, res) => {
  var id = req.body.id;

  productsModel.getByID(id, (err, result) => {
    if (err) {
      throw err;
    } else {
      var postObject = result.toObject();
      res(postObject);
    }
  });
};