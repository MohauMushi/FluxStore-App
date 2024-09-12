"use client";

import { useState, useEffect } from "react";
import { getProducts } from "../lib/api";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

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

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  if (loading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="mb-5  flex justify-center items-center">
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentPage={currentPage}
          />
        ))}
      </div>
      <div className="mb-5  flex justify-center items-center">
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
