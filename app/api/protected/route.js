import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

export async function GET(request) {
  const userId = await verifyAuth(request);

  if (typeof userId === "string") {
    return NextResponse.json({ message: "Protected data", userId });
  }

  return userId; // This will be the error response from verifyAuth
}
