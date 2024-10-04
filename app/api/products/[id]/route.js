import { db } from "../../../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

/**
 * Handles GET requests to fetch a product by its ID.
 *
 * @async
 * @function GET
 * @param {Request} request - The incoming request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.id - The ID of the product to fetch.
 * @returns {Promise<Response>} A promise that resolves to a Response object.
 * @throws {Error} If there's an issue fetching the product from the database.
 */
export async function GET(request, { params }) {
  try {
    // Extract the id from the route parameters
    const { id } = params;

    // Input validation: check if id exists and is a valid number
    if (!id || !/^\d+$/.test(id)) {
      return Response.json({ error: "Invalid product ID" }, { status: 400 });
    }

    // Pad the ID with leading zeros to match the format in the database
    const paddedId = id.toString().padStart(3, "0");

    // Create a reference to the document in the 'products' collection
    const productRef = doc(db, "products", paddedId);

    // Fetch the document from Firestore
    const productDoc = await getDoc(productRef);

    // Check if the document exists in the database
    if (!productDoc.exists()) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Extract the data from the document
    const productData = productDoc.data();

    // Check if the product document has data
    if (!productData) {
      return Response.json(
        { error: "Product exists but has no data" },
        { status: 500 }
      );
    }

    // Construct the final product object, including the document ID
    const product = {
      id: productDoc.id,
      ...productData,
    };

    // Return the product data as a JSON response with a 200 status
    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error fetching product:", error);

    // Return a 500 Internal Server Error response with error details
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
