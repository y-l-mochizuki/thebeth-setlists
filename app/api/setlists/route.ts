import { SetlistPostData, createThebethSetlist, postImage } from "@/utils/api";
import { isValidSetlistPostData } from "@/utils/validations";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SetlistPostData;
    if (!isValidSetlistPostData(body)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const imageUrl = await postImage(body.image);
    await createThebethSetlist({
      ...body,
      image: imageUrl,
    });
    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
