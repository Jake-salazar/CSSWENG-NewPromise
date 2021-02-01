const productsModel = require('../models/Products');
var Cart = require('../models/Cart');
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

exports.addingItem = (req,res,next) =>{
  var id = req.body.id;
  productsModel.getByID(id, (err,product) => {
      var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
      cart.add(product,req.body.id,req.body.Quantity);
      req.session.cart =cart;

      productsModel.getAll(req, (err1, posts) => {
        if (err1) throw err1;
        
        const postObjects = [];
        posts.forEach(function(doc) {
          postObjects.push(doc.toObject());
        });
        res.render('home',{ 
          item: postObjects,
          products: cart.generateArray(),totalPrice: cart.totalPrice
        });
      });
  });
};



exports.saveChanges = (req,res) =>{
  var id = req.body.id;
  productsModel.getByID(id, (err,product) => {
      var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
      cart.edit(product,req.body.id,req.body.Quantity);
      req.session.cart =cart;
      var cart = new Cart(req.session.cart);
      res.render('cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
  });
};





exports.delete = (req, res) => {
  var id = req.params.id;
  
  productsModel.remove(id, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      res.redirect('/admin');
    }
  }); 
};


exports.edit = (req, res) => {
  const { image1 , name, category, price , brand, quantity, 
    description } = req.body;

  var n = null;
  var folder= "";

  if(req.file != n){
     folder = "assets/"+req.file.originalname;
  }else{
     folder = req.body.image1;
  }

  var update = {
    $set: { 
      img: folder,
      productCategory: req.body.category,
      productName: req.body.name,
      productBrand: req.body.brand,
      productDesc: req.body.description,
      productPrice: req.body.price,
      productQuantity: req.body.quantity,
    } 
  };

  console.log(update)
  console.log(req.body._id);
 
  productsModel.update(req.body._id, update, (err, result) => {
    if (err) {
      res.redirect('/admin');
    } else {
      res.redirect('/admin');
    }
  });
};