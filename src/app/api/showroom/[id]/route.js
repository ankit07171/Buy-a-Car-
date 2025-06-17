import { Showroom_detail } from "@/app/lib/showroommodel";
import { car_details } from "@/app/lib/carmodel";
import connectMongo from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params; 
    await connectMongo();

    const result = await Showroom_detail.findById(id);
    const data = await car_details.find({ showroom_detail_id: id });

    return NextResponse.json({ result, data, success: true });
  } catch (error) {
    console.error("Error fetching showroom:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
