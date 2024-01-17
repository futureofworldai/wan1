const express=require('express');
const router=express.Router();
const Listing=require('../models/listing');
const wrapAsync=require('../utils/wrapAsync.js');
const {listingSchema,reviewSchema}=require('../schema.js');
const {isLoggedIn, isOwner,validateListing}=require('../middleware.js');

const validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
   let errMsg=error.details.map((el)=>el.message).join(',');
   throw new ExpressError(400,errMsg);
  }else{
    next();
  
  }

};




router.get('/',wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render('listings/index.ejs',{allListings});
}));
//show index
router.get('/new',isLoggedIn,(req,res)=>{
    res.render('listings/new.ejs');
});
router.get('/:id', wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate({path:'reviews',populate:{path:"author"}}).populate('owner');
    if(!listing){
        req.flash('error','Listing not found!');
        return res.redirect('/listings');
    }
    res.render('listings/show.ejs',{listing});
}));

router.post('/',isLoggedIn,isOwner,validateListing,wrapAsync (async(req,res)=>{  
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash('success','Successfully made a new listing!');
    res.redirect('/listings');
  }
));
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
        let {id}=req.params;
        const listing= await Listing.findById(id);
        if(!listing){
          req.flash('error','Listing not found!');
          return res.redirect('/listings');
      } 
       
        res.render('listings/edit.ejs',{listing});
}));
//update route
router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success','Successfully updated listing!');
    res.redirect(`/listings/${id}`);
  }));

  router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Successfully deleted!');
    res.redirect("/listings");
  }));

  module.exports=router;