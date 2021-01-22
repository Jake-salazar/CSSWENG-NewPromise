/* Initialize all dependencies here */
const express = require("express")
const path = require('path');
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser")
const appRoute = require('./routes/route');

//TODO: DB connection here


// App initialization
const app = express()
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts'), 
    partialsDir: path.join(__dirname, '/views/partials'),
}))
app.set('view engine', 'hbs')


//? Middlewares here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//? Partials and Static files
app.use(express.static(__dirname + '/public/'))

app.use("/", appRoute);





//? Helper functions for HBS section

//************  Server online *************/
//TODO: Move to .env file after development
const PORT = 3000
const LOCAL_ADDRESS = 'localhost'
app.listen(PORT, LOCAL_ADDRESS, ()=>{
    console.log(`Server ready | Listening at ${LOCAL_ADDRESS}:${PORT}`)
})

/*app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, ()=>{
    console.log("Server ready.");
})*/