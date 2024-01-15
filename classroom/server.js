const express=require('express');
const app=express();
const users=require('./routes/user.js');
const posts=require('./routes/post.js');
const session=require('express-session');
const flash=require('connect-flash');
const path=require('path');
// const cookieParser = require('cookie-parser')
// // app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("fruit","apple",{signed:true});
//     res.send("cookie set");
// }   );

// app.get("/verifyfruit",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// }   );

// app.get("/getcookie",(req,res)=>{
//     res.cookie("name","dhiraj",{signed:true});
//     res.cookie("age","20",{signed:true});
//     res.cookie("city","delhi",{signed:true});
//     res.send("cookie set");
// }   );
// app.use("/greet",(req,res,next)=>{
//    let {name="anonymous"}=req.cookies;
//    res.send(`hello ${name}`);
 
// });
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("cookies");
// });

// app.get('/',(req,res)=>{    
//     res.send('i am root');
// });
// app.use('/users',users);

// app.use("/posts",posts);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
const sessionoption={secret:"mysupersecretstring",resave:false,saveUninitialized:true}

app.use(session(sessionoption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("sucesses");
    res.locals.error=req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
let {name="anything"}=req.query;

req.session.name=name;
if(name==="anything"){
    req.flash("error","please enter a name'");
   }
else{
    req.flash("sucesses","sucessfully registered");
}
res.redirect("/hello"); 

});

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
});


// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`reqcount is a request ${req.session.count} times`);

// });

app.get("/test",(req,res)=>{
    res.send("test sucessful");
});

app.listen(3000,()=>{
    console.log('Server started at port 3000');
});