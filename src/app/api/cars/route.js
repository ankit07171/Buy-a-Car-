import mongoose from "mongoose";
import { car_details } from "@/app/lib/carmodel";
import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/db";

export async function POST(request){
    const payload= await request.json();
    await mongoose.connect(clientPromise,{ useNewUrlParser: true, useUnifiedTopology: true });

    const response= new car_details(payload);
    const result = await response.save();

    return NextResponse.json({result,success:true})

}