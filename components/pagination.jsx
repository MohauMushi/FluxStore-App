import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination Component
 *
 * This component renders a pagination control with previous and next buttons,
 * and displays the current page number out of the total pages.
 *
 * @param {Object} props - The component props
 * @param {number} props.currentPage - The current active page number
 * @param {number} props.totalPages - The total number of pages
 * @param {function} props.onPageChange - Callback function to handle page changes
 * @returns {JSX.Element} A div containing the pagination controls
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLastPage,
}) {
  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
        aria-label="Previous page"
      >
        {/* Left chevron icon */}
        <ChevronLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200 ease-in-out" />
        {/* Button text with hover animation */}
        <span className="relative overflow-hidden">
          <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Previous
          </span>
          <span className="absolute top-full left-0 inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Previous
          </span>
        </span>
      </button>

      {/* Current page indicator */}
      <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
        <span className="font-bold text-teal-600">{currentPage}</span>
        {/* <span className="mx-2 text-gray-500">/</span> */}
        {/* <span>{totalPages}</span> */}
      </div>

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
        aria-label="Next page"
      >
        {/* Button text with hover animation */}
        <span className="relative overflow-hidden">
          <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Next
          </span>
          <span className="absolute top-full left-0 inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Next
          </span>
        </span>
        {/* Right chevron icon */}
        <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-0.5 transition-transform duration-200 ease-in-out" />
      </button>
    </div>
  );
}
