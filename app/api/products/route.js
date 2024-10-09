import { db } from "../../../lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Fuse from "fuse.js";

/**
 * GET handler for fetching products from Firestore with filtering, searching, sorting, and pagination.
 *
 * This function retrieves products from the Firestore database based on optional query parameters:
 * - `page`: The page number for pagination (default is 1).
 * - `limit`: The number of products per page (default is 20).
 * - `sortBy`: The field to sort the results by (default is "id").
 * - `order`: The sort order ("asc" for ascending, "desc" for descending, default is "asc").
 * - `category`: An optional filter to get products of a specific category.
 * - `search`: An optional search query to filter products based on the title.
 *
 * The function fetches all products, applies the necessary filters and sorting,
 * and returns a paginated response.
 *
 * @async
 * @function GET
 * @param {Request} request - The incoming request object containing query parameters.
 * @returns {Promise<Response>} A response object containing the filtered, sorted, and paginated products.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const pageLimit = parseInt(searchParams.get("limit")) || 20;
    const sortBy = searchParams.get("sortBy") || "id";
    const order = searchParams.get("order") || "asc";
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // Reference to products collection
    const productsRef = collection(db, "products");
    let queryConstraints = [];

    // Apply category filter if provided
    if (category) {
      queryConstraints.push(where("category", "==", category));
    }

    // Remove sorting from the Firestore query

    // Get all documents for searching and client-side pagination
    const fullQuery = query(productsRef, ...queryConstraints);
    const fullQuerySnapshot = await getDocs(fullQuery);

    let allProducts = [];
    fullQuerySnapshot.forEach((doc) => {
      allProducts.push({
        id: doc.id,
        ...doc.data(),
        price: parseFloat(doc.data().price),
      });
    });

    // Apply search if needed
    if (search) {
      const fuse = new Fuse(allProducts, {
        keys: ["title"],
        threshold: 0.3,
      });
      const searchResults = fuse.search(search);
      allProducts = searchResults.map((result) => result.item);
    }

    // Custom sorting function
    allProducts.sort((a, b) => {
      if (sortBy === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      }
      // For ID sorting, convert to numbers if possible
      const aId = parseInt(a.id) || a.id;
      const bId = parseInt(b.id) || b.id;
      if (typeof aId === "number" && typeof bId === "number") {
        return order === "asc" ? aId - bId : bId - aId;
      }
      // Fallback to string comparison
      return order === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    });
    // Apply pagination to the filtered/searched results
    const startIndex = (page - 1) * pageLimit;
    const paginatedProducts = allProducts.slice(
      startIndex,
      startIndex + pageLimit
    );

    return Response.json({
      products: paginatedProducts,
      hasMore: startIndex + pageLimit < allProducts.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
