import { connection_str } from "@/app/lib/db";
import { Users_detail } from "@/app/lib/userModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await mongoose.connect(process.env.MONGO_URI);

    const user = await Users_detail.findOne({ email });
    const passwordValidation = bcrypt.compare(password, user.password)
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (!passwordValidation) {
      return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
    }

    const userData = {
      name: user.name,
      email: user.email,
      _id: user._id,
    };
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ success: true, user: userData,token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
