const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Review=require('./review.js');
const listingSchamma=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
       
    },
    image: {
        type: String,
        default: 'https://source.unsplash.com/collection/483251'
      },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country: {
        type: String,
        
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'Review'
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },

});
listingSchamma.post('findOneAndDelete',async(listing)=>{
if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
}
})


const Listing=mongoose.model('Listing',listingSchamma);

module.exports=Listing;