// TODO connection with the database

const mongoose = require('mongoose');
const { dbURL } = require('../config');



const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.connect( dbURL , options, () => console.log('connected to the database'));
module.exports = mongoose;