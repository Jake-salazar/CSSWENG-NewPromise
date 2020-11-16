const mongoose = require('./connection');

const productsSchema = mongoose.Schema({
    productName:{ type: String, required: true},
    productBrand: { type: String, required: true},
    productDesc: { type: String, required: true},
    productPrice: { type: Number, required: true}
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