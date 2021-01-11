const express = require('express');
const productsController = require('../controllers/productsController'); //connection to the controllers and database
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('home');
});

router.get('/AboutUs',(req,res)=>{
    // create the res.render here
    res.render('about');
});

router.get('/ProductsPage',/*productsController.getAllProducts,*/(req,res)=>{
    // create the res.render here
    res.render('products');
});

router.get('/products-details',(req,res)=>{
    // create the res.render here
    res.render('products-details');
});

router.get('/login',(req,res)=>{
    // create the res.render here
    res.render('login');
});

router.get('/admin',(req,res)=>{
    // create the res.render here
    res.render('admin');
});

router.get('/adminreviews',(req,res)=>{
    // create the res.render here
    res.render('adminreviews');
});


router.get('/FAQ',(req,res)=>{
    // create the res.render here
    res.render('FAQ');
});

router.get('/Reviews',(req,res)=>{
    // create the res.render here
    res.render('reviews');
});


router.post('/addProducts', productsController.create); // WORKING
router.post('/products/delete/:id',productsController.delete); // FIXING

// router.post('/',(req,res)=>{
//     // create the res.render here
//     console.log(req.body);
// });
module.exports = router;