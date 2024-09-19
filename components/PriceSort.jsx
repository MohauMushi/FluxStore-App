"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "default"
  );



  return (
    <div className="w-full">
      <label
        htmlFor="price-sort"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Sort by Price:
      </label>
      <select
        id="price-sort"
        value={sortOrder}
        className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="default">Default</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}
