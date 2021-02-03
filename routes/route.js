const express = require('express');
const productsController = require('../controllers/productsController'); //connection to the controllers and database
const ordersController = require('../controllers/ordersController'); // connection to order controller
const reviewsController = require('../controllers/reviewsController');
const userController = require('../controllers/userController');
const loginValidation = require('../validators.js');
const { loggedIn, loggedOut,loginAdmin } = require('../middlewares/checkAuth');
const router = express.Router();
var Cart = require('../models/Cart');





// HOMEPAGE - GET REQUEST
router.get('/',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    if (!req.session.cart){
        productsController.getAllPosts(req, (posts) => {
            res.render('home',{ 
                item: posts,
                products:null
              });
          });
    }
    else{
        var cart = new Cart(req.session.cart);
        productsController.getAllPosts(req, (posts) => {
            res.render('home',{ 
                item: posts,
                products: cart.generateArray(),totalPrice: cart.totalPrice
              });
          });
    }
   
});

// LOGIN FOR ADMIN
router.get('/login',loggedOut,(req,res)=>{
    res.render('login');
});

// LOGIN FORM POST FOR ADMIN
router.post('/loginAdmin', loggedOut, loginValidation, userController.loginUser);

// LOGOUT SETTING FOR ADMIN
router.get('/logout', loggedIn, userController.logoutUser);

// ADMIN HOME PAGE
router.get('/admin',loggedIn,(req,res)=>{

    reviewsController.searchVisible(req, (reviews) => {
        if(reviews.length == 0){
            reviews = null
        }
        ordersController.getAllOrders(req,(orders)=>{
            if(orders.length == 0){
                orders = null
            }
            console.log(orders)
            productsController.getAllPosts(req, (posts) => {
                res.render('admin',{ 
                    item: posts,
                    orderItem: orders,
                    publicReview: reviews
                  });
              });
        });
        
      });
});

/* HOME PAGE NAV BAR SECTION  - ROUTES FOR PAGES OPEN FOR PUBLIC*/
/** 1. PRODUCTS PAGE **/
router.get('/ProductsPage',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    productsController.getAllPosts(req, (posts) => {
        res.render('products',{ 
            item: posts,
            products: cart.generateArray(),totalPrice: cart.totalPrice
          });
      });
});

/**  2. ABOUT US PAGE **/
router.get('/AboutUs',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    res.render('about',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice
      });
});

/**  3. FAQ PAGE **/
router.get('/FAQ',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    res.render('faq',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice
      });
});

/**  4. REVIEWS PAGE  **/
router.get('/Reviews',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    reviewsController.searchVisible(req, (reviews) => {
        res.render('reviews',{ 
            products: cart.generateArray(),totalPrice: cart.totalPrice,
            items: reviews
          });
      });
});

/**  5. CHECKOUT PAGE  **/
router.get('/Checkout',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    var empty = null;
    if (req.session.cart.totalQty == 0){
         empty = true;
    }
    res.render('checkout',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice,
        isEmpty: empty
      });
});

/**  6. FEED BACK */
router.get('/feedback',(req,res)=>{
    res.render('feedback');
});

/** POST FUNCTIONALITIES WITHIN THE PUBLIC */
/** POST A FEED BACK */
router.post('/post/feedback/', reviewsController.creatingReview, (req,res)=>{
    var review = res.locals.review;
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    res.render('feedbackconfirm',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice,
        name: review.fullName
      });
});
/** POST A SEARCH QUERY ITEM */
router.post('/products/search', productsController.searchProduct, (req, res) => {
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    var posts = res.locals.postObject;
        res.render('products',{ 
            item: posts,
            products: cart.generateArray(),totalPrice: cart.totalPrice
          });
});

/** CART FUNCTIONALITIES */
router.get('/cart',(req,res)=>{
    res.render('cart');
});

/** ADD TO CART RENDER */
router.get('/addtocart',(req,res)=>{
    res.render('addtocart');
});

/**CHECK THE DETAILS OF THE ITEM */
router.get('/item-details/:id',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    productsController.getID(req, (post) => {
        res.render('item-details', { 
          item: post,
          products: cart.generateArray(),totalPrice: cart.totalPrice
        });
      });
});

/** VIEW A SPECIFIC ITEM ON THE CART */
router.get('/post/view/:id', (req, res) => {
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    productsController.getID(req, (post) => {
        res.render('products-details', { 
          item: post,
          products: cart.generateArray(),totalPrice: cart.totalPrice 
        });
      });
});

/** CHECK AN ITEM THAT CAN BE ADDED TO THE CART */
router.get('/post/view/addtocart/:id', (req, res) => {

    productsController.getID(req, (post) => {
        res.render('addtocart', { 
          item: post 
        });
      });
});

/** OPEN THE LIST ITEMS THAT HAS BEEN ADDED TO THE CART */
router.get('/seecart',(req,res)=>{
    console.log('see cart opened!');
    if (!req.session.cart){
        return res.render('cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
});

/** EDIT AN ITEN WITH THE CART  */
router.get('/edit/item/:id', (req, res) => {  
    productsController.getID(req, (post) => {
        res.render('item-details', { 
          item: post 
        });
      });
});

/** DELETE AN ITEM WITH THE CART */
router.get('/delete/item/:id', (req, res) => {  
    var cart = new Cart(req.session.cart);
    var id = req.params.id;
    cart.remove(id);
    req.session.cart = cart;
    res.render('cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
});

/** POST THE NEW UPDATES FOR THE EDITED ITEM */
router.post('/Edited/item', productsController.saveChanges);

/** ADD AN ITEM TO THE CART */
router.post('/cart/added', productsController.addingItem);

//** CHECKOUT AN ITEM TO THE CART */
router.post("/Checkout/placeOrder", ordersController.creatingOrder, (req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    req.session.cart = null;
    var today = new Date();
    var order = res.locals.order 
    res.render('receipt',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice,
        orderDetails: order,
        date: today
      });
});


/** FUNCTION FOR UPLOADING IMAGES */
const multer  = require('multer');
const e = require('express');
const session = require('express-session');
const storage = multer.diskStorage({ 
  destination: './public/assets/',
  filename: function(req, file, cb){
    cb(null,file.originalname);
  }
});
const upload = multer({
  storage: storage,
}).single('image');


/** Create, Delete, Edit Stocks */
router.post('/addProducts',upload, productsController.create); 
router.post('/products/delete/:id',loggedIn,productsController.delete); 
router.post('/post/edit',loggedIn,upload, productsController.edit);
router.get('/stock/delete/:id', loggedIn,productsController.delete);
router.get('/stock/edit/:id',loggedIn, (req, res) => {
    productsController.getID(req, (post) => {
        res.render('catalogue-details', { 
          item: post, 
        });
      });
});

/** TRANSFERING ITEMS TO THE PENDING AND PUBLIC REVIEWS */
router.get('/delete-pending/review/:id',loggedIn,reviewsController.deletePending);
router.get('/delete-public/review/:id',loggedIn, reviewsController.deletePublic);
/** SEARCH ALL THE shown attribute that is equal to True - REVIEW */
router.get('/adminreviews-public',loggedIn,(req,res)=>{
    reviewsController.searchVisible(req, (reviews) => {
        res.render('adminreviews-public',{ 
            items: reviews
          });
      });
});

/** SEARCH ALL THE shown attribute that is equal to False - REVIEW */
router.get('/adminreviews-pending',loggedIn,(req,res)=>{
    reviewsController.search(req, (reviews) => {
        res.render('adminreviews-pending',{
            item:reviews
        });
      });
});

/** MAKE AN REVIEW VISIBLE TO THE PUBLIC */ 
router.get('/setVisible/:id',loggedIn,reviewsController.setVisible,(req,res)=>{
    reviewsController.search(req, (reviews) => {
        res.render('adminreviews-pending',{
            item:reviews
        });
      });
});
/** MAKE AN REVIEW VISIBLE TO THE PRIVATE */ 
router.get('/setHide/:id',loggedIn,reviewsController.setHide,(req,res)=>{   
    reviewsController.searchVisible(req, (reviews) => {
        res.render('adminreviews-public',{ 
            items: reviews
          });
      }); 
});

//**SEARCH FOR A CATALOGUE / ALL THE ITEMS FOR THE ADMIN */
router.post('/catalogue/search', loggedIn,productsController.searchProduct, (req, res) => {
    var posts = res.locals.postObject;
        res.render('admincatalogue',{ 
            item: posts,
          });
});
//** GET ALL THE ITEMS STOCKS OF THE ADMIN*/
router.get('/admincatalogue',loggedIn,(req,res)=>{
    // create the res.render here
    productsController.getAllPosts(req, (posts) => {
        res.render('admincatalogue',{
            item:posts
        });
      });
});


/** ORDER FUNCTIONALITIES FOR ADMIN */
/** SEE ALL THE ORDERS FOR THE ADMIN */
router.get('/adminorders',loggedIn,(req,res)=>{
    ordersController.getAllOrders(req,(orders)=>{
        res.render('adminorders',{
            item:orders
        });
    });
});
/** VIEW THE DETAILS OF AN ORDER */
router.get('/orderdetails/:id',(req,res)=>{
    ordersController.getID(req,(order)=>{
        console.log("orderss:")
        console.log(order)
        res.render('orderdetails',{ 
            orderItem: order
          });
    });
});
/** DELETE AN ORDER WITH THE ADMIN DASHBOARD */
router.get('/order/delete/:id', loggedIn,ordersController.delete);
/** DELETE AN ORDER WITH THE ADMIN ORDER DASHBOARD */
router.get('/order/delete-adminorders/:id',loggedIn, ordersController.deleteAdminOrder);
/** EDIT THE STATUS OF AN ORDER */
router.post('/Edit/Status',loggedIn, ordersController.edit);
/** SEARCH FOR A SPECIFIC ORDER */
router.post('/search/order',loggedIn, ordersController.searchOrder, (req, res) => {
    var orders = res.locals.postObject;
        res.render('adminorders',{ 
            item: orders,
          });
});




/** PACHECK IF MAY EFFECT TONG FUNCTIONS */
router.get('/catalogue-details',(req,res)=>{
    res.render('catalogue-details');
});

router.get('/catalogue-details-new',(req,res)=>{
    res.render('catalogue-details-new');
});

router.get('/orderdetails-view',(req,res)=>{
    console.log("hello im at order details")
    res.render('orderdetails-view');
});





module.exports = router;