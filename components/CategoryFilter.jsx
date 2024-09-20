"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "../lib/api";

export default function CategoryFilter({ isReset }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (isReset) {
      setSelectedCategory("");
    }
  }, [isReset]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
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
    <div className="w-full md:w-auto mb-4 md:mb-0 relative" ref={dropdownRef}>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Filter by Category:
      </label>
      <button
        id="dropdownHoverButton"
        onClick={() => setIsOpen(!isOpen)}
        className="text-black bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedCategory || "All Categories"}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="z-10 absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {/* <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                All Categories
              </a>
            </li> */}
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  onClick={() => handleCategoryChange(category)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
