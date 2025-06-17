import { connection_str } from "@/app/lib/db";
import { Showroom_detail } from "@/app/lib/showroommodel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


export async function POST(request) {
    try {
        const payload = await request.json();
        await mongoose.connect(connection_str, { useNewUrlParser: true, useUnifiedTopology: true });
 
        const user = new Showroom_detail(payload);  
        const result = await user.save();

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
 
export async function GET() {
    try {
        await mongoose.connect(connection_str, { useNewUrlParser: true, useUnifiedTopology: true });

        const result = await Showroom_detail.find(); 
        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
