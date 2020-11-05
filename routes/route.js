const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('This is the Landing Page');
});

router.get('/AboutUs',(req,res)=>{
    res.send('This is the About Us Page');
});

router.get('/ProductsPage',(req,res)=>{
    res.send('This is the Products Page');
});


router.get('/FAQ',(req,res)=>{
    res.send('This is the FAQ page');
});

router.get('/Reviews',(req,res)=>{
    res.send('This is the Reviews page');
});


router.post('/',(req,res)=>{
    console.log(req.body);
});
module.exports = router;