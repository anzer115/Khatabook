const express = require('express') ;
const app = express() ;
require('dotenv').config() ;
const expressSession = require('express-session') ;
const flash = require('connect-flash') ;
const mongooseconnection = require(`./configuration/mongoose`) ;
const userModel = require(`./models/user`) ;
const postModel = require('./models/post') ;
const path = require('path') ;
const cookieParser = require('cookie-parser') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
const user = require('./models/user');

app.set('view engine', 'ejs') ;
app.use(cookieParser()) ;
app.use(express.json()) ;
app.use(express.urlencoded({extended: true})) ;
app.use(express.static(path.join(__dirname,'public'))) ;
app.use(expressSession({
    secret: "qwerty",
    saveUninitialized: false,
    resave: false,
})) ;
app.use(flash()) ;

app.get("/",(req,res)=>{
    const message = req.flash('success') ;
    const failuremessage = req.flash('failed') ;
    let failureReg = req.flash('cnregister') ;
    res.render("login", {message,failuremessage,failureReg}) ;
})


app.get("/create",(req,res)=>{
     res.render("create") ;
})


app.post("/register",async (req,res)=>{
    let {email, password} = req.body ;

    let user = await userModel.findOne({email}) ;
    if(user) { 
        req.flash('cnregister',"User Already Registered! You can Login") ;
        res.redirect("/"); 
    } else {
    bcrypt.genSalt(10, (err,salt)=>{
        bcrypt.hash(password, salt, async (err,hash)=>{
            let createdUser = await userModel.create({
                email,
                password: hash,
            }) ;
        let token = jwt.sign({email: email, userid: userModel._id}, "secret") ;
        res.cookie("token",token) ;
        req.flash("success","Created Successfully! You can now Login")
        res.redirect("/") ;
        }) ;
    }) ;
}
    

}) ;

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        req.flash('failed',"Invalid E-mail address or Password") ;
        res.redirect('/') ;}
    else{
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "secret");
            res.cookie("token", token);
            res.redirect('/view');
        } else {
           req.flash('failed',"Invalid E-mail address or Password") ;
           res.redirect("/");
        }
    });
}
});

app.get("/logout", (req,res)=>{
    res.cookie("token","") ;
    res.redirect("/") ;
}) ;

app.get("/view", isLoggedIn , async (req,res)=>{
     let user = await userModel.findOne({email: req.userdata.email}).populate("posts") ;
     res.render("read",{user}) ;
}) ;

app.get("/show", isLoggedIn , async(req,res)=>{
       res.render("show") ;
}) ;

app.get("/edit/:id", isLoggedIn , async(req,res)=>{
    let getpost = await postModel.findOne({_id: req.params.id}) ;
    res.render("edit",{getpost}) ;
}) ; 

app.post('/update/:id', isLoggedIn,async (req,res)=>{
  let {  title, content   }  =  req.body ;
  let updatedUser = await postModel.findOneAndUpdate({_id: req.params.id},{title,content},{new : true}) ;
  res.redirect("/view") ;

})

app.get("/delete/:id", isLoggedIn ,async(req,res)=>{
    let todelete = await postModel.findOneAndDelete({_id: req.params.id}) ;
    res.redirect("/view") ;
})

app.post("/createhisaab", isLoggedIn , async (req,res)=>{
    let user = await userModel.findOne({email: req.userdata.email}) ;
    let createdhisaab = await postModel.create({
        user: user._id,
        title: req.body.title,
        content: req.body.content,
    }) ;
    user.posts.push(createdhisaab._id) ;
    user.save() ;
    res.redirect("/view")
})




// Middleware for protected routes
function isLoggedIn(req, res, next) {
    let token = req.cookies.token;
    if (!token) res.redirect("/login");

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) return res.send("Failed to authenticate token.");
        req.userdata = decoded; // Create a field in the request to access the user data
        next();
    });
}


app.listen(3000) ;