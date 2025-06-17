import mongoose from "mongoose";
import { car_details } from "@/app/lib/carmodel";
import { NextResponse } from "next/server";
import { connection_str } from "@/app/lib/db";

export async function POST(request){
    const payload= await request.json();
    await mongoose.connect(connection_str,{ useNewUrlParser: true, useUnifiedTopology: true });

    const response= new car_details(payload);
    const result = await response.save();

    return NextResponse.json({result,success:true})

}