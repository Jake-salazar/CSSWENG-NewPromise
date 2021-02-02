const express = require('express');
const productsController = require('../controllers/productsController'); //connection to the controllers and database
const ordersController = require('../controllers/ordersController'); // connection to order controller
const reviewsController = require('../controllers/reviewsController');
const userController = require('../controllers/userController');
const loginValidation = require('../validators.js');
const { loggedIn, loggedOut,loginAdmin } = require('../middlewares/checkAuth');
const router = express.Router();
var Cart = require('../models/Cart');

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

router.get('/logout', loggedIn, userController.logoutUser);
router.get('/login',loggedOut,(req,res)=>{
    res.render('login');
});
router.post('/loginAdmin', loggedOut, loginValidation, userController.loginUser);



router.get('/AboutUs',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    res.render('about',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice
      });
});

router.get('/Checkout',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    res.render('checkout',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice
      });
});

router.get('/feedback',(req,res)=>{
    res.render('feedback');
});

router.post('/post/feedback/', reviewsController.creatingReview, (req,res)=>{
    var review = res.locals.review;
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    res.render('feedbackconfirm',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice,
        name: review.fullName
      });
});

router.post('/products/search', productsController.searchProduct, (req, res) => {
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    var posts = res.locals.postObject;
        res.render('products',{ 
            item: posts,
            products: cart.generateArray(),totalPrice: cart.totalPrice
          });
});

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


router.get('/admin',loggedIn,(req,res)=>{
    ordersController.getAllOrders(req,(orders)=>{
        if(orders.length == 0){
            orders = null
        }
        console.log(orders)
        productsController.getAllPosts(req, (posts) => {
            res.render('admin',{ 
                item: posts,
                orderItem: orders
              });
          });
    });
});


router.get('/delete-pending/review/:id',loggedIn,reviewsController.deletePending);
router.get('/delete-public/review/:id',loggedIn, reviewsController.deletePublic);
router.get('/adminreviews-public',loggedIn,(req,res)=>{
    reviewsController.searchVisible(req, (reviews) => {
        res.render('adminreviews-public',{ 
            items: reviews
          });
      });
});
router.get('/adminreviews-pending',loggedIn,(req,res)=>{
    reviewsController.search(req, (reviews) => {
        res.render('adminreviews-pending',{
            item:reviews
        });
      });
});

router.get('/setVisible/:id',loggedIn,reviewsController.setVisible,(req,res)=>{
    reviewsController.search(req, (reviews) => {
        res.render('adminreviews-pending',{
            item:reviews
        });
      });
});
router.get('/setHide/:id',loggedIn,reviewsController.setHide,(req,res)=>{   
    reviewsController.searchVisible(req, (reviews) => {
        res.render('adminreviews-public',{ 
            items: reviews
          });
      }); 
});


router.post('/catalogue/search', productsController.searchProduct, (req, res) => {
    var posts = res.locals.postObject;
        res.render('admincatalogue',{ 
            item: posts,
          });
});

router.get('/admincatalogue',loggedIn,(req,res)=>{
    // create the res.render here
    productsController.getAllPosts(req, (posts) => {
        res.render('admincatalogue',{
            item:posts
        });
      });
});

router.get('/catalogue-details',(req,res)=>{
    // create the res.render here
    res.render('catalogue-details');
});

router.get('/catalogue-details-new',(req,res)=>{
    // create the res.render here
    res.render('catalogue-details-new');
});

router.get('/orderdetails-view',(req,res)=>{
    // create the res.render here
    console.log("hello im at order details")
    res.render('orderdetails-view');
});

router.post('/search/order',loggedIn, ordersController.searchOrder, (req, res) => {
    var orders = res.locals.postObject;
        res.render('adminorders',{ 
            item: orders,
          });
});

router.get('/adminorders',loggedIn,(req,res)=>{
    ordersController.getAllOrders(req,(orders)=>{
        res.render('adminorders',{
            item:orders
        });
    });
});

router.get('/orderdetails/:id',(req,res)=>{
    ordersController.getID(req,(order)=>{
        console.log("orderss:")
        console.log(order)
        res.render('orderdetails',{ 
            orderItem: order
          });
    });
});


router.get('/order/delete/:id', loggedIn,ordersController.delete);
router.get('/order/delete-adminorders/:id',loggedIn, ordersController.deleteAdminOrder);


router.get('/cart',(req,res)=>{
    // create the res.render here
    res.render('cart');
});

router.get('/addtocart',(req,res)=>{
    // create the res.render here
    res.render('addtocart');
});

router.get('/item-details/:id',(req,res)=>{
    productsController.getID(req, (post) => {
        res.render('item-details', { 
          item: post 
        });
      });
});



router.get('/FAQ',(req,res)=>{
    var cart = new Cart(req.session.cart ? req.session.cart: {items:{}});
    req.session.cart =cart;
    res.render('FAQ',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice
      });
});

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


router.post('/addProducts',loggedIn,upload, productsController.create); // WORKING
router.post('/products/delete/:id',loggedIn,productsController.delete); // FIXING

// router.post('/',(req,res)=>{
//     // create the res.render here
//     console.log(req.body);
// });
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

router.get('/post/view/addtocart/:id', (req, res) => {

    productsController.getID(req, (post) => {
        res.render('addtocart', { 
          item: post 
        });
      });
});



router.get('/seecart',(req,res)=>{
    console.log('see cart opened!');
    if (!req.session.cart){
        return res.render('cart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
});


router.get('/edit/item/:id', (req, res) => {  
    productsController.getID(req, (post) => {
        res.render('item-details', { 
          item: post 
        });
      });
});

router.get('/delete/item/:id', (req, res) => {  
    var cart = new Cart(req.session.cart);
    var id = req.params.id;
    cart.remove(id);
    req.session.cart = cart;
    res.render('cart',{products: cart.generateArray(),totalPrice: cart.totalPrice});
});

router.post('/Edited/item', productsController.saveChanges);
router.post('/cart/added', productsController.addingItem);


router.get('/stock/delete/:id', loggedIn,productsController.delete);

router.get('/stock/edit/:id',loggedIn, (req, res) => {
    productsController.getID(req, (post) => {
        res.render('catalogue-details', { 
          item: post, 
        });
      });
});

router.post('/post/edit',upload, productsController.edit);

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


router.post('/Edit/Status',loggedIn, ordersController.edit);

module.exports = router;