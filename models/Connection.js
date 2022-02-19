// TODO connection with the database

const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://jake:jake@cluster0.82ycp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(dbURL, options, () =>
  console.log(`connected to the database: `)
);
module.exports = mongoose;
