"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "../lib/api";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    const currentParams = new URLSearchParams(searchParams.toString());
    if (category) {
      currentParams.set("category", category);
    } else {
      currentParams.delete("category");
    }
    currentParams.set("page", "1");
    router.push(`/?${currentParams.toString()}`);
  };

  return (
    <div className="w-full md:w-auto mb-4 md:mb-0">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
