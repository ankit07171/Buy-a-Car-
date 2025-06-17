import connectMongo from "@/app/lib/db";
import { Users_detail } from "@/app/lib/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { name, age, email, password } = await request.json();
    await connectMongo();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users_detail({ name, age, email, password: hashedPassword });

    const result = await user.save();
    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ result, success: true, token });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const users = await Users_detail.find();
    return NextResponse.json({ users, success: true });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
