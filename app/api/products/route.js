import { db } from "../../../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import Fuse from "fuse.js";

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

    // Apply sorting
    if (sortBy === "price") {
      queryConstraints.push(orderBy("price", order));
    }
    // Always add ID as secondary sort for consistency
    if (sortBy !== "id") {
      queryConstraints.push(orderBy("id", order));
    }

    // Get all documents for searching and client-side pagination
    let allProducts = [];
    const fullQuery = query(productsRef, ...queryConstraints);
    const fullQuerySnapshot = await getDocs(fullQuery);

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
