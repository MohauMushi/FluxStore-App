"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProduct } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import ReviewList from "../../../components/Reviews";
import Gallery from "../../../components/Gallery";
import StarRating from "@/components/StarRating";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * ProductPage Component
 * Renders a detailed view of a single product.
 *
 * @param {Object} props - The component props
 * @param {Object} props.params - The route parameters
 * @param {string} props.params.id - The product ID
 * @returns {JSX.Element} The rendered ProductPage component
 */
export default async function ProductPage({ params }) {
  // State for managing product data, loading state, and errors
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Next.js routing hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  // Fetch product data on component mount or when params.id changes
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProduct(params.id);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error message if fetch failed
  if (error) return <div className="text-red-500">{error}</div>;

  // Show message if no product found
  if (!product) return <div>No product found.</div>;

  // Render product details
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to products link */}
      <Link
        href={`/?page=${page}`}
        className="
          inline-block px-4 py-2 mb-4
          text-sm font-medium text-white
          bg-teal-500 rounded-md shadow-md
          transition duration-300 ease-in-out
          hover:bg-teal-600 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
          active:bg-teal-700 active:shadow-inner
          transform hover:-translate-y-0.5 active:translate-y-0
          "
      >
        <span className="inline-block mr-2 transition-transform duration-300 group-hover:-translate-x-1">
          &larr;
        </span>
        Back to products
      </Link>

      {/* Product details grid */}
      <div className="grid bg-gray-50 p-5 rounded-lg grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image gallery */}
        <div>
          <Gallery images={[...product.images]} />
        </div>

        {/* Product information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-black font-bold mb-2 text-xl">${product.price}</p>
          <p className="text-gray-600 px-2 py-1 bg-indigo-100 rounded-md text-xs font-medium mb-2 inline-block">
            {product.category}
          </p>
          <StarRating rating={product.rating} />

          {/* Stock information */}
          <div className="flex items-center space-x-2 mb-2 text-sm font-medium">
            <span
              className={`px-2 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
            <span className="text-gray-600">
              Available: <span className="font-bold">{product.stock}</span>
            </span>
          </div>

          {/* Product tags */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Tags:</h2>
            <div className="flex flex-wrap">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product reviews */}
      <ReviewList reviews={product.reviews || []} />
    </div>
  );
}
