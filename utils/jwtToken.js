const jwt = require("jsonwebtoken");

exports.getToken = (req,res)=>{

    const options = {
        id:req.user._id,
        time:Date.now()
    }

    const token = jwt.sign(options,process.env.JWT_SECRET_KEY,{expiresIn:'30min'});

    // console.log(token);

    if(!token){
        return response.status(500).json({
            success:false,
            message:"token Login failed!",
            isAuthenticated:false,
        })
    }

    res.status(200).cookie("token",token).json({
        success:true,
        user:req.user,
        token,
        message:"login successful!",
        isAuthenticated:true,
    })

    
}