const mongoose = require('./Connection');
console.log("here are orders schema")
/* 
const cartSchema = mongoose.Schema({
    items: {type:Object},
    totalQty: {type:Number,require:true},
    totalPrice: {type:Number,require:true}
});
 */

const orderschema = mongoose.Schema({
    cart: {type:Object, required:true},
    firstName: {type:String,required: true},
    lastName:{ type: String, required: true},
    middleInitial: { type: String, required: true},
    emailAddress: { type: String, required: true},
    facebookName: { type: String, required: true},
    contactNumber: {type: Number, required: true},
    address: {type:String, required: true},  
    status: {type:String,required:true}
},{
    timestamps: true
}
);

const Orders = mongoose.model('Orders',orderschema);

exports.createOrder = function(obj, next) {
    const order = new Orders(obj);
    console.log(order);
    order.save(function(err, order) {
      next(err, order);
    });
  };

  exports.getAll = (param, next) => {
    Orders.find({}, (err, posts) => {
      next(err, posts);
    });
  };

  exports.getByID = function(query, next) {
    Orders.findById(query, function(err, post) {
      next(err, post);
    });
  };

  exports.remove = function(query, next) {
    Orders.findByIdAndRemove(query, function(err, post){
      next(err, post);
    });
  };


  exports.update = function(id, update, next) {
    Orders.findOneAndUpdate({_id: id}, update, { new: true }, function(err, post) {
      next(err, post);
    })
  };