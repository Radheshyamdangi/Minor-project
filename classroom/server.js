const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require('connnect-flash');
const path = require("path");                   
const sessionOptions = {
    secret : "mysupersecrerstring",
    resave:false,
    saveUninitialized:true
};





app.use(
session(sessionOptions));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get("/register",(req,res)=>{
   let {name = "anonmyous"} = req.query ;
   req.session.name = name;
req.flash("successs","user registered successful!");
   res.redirect("/hello");
});
app.get("/hello",(req,res) =>{
    res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
})

// app.get("/test",(req,res) =>{
//     res.send("test Successful");
// })
// app.get("/reqcount",(req,res) =>{
//     if( req.session.count){
//         req.session.count++;
//     }
//     else{req.session.count = 1;}
    
//     res.send(`you sent a request ${req.session.count} time`);
// })
app.listen(3000,() => {
    console.log("Server is working at port 3000");
});