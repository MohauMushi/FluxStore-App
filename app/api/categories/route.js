import { NextResponse } from "next/server";
import { db } from "../../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

/**
 * GET handler for fetching categories from Firestore.
 *
 * This function attempts to retrieve a document named "allCategories" from the "categories" collection in Firestore.
 * It returns the categories array in JSON format if the document exists and contains the categories data.
 * If the document or the categories array does not exist, it returns a 404 error response.
 * In case of an error during the fetch process, it returns a 500 error response.
 *
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} The Next.js response with either the categories data or an error message.
 */
export async function GET() {
  try {
    // Reference to the specific document
    const categoriesDocRef = doc(db, "categories", "allCategories");

    // Get the document
    const docSnap = await getDoc(categoriesDocRef);

    // Check if the document exists
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
