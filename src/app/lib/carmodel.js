import mongoose from "mongoose";

const carModel = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }, 
    image:{type:String},
    showroom_detail_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'showroom' 
      }
      
});

export const car_details = mongoose.models.car || mongoose.model("car", carModel);
