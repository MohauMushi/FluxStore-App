"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceSort({ isReset }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "default"
  );

  useEffect(() => {
    if (isReset) {
      setSortOrder("default");
    }
  }, [isReset]);

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const currentParams = new URLSearchParams(searchParams.toString());
    if (order === "default") {
      currentParams.delete("sortBy");
      currentParams.delete("order");
    } else {
      currentParams.set("sortBy", "price");
      currentParams.set("order", order);
    }
    currentParams.set("page", "1");
    router.push(`/?${currentParams.toString()}`);
  };

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
        onChange={handleSortChange}
        className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="default">Default</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}