const bcrypt = require("bcrypt");
const saltRound = 10;


const User = require("../models/usermodel");
const { getToken } = require("../utils/jwtToken");








exports.postRegister = async (req,res)=>{

    const {name,email,password} = req.body;

    const hashedPass = await bcrypt.hash(password, saltRound, );

    try {
        
        const user = await User.create({
        name,
        email,
        password: hashedPass
    });

    console.log(user);

    if(!user){
        return res.status(500).json({
            success:false,
            message:"User not found!"
        });
    }

    res.status(201).json({
        success:true,
         message:"register successful!",
         isAuthenticated:true,
         user
    });
    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message,
        });
        
    }

    

    // const user = {
    //     name,
    //     email,
    //     password: hashedPass
    // }


    // console.log(user);


   


    // console.log(req.body); 

    // res.status(201).json({
    //     success: true,
    //     message:"user registered successfully",
    //     user
    // })
}

exports.userLogin = async (req,res,next)=>{
    const{email, password} = req.body;
    
    try {
        const user = await User.findOne({email});

    console.log("user", user);

    if(!user){
        return res.status(500).json({
            success:false,
            message:"User not found!"
        });
    }

    const isValid = await bcrypt.compare(password, user.password);

    // console.log("isValid", isValid);

    if(!isValid){
        return res.status(401).json({
            success:false,
            message:"invalid credentials!"
        });
    }

    req.user = user;

    getToken(req, res)

    
    //  res.status(201).json({
    //     success:true,
    //      message:"login successful!",
    //      isAuthenticated:true,
    //      user
    // });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
    

    
}

exports.getAllusers = async (req,res)=>{

    const {token} = req.cookies;


    try {
        const users = await User.find ();
        console.log(users);

        if(!users){
            return res.status(500).json({
                success:false,
                message:"User not found!"
            }); 
        }

        res.status(201).json({
            success:true,
             message:"login successful!",
             users,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
 
exports.updateUserDetails = async (req, res) => {
    const userId = req.params.id;
    // console.log(userId);
    const {name,email} = req.body

    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!",
                user
            }); 
        }
        
        user.name = name;
        user.email = email;
        user.save();

        res.status(200).json({
            success:true,
             message:"user details updated",
             user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
             message:error.message,
            
        });
    }

    
}

exports.getUserDetails = async (req,res)=>{
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!",
                user
            }); 
        }
        res.status(201).json({
            success:true,            
            user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
             message:error.message,
            
        });
    }
}

exports.deleteUser = async(req,res)=>{
    const {id} = req.params

    try {
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!",
                
            }); 
        }
        res.status(201).json({
            success:true,            
            message:"user delete successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
             message:error.message,
            
        });
    }
}