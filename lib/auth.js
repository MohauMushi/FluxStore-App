import { NextResponse } from "next/server";
import { auth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

/**
 * Initialize Firebase Admin SDK if it hasn't been initialized yet.
 * This uses environment variables for the Firebase project configuration.
 */
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * Verifies the authentication token from the request headers.
 *
 * @async
 * @function verifyAuth
 * @param {Object} request - The incoming request object from Next.js API route.
 * @returns {Promise<string|NextResponse>} The user ID if authentication is successful, or a NextResponse object with an error if authentication fails.
 * @throws {Error} If there's an issue verifying the token.
 */
export async function verifyAuth(request) {
  try {
    // Extract the Authorization header from the request
    const authHeader = request.headers.get("Authorization");

    // Check if the Authorization header is present and in the correct format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split("Bearer ")[1];

    // Verify the token using Firebase Admin SDK
    const decodedToken = await auth().verifyIdToken(token);

    // Return the user ID from the decoded token
    return decodedToken.uid;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error verifying auth token:", error);

    // Return an error response
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
