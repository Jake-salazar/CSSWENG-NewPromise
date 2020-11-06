const express = require('express');
const productsController = require('../controllers/productsController'); //connection to the controllers and database
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('This is the Landing Page');
});

router.get('/AboutUs',(req,res)=>{
    // create the res.render here
    res.send('This is the About Us Page');
});

router.get('/ProductsPage',productsController.getAllProducts,(req,res)=>{
    // create the res.render here
    res.send('This is the Products Page');
});


router.get('/FAQ',(req,res)=>{
    // create the res.render here
    res.send('This is the FAQ page');
});

router.get('/Reviews',(req,res)=>{
    // create the res.render here
    res.send('This is the Reviews page');
});


router.post('/addProducts', productsController.create);

// router.post('/',(req,res)=>{
//     // create the res.render here
//     console.log(req.body);
// });
module.exports = router;