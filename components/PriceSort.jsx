"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriceSort({ isReset }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || "default"
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isReset) {
      setSortOrder("default");
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
    <div className="w-full md:w-auto mb-4 md:mb-0 relative" ref={dropdownRef}>
      <label
        htmlFor="price-sort"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Sort by Price:
      </label>
      <button
        id="priceSortButton"
        onClick={() => setIsOpen(!isOpen)}
        className="text-black bg-gray-100 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {getSortLabel(sortOrder)}{" "}
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
        <div className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                onClick={() => handleSortChange("asc")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Price: Low to High
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleSortChange("desc")}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
