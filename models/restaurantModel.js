const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter restaurant name"]

    },
    address:{
        type:String,
        required:[true, "please enter restaurant address"],
    },
    Photograph:{
        type:String,
        // required:[true,"please enter restaurant Photograph"],
    }

});

module.exports = mongoose.model('restaurant', restaurantSchema)