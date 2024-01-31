const Restaurant = require("../models/restaurantModel");

exports.addRestaurant = async(req,res)=>{

    const{name, address} = req.body;
    // console.log(req.body);
    // console.log("name----------->",name);

    const Photograph = req.file.path;

    // console.log(photograph)

 try {
    const restaurant = await Restaurant.create({
        name,
        address,
        Photograph
    })

    if(!restaurant){
        return res.status(500).json({
            success:false,
            message:"restaurant registration failed"
        });
    }

    res.status(201).json({
        success:true,
         message:"restaurant login successful!",
         restaurant
    });
 } catch (error) {
    res.status(500).json({
        success:false,
         message:error.message,
        
    });
 }
  
}

exports.getRestaurants = async(req,res)=>{
    try {
        const restaurant = await Restaurant.find();
        
        if(!restaurant){
            return res.status(500).json({
                success:false,
                message:"restaurant failed"
            });
        }
    
        res.status(200).json({
            success:true,
             restaurant
        });
           
    } catch (error) {
        res.status(500).json({
            success:false,
             message:error.message,
            
        });
    }
}