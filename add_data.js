const productsModel = require('./models/Products');

// RUN THIS FIRST BEFORE RUNNING "node app.js"
var postArray = [
	{
    // 
      img: "img/boysenpaint.jpg",
      productCategory: "Paint",
	  productName: "Boysen Paint",
	  productBrand: "Boysen",
      productDesc:  "Color blue Boysen Paint",
      productPrice: "100",
      productQuantity: "1",

    }, 
  {
      img: "img/morewoods.jpg",
      productCategory: "Wood",
	  productName: "Ply wood",
	  productBrand: "Ordinary Plywood",
      productDesc:  "Plywood for construction",
      productPrice: "100",
      productQuantity: "2",
  }, 
  {
      img:  "img/pioneerepoxy.jpg",
      productCategory: "Sealant",
	  productName: "Pioneere Epoxy",
	  productBrand: "Epoxy for sealant",
      productDesc: "Sealant for leakage",
      productPrice: "54",
      productQuantity: "2",
  }, 
  {
      img: "img/plywoods.jpg",
      productCategory: "Plywood",
	  productName: "Plywood",
	  productBrand: "Ordinary Plywood",
      productDesc: "Plywood for construction",
      productPrice: "20",
      productQuantity: "1",
  }, 
  {
      img: "img/polituff.jpg",
      productCategory: "Polituff",
	  productName: "Polituff",
	  productBrand: "Polituf material use construction purposes",
      productDesc: "Polituf material use construction purposes",
      productPrice: "20",
      productQuantity: "100",
  }, 
  {
      img: "img/roof.jpg",
      productCategory: "Roofing",
	  productName: "Premium Roof",
	  productBrand: "Roof Premium",
      productDesc: "Roof for houses",
      productPrice: "100",
      productQuantity: "2",

  },
  {
      img: "img/celophane.jpg",
      productCategory: "Celophane",
	  productName: "Celophane",
	  productBrand: "Celophane for houses",
      productDesc: "Celophane for house purposes",
      productPrice: "20",
      productQuantity: "1",
  
  },
  {
      img: "img/spheroepoxy.jpg",
      productCategory: "Sealant",
	  productName: "spheroepoxy",
	  productBrand: "spheroepoxy premium",
      productDesc:  "spheroepoxy for construction",
      productPrice: "200",
      productQuantity: "1",

  },
  {
      img: "img/steelroof.jpg",
      productCategory: "Roofing",
	  productName: "Power Steelroof",
	  productBrand: "Roofie",
      productDesc: "Steelroof for constructions",
      productPrice: "102",
      productQuantity: "1",
  }
];

populate();

function populate(){
   var length  = postArray.length;
    for(var i =0; i < length;i++){
        const post = {
            img: postArray[i].img,
            productName: postArray[i].productName,
            productCategory: postArray[i].productCategory,
	        productBrand: postArray[i].productBrand,
            productDesc: postArray[i].productDesc,
            productPrice: postArray[i].productPrice,
            productQuantity: postArray[i].productQuantity,
           
          };
          productsModel.createProduct(post, function(err, postResult) {
            if (err) throw err;
          }) 
    }
}
