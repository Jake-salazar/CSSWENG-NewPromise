const mongoose = require('./Connection');

const productsSchema = mongoose.Schema({
    img: { type: String, required: true },
    productCategory: {type:String,required: true},
    productName:{ type: String, required: true},
    productBrand: { type: String, required: true},
    productDesc: { type: String, required: true},
    productPrice: { type: String, required: true},
    productQuantity: {type: String, required: true}
});

const Products = mongoose.model('Products',productsSchema);

// function that adds a product to the database
exports.createProduct = function(obj, next) {
    const product = new Products(obj);
    console.log(product);
    product.save(function(err, product) {
      next(err, product);
    });
  };

// function that gets all the product from the database
exports.getAll = function(sort, next){
    Products.find({}).sort(sort).exec(function(err, result) {
    if (err) throw err;
    var productsObject = [];

    result.forEach(function(doc) {
        productsObject.push(doc.toObject());
    });

    next(productsObject);
  });
};


// Function that deletes a product from the database // FIXING
exports.remove = function(query, next) {
    Products.findByIdAndRemove(query, function(err, product){
      next(err, product);
    });
  };

  exports.getAll = (param, next) => {
    Products.find({}, (err, posts) => {
      next(err, posts);
    });
  };


  // GET ID
  exports.getByID = function(query, next) {
    Products.findById(query, function(err, post) {
      next(err, post);
    });
  };

  exports.delete = (req, res) => {
    var id = req.params.id;
    
    postModel.remove(id, (err, result) => {
      if (err) {
        throw err; 
      } 
      else {
        res.redirect('/seecart');
      }
    }); 
  };