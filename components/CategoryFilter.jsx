"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "../lib/api";

/**
 * A React component that renders a category filter dropdown.
 * @param {Object} props - The component props.
 * @param {boolean} props.isReset - Determines whether the selected category should be reset.
 * @returns {JSX.Element} - The category filter dropdown component.
 */
export default function CategoryFilter({ isReset }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  /**
   * Fetches the available categories from the API.
   */
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  /**
   * Resets the selected category to an empty string when the `isReset` prop changes.
   */
  useEffect(() => {
    if (isReset) {
      setSelectedCategory("");
    }
  }, [isReset]);

  /**
   * Closes the dropdown when the user clicks outside of it.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Handles the change in selected category and updates the URL search parameters.
   * @param {string} category - The new selected category.
   */
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
    <div className="w-full md:w-auto mb-4 md:mb-0 relative">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Filter by Category:
      </label>
      <button
        ref={buttonRef}
        id="categoryFilterButton"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto text-black bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
        type="button"
      >
        <span>{selectedCategory || "All Categories"}</span>
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
        <div
          ref={dropdownRef}
          className="z-10 absolute left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-full md:w-56"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <a
                href="#"
                onClick={() => handleCategoryChange("")}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                All Categories
              </a>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  onClick={() => handleCategoryChange(category)}
                  className="block px-4 py-2 hover:bg-gray-100"
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
