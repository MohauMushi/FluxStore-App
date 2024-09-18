"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./pagination";
import SearchBar from "./SearchBar";

/**
 * ProductGrid Component
 *
 * This component displays a grid of product cards with pagination.
 * It fetches products based on the current page and handles page navigation.
 *
 * @param {Object} props - The component props
 * @param {number} props.totalPages - The total number of pages of products
 * @returns {JSX.Element} A div containing the product grid and pagination controls
 */
export default function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the current page from the URL query parameters
  const currentPage = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  // Fetch products when the current page changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage, search]);

  /**
   * Fetches products for the given page
   * @param {number} page - The page number to fetch
   */
  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProducts({
        page: currentPage,
        category,
        search,
      });
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles page change by updating the URL
   * @param {number} newPage - The new page number to navigate to
   */
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`/?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/");
  };
  // Show loading spinner while fetching products
  if (loading) return <LoadingSpinner />;

  // Show error message if product fetch fails
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <SearchBar />
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset Filters
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
      {products.length === 0 ? (
        <div className="text-center text-red-500 py-10">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
