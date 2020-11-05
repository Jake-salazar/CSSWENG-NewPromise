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