import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

/**
 * GET handler for fetching protected data based on user authentication.
 *
 * This function verifies the user's authentication status using the provided request.
 * If the user is authenticated, it returns a JSON response with a message and the user's ID.
 * If the authentication fails, it returns an error response from the `verifyAuth` function.
 *
 * @async
 * @function GET
 * @param {Request} request - The incoming request object used for authentication verification.
 * @returns {Promise<Response>} A response object containing either the protected data (if authenticated) or an error response.
 */
export async function GET(request) {
  const userId = await verifyAuth(request);

  if (typeof userId === "string") {
    return NextResponse.json({ message: "Protected data", userId });
  }

  return userId; // This will be the error response from verifyAuth
}
