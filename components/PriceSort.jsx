"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * A React component that renders a price sort dropdown.
 * @param {Object} props - The component props.
 * @param {boolean} props.isReset - Determines whether the sort order should be reset to default.
 * @returns {JSX.Element} - The price sort dropdown component.
 */
export default function PriceSort({ isReset }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "default"
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  /**
   * Resets the sort order to default when the `isReset` prop changes.
   */
  useEffect(() => {
    if (isReset) {
      setSortOrder("default");
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
   * Handles the change in sort order and updates the URL search parameters.
   * @param {string} order - The new sort order.
   */
  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsOpen(false);
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

  /**
   * Retrieves the label for the selected sort order.
   * @param {string} order - The sort order.
   * @returns {string} - The label for the selected sort order.
   */
  const getSortLabel = (order) => {
    switch (order) {
      case "asc":
        return "Price: Low to High";
      case "desc":
        return "Price: High to Low";
      default:
        return "Default";
    }
  };

  return (
    <div className="w-full md:w-auto mb-4 md:mb-0 relative">
      <label
        htmlFor="price-sort"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Sort by Price:
      </label>
      <button
        ref={buttonRef}
        id="priceSortButton"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto text-black bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
        type="button"
      >
        <span>{getSortLabel(sortOrder)}</span>
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
          className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-full md:w-56"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <a
                href="#"
                onClick={() => handleSortChange("default")}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Default
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleSortChange("asc")}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Price: Low to High
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleSortChange("desc")}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Price: High to Low
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
