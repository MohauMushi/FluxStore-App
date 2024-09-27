"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./pagination";
import PriceSort from "./PriceSort";
import CategoryFilter from "./CategoryFilter";
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
  const [isReset, setIsReset] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  // Get the current page from the URL query parameters
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";
  const limit = 20;

  /**
   * Determines if any filters are active
   * @type {boolean}
   */
  const isFilterActive = useMemo(() => {
    return (
      category !== "" || search !== "" || sortBy !== "id" || order !== "asc"
    );
  }, [category, search, sortBy, order]);

  // Fetch products when the current page changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage, category, search, sortBy, order]);

  /**
   * Fetches products for the given page
   * @param {number} page - The page number to fetch
   */
  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await getProducts({
        page: currentPage,
        limit,
        category,
        search,
        sortBy,
        order,
      });
      setProducts(data);
      setTotalPages(Math.ceil(data.length / limit));
      setIsLastPage(
        data.length < limit || currentPage === Math.ceil(data / limit)
      );
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
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", newPage.toString());
    router.push(`/?${currentParams.toString()}`);
  };

  const handleReset = () => {
    setIsReset(true);
    router.push("/");
    setTimeout(() => setIsReset(false), 100);
  };
  // Show loading spinner while fetching products
  if (loading) return <LoadingSpinner />;
  // Throw error if product fetch fails
  if (error) {
    throw error;
  }

  // if (error) {
  //     return (
  //     <div className="text-center py-10">
  //       <p className="text-red-500 mb-4">{error}</p>
  //       <button
  //         onClick={fetchProducts}
  //         className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <CategoryFilter isReset={isReset} />
        </div>
        <div className="w-full sm:w-auto">
          <PriceSort isReset={isReset} />
        </div>
      </div>
      {isFilterActive && (
        <div className="flex flex-col md:flex-row justify-end items-end mb-6">
          <button
            onClick={handleReset}
            className="
            px-6 py-2 
            bg-teal-500 text-gray-100 
            rounded-md 
            transition-all duration-300 ease-in-out
            transform hover:scale-105 hover:bg-teal-600 
            active:scale-95 active:bg-teal-400
            focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50
            shadow-md hover:shadow-lg
            "
          >
            <span className="flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2 transform rotate-0 transition-transform duration-300 ease-in-out group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset Filters
            </span>
          </button>
        </div>
      )}

      {products.length === 0 && !error ? (
        <div className="text-center text-red-500 py-10">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
}
