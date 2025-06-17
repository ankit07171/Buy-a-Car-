const { default: mongoose } = require("mongoose");

const Showroom= new mongoose.Schema({
    name:String,
    experience:String,
    location:String
})

export const Showroom_detail= mongoose.models.Showroom_detail || mongoose.model('Showroom_detail',Showroom);