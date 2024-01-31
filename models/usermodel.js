const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name:{
    type:String,
    minLength:[3, "Full name should have minimum 3 characters"],
    maxLength:[28, "Full name shouldn't exceed 28 characters"],
    required:[true,"please enter name"]
},
email:{
    type:String,
    required:[true,"Please enter a valid email address"],
    unique:true,
    validate:[validator.isEmail,"please enter a valid email"]
},
password:{
    type:String,
    required:[true, "Please enter your password"]
}

});


module.exports = mongoose.model('user', userSchema);