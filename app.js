const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require('method-override');
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const ejsmate=require('ejs-mate');
// const {listingSchema,reviewSchema}=require('./schema.js');
// const Review=require('./models/review.js');
// const { wrap } = require('module');
const listings=require('./routes/listing.js');
const reviews=require('./routes/review.js');

const session=require('express-session');
const flash=require('connect-flash');
main()
  .then(()=>{
    console.log('Connected to DB')
})
  .catch((err)=>
  {console.log(err)}
  );

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs',ejsmate);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')));
const sessionOptions={
    secret: "mysupersecertcode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
        httpOnly: true,
    }
}
app.get('/',(req,res)=>{    
    res.send('Hello World');
});
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    
    next();
});



app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

app.all('*',(req,res,next)=>{ 
    next(new ExpressError(404,'Page not found'));
});

app.use((err,req,res,next)=>{
   let{statusCode=500,message="something went wrong"}=err;
   res.status(statusCode).render('error.ejs',{message});
   });

app.listen(3000,()=>{
    console.log('Server started at port 3000');
});