import { db } from "../../../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {
  try {
    // Pad the ID with leading zeros to match the format in the database
    const paddedId = params.id.toString().padStart(3, "0");

    // Create a reference to the document
    const productRef = doc(db, "products", paddedId);

    // Get the document
    const productDoc = await getDoc(productRef);

    // Check if the document exists
    if (!productDoc.exists()) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Get the data and add the ID
    const productData = {
      id: productDoc.id,
      ...productDoc.data(),
    };

    return Response.json(productData);
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
