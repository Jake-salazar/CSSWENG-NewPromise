const mongoose = require('./Connection');
var Cart = require('../models/Cart');

const orderschema = mongoose.Schema({
    cart: [ Cart ],
    firstName: {type:String,required: true},
    lastName:{ type: String, required: true},
    middleInitial: { type: String, required: true},
    emailAddress: { type: String, required: true},
    facebookName: { type: String, required: true},
    contactNumber: {type: Number, required: true}
});

const Orders = mongoose.model('Orders',orderschema);