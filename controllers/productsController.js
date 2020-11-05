const productsModel = require('../models/Products');


exports.getProducts = (param, callback) =>{
    productsModel.getProducts(param, (err, posts) => {
      if (err) throw err;
      
      const productsObjects = [];
      
      posts.forEach(function(doc) {
        productsObjects.push(doc.toObject());
      });
      
      callback(productsObjects);
    });
  };
