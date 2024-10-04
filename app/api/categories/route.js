import { NextResponse } from "next/server";
import { db } from "../../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET() {
  try {
    // Reference to the specific document
    const categoriesDocRef = doc(db, "categories", "allCategories");

    // Get the document
    const docSnap = await getDoc(categoriesDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Categories data:", data);

      // Check if the categories array exists in the document
      if (data && Array.isArray(data.categories)) {
        return NextResponse.json(data.categories);
      } else {
        console.log("Categories array not found in the document");
        return NextResponse.json(
          { error: "Categories not found" },
          { status: 404 }
        );
      }
    } else {
      console.log("No such document!");
      return NextResponse.json(
        { error: "Categories document not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
