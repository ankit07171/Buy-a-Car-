const { default: mongoose } = require("mongoose");

const User= new mongoose.Schema({
    name:String,
    age:String,
    email:String, 
    password:String
})

export const Users_detail= mongoose.models.Users_detail || mongoose.model('Users_detail',User);