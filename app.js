const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use( cors ({
    credentials:true,
    origin : true,
}));
app.use(express.static("uploads"))

app.use(cookieParser());
app.use (express.urlencoded({extended: true}));
app.use(express.json());
app.use(__dirname + "/uploads", express.static(__dirname + "uploads"))

function routerLevelmid(req,res,next){
    console.log("Router level");
    next();
}

function applevel() {
    console.log("applevel invoked");
    // next();
}

applevel();

// userRoutes

const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
app.use('/api/v2' , userRoutes);
app.use('/api/v2' , restaurantRoutes);

// app.get('/', routerLevelmid, (req,res)=>{
//     res.sendFile(__dirname + '/index.html');
    
// });

// app.get('/about',(req,res)=>{
//     res.send("this is about page")
// });

// app.get('/register',(req,res)=>{
//     res.sendFile(__dirname + '/register.html')
//  });


// app.post('/register',(req,res)=>{
   
//     console.log(req.body);
//     res.send("registration successfully!")
// });

app.use((err,req,res,next)=>{
    console.log(err.message);
})



module.exports = app;