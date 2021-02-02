const express = require('express');
const productsController = require('../controllers/productsController'); //connection to the controllers and database
const ordersController = require('../controllers/ordersController'); // connection to order controller
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
    // create the res.render here
    res.render('feedback');
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

/* router.get('/products-details',(req,res)=>{
    // create the res.render here
    res.render('products-details');
}); */

router.get('/login',(req,res)=>{
    // create the res.render here
    res.render('login');
});

router.get('/admin',(req,res)=>{
    // create the res.render here
    console.log("adminsss")
    ordersController.getAllOrders(req,(orders)=>{
        console.log("orders")
        console.log(orders)
        productsController.getAllPosts(req, (posts) => {
            res.render('admin',{ 
                item: posts,
                orderItem: orders
              });
          });
    });
});

router.get('/adminreviews',(req,res)=>{
    // create the res.render here
    res.render('adminreviews');
});

router.get('/admincatalogue',(req,res)=>{
    // create the res.render here
    res.render('admincatalogue');
});

router.get('/catalogue-details',(req,res)=>{
    // create the res.render here
    res.render('catalogue-details');
});

router.get('/catalogue-details-new',(req,res)=>{
    // create the res.render here
    res.render('catalogue-details-new');
});

router.get('/adminorders',(req,res)=>{
    // create the res.render here
    res.render('adminorders');
});

router.get('/orderdetails',(req,res)=>{
    // create the res.render here
    res.render('orderdetails');
});

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
    res.render('reviews',{ 
        products: cart.generateArray(),totalPrice: cart.totalPrice
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


router.post('/addProducts',upload, productsController.create); // WORKING
router.post('/products/delete/:id',productsController.delete); // FIXING

// router.post('/',(req,res)=>{
//     // create the res.render here
//     console.log(req.body);
// });
router.get('/post/view/:id', (req, res) => {
    console.log("Read view successful!");
  
    productsController.getID(req, (post) => {
        res.render('products-details', { 
          item: post 
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


router.get('/stock/delete/:id', productsController.delete);
router.get('/stock/edit/:id', (req, res) => {
    productsController.getID(req, (post) => {
        res.render('catalogue-details', { 
          item: post, 
        });
      });
});

router.post('/post/edit',upload, productsController.edit);

router.post("/Checkout/placeOrder", ordersController.creatingOrder, (req,res)=>{
    console.log("session cart:");
    console.log(req.session.cart);
});

module.exports = router;