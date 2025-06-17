 
import { NextResponse } from "next/server";
import { car_details } from "@/app/lib/carmodel";

export async function GET(request, content) {
  try {
    const { id } = await content.params; 
    const data = await car_details.find({ _id: id});
    return NextResponse.json({  data, success: true });
  } catch (error) {
    console.error("Error fetching showroom:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
