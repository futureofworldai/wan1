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
    image:{
        
        filename:String,
        url:String,
       
        // set: (v) =>v===" "?"https://unsplash.com/photos/a-lifeguard-tower-on-a-beach-at-sunset-YbGM6hRoMH8":v,
            
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

});

const Listing=mongoose.model('Listing',listingSchamma);

module.exports=Listing;