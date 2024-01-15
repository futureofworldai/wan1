const express=require('express');
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync.js');
const {listingSchema}=require('../schema.js');
const ExpressError=require('../utils/ExpressError.js');
const Listing=require('../models/listing.js');
const validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
   let errMsg=error.details.map((el)=>el.message).join(',');
   throw new ExpressError(400,errMsg);
  }else{
    next();
  
  }

};


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
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
router.get('/new',(req,res)=>{
    res.render('listings/new.ejs');
});
router.get('/:id', wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate('reviews');
    res.render('listings/show.ejs',{listing});
}));

router.post('/',validateListing,wrapAsync (async(req,res)=>{  
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    req.flash('success','Successfully made a new listing!');
    res.redirect('/listings');
  }
));
router.get('/:id/edit',wrapAsync(async (req,res)=>{
        let {id}=req.params;
        const listing= await Listing.findById(id);
        res.render('listings/edit.ejs',{listing});
}));

router.put("/:id",validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }));

  router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  }));

  module.exports=router;