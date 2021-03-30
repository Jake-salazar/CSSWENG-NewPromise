// TODO connection with the database

const mongoose = require('mongoose');
const { dbURL } = require('../config');

const db_url =  "mongodb://localhost:27017/Productsdb"


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.connect( db_url , options, () => console.log('connected to the database'));
module.exports = mongoose;