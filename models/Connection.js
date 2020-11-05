// TODO connection with the database

const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/Productsdb';


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.connect(databaseURL, options, () => console.log('connected to the database'));
module.exports = mongoose;