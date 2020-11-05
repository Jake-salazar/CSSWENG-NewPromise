const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, required: true},
    productName:{ type: String, required: true},
    productBrand: { type: String, required: true},
    productDesc: { type: String, required: true},
    productPrice: { type: Number, required: true}

});

const Products = mongoose.model('Products',productsSchema);