const express=require('express');
const app=express();
const users=require('./routes/user.js');
const posts=require('./routes/post.js');
const session=require('express-session');
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

app.listen(3000,()=>{
    console.log('Server started at port 3000');
});