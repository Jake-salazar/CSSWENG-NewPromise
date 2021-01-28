const express = require('express');
const productsController = require('../controllers/productsController'); //connection to the controllers and database
const router = express.Router();

router.get('/',(req,res)=>{
    productsController.getAllPosts(req, (posts) => {
        console.log('posts: ');
        console.log(posts)
        res.render('home',{ 
            item: posts,
          });
      });
});



router.get('/AboutUs',(req,res)=>{
    // create the res.render here
    res.render('products-details');
});

router.get('/ProductsPage',productsController.getAllProducts,(req,res)=>{
    // create the res.render here
    // res.render('products');
    // later we are gonna put posts to the products hbs
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
    productsController.getAllPosts(req, (posts) => {
        console.log(posts)
        res.render('admin',{ 
            item: posts,
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

router.get('/item-details',(req,res)=>{
    // create the res.render here
    res.render('item-details');
});


router.get('/FAQ',(req,res)=>{
    // create the res.render here
    res.render('FAQ');
});

router.get('/Reviews',(req,res)=>{
    // create the res.render here
    res.render('reviews');
});

const multer  = require('multer')
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
        console.log("post items:");
        console.log(post);
        res.render('products-details', { 
          item: post 
        });
      });
 
});



module.exports = router;