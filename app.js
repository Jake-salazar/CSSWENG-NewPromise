/* Initialize all dependencies here */
const express = require("express")
const path = require('path');
const exphbs = require('express-handlebars')
const bodyParser = require("body-parser")
const appRoute = require('./routes/route');
const mongoose = require('./models/Connection');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//TODO: DB connection here


// App initialization
const app = express()

const { sessionKey } = require('./config');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts'), 
    partialsDir: path.join(__dirname, '/views/partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
}))
app.set('view engine', 'hbs')


//? Middlewares here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: sessionKey,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
  }));

  app.use(flash());
  
  app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });


//? Partials and Static files
app.use(express.static(__dirname + '/public/'))

app.use("/", appRoute);





//? Helper functions for HBS section

//************  Server online *************/
//TODO: Move to .env file after development

const LOCAL_ADDRESS = 'localhost'
app.listen(process.env.PORT, LOCAL_ADDRESS, ()=>{
    console.log(`Server ready | Listening at ${LOCAL_ADDRESS}:${process.env.PORT}`)
})

/*app.listen(process.env.PORT, process.env.LOCAL_ADDRESS, ()=>{
    console.log("Server ready.");
})*/