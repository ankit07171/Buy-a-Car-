import { Showroom_detail } from "@/app/lib/showroommodel";
import { NextResponse } from "next/server";
import { car_details } from "@/app/lib/carmodel";
export async function GET(request, content) {
  try {
    const { id } = await content.params;

    const result = await Showroom_detail.find({ _id: id });
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
