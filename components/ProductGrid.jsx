"use client";

import { useState, useEffect } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./pagination";
import { useRouter, useSearchParams } from "next/navigation";

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
export default function ProductGrid({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the current page from the URL query parameters
  const currentPage = Number(searchParams.get("page")) || 1;

  // Fetch products when the current page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  /**
   * Fetches products for the given page
   * @param {number} page - The page number to fetch
   */
  async function fetchProducts(page) {
    try {
      setLoading(true);
      const data = await getProducts(page);
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
    router.push(`/?page=${newPage}`);
  };

  // Show loading spinner while fetching products
  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  // if (loading) {
  //   return (
  //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  //       {[...Array(8)].map((_, index) => (
  //         <div
  //           key={index}
  //           className="animate-pulse bg-gray-200 h-64 rounded-lg"
  //         ></div>
  //       ))}
  //     </div>
  //   );
  // }

  // Show error message if product fetch fails
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => fetchProducts(currentPage)}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Show message if no products are found
  if (products.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  // Rendering product grid and pagination
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentPage={currentPage}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
