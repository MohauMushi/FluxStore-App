import { NextResponse } from "next/server";
import { auth as adminAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function verifyAuth(request) {
  const token = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Missing authentication token" },
      { status: 401 }
    );
  }

  try {
    const decodedToken = await adminAuth().verifyIdToken(token);
    const userId = decodedToken.uid;
    return userId;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid authentication token" },
      { status: 401 }
    );
  }
}
