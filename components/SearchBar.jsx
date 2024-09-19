"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

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
    router.push(`/?${params.toString()}`);
  };

  return (
    <form className="w-full md:w-auto mb-4 md:mb-0">
      {/* Main container for the search bar */}
      <div className="relative">
        {/* Search input field */}
        <input
          id="search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="w-full px-3 py-2 pr-10 text-sm text-gray-800 bg-white border-0 rounded-full focus:ring-2 focus:ring-teal-300 focus:outline-none"
        />
        {/* Search button */}
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-teal-700 hover:text-teal-900"
        >
          {/* Search icon SVG */}
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          {/* Screen reader text for the search button */}
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}
