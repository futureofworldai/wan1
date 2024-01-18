const express=require('express');
const router=express.Router();
const Listing=require('../models/listing');
const wrapAsync=require('../utils/wrapAsync.js');
const {listingSchema,reviewSchema}=require('../schema.js');
const {isLoggedIn, isOwner,validateListing}=require('../middleware.js');
const listingController=require('../controllers/listings.js');
const multer  = require('multer');
const {storage}=require('../CloudConfig.js');
const upload = multer({ storage });



router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync (listingController.createListing));


router.get('/new',isLoggedIn,listingController.renderNewForm);

router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single('listing[image]') ,validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destoryListing));


//index route


//show index

//show route




//edit route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
//update route

//delete route


  module.exports=router;