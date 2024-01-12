const mongoose = require('mongoose');

const Schema = mongoose.Schema;
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
    }]

});

const Listing=mongoose.model('Listing',listingSchamma);

module.exports=Listing;