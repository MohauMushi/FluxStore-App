"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");
  };

  return (
    <div className="mb-6">
      {/* Main container for the search bar */}
      <div className="w-full md:w-auto mb-3">
        <div className="relative">
          {/* Search input field */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {/* Search button */}
          <button
            type="button"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-teal-700 dark:bg-gray-950 rounded-e-lg border border-teal-700 dark:border-gray-700 focus:ring-4 focus:outline-none"
          >
            {/* Search icon SVG */}
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            {/* Screen reader text for the search button */}
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}