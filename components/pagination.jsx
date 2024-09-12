import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-0.5 transition-transform duration-200 ease-in-out" />
        <span className="relative overflow-hidden">
          <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Previous
          </span>
          <span className="absolute top-full left-0 inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Previous
          </span>
        </span>
      </button>
      <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
        <span className="font-bold text-teal-600">{currentPage}</span>
        <span className="mx-2 text-gray-500">/</span>
        <span>{totalPages}</span>
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
        aria-label="Next page"
      >
        <span className="relative overflow-hidden">
          <span className="inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Next
          </span>
          <span className="absolute top-full left-0 inline-block transition-transform duration-200 ease-in-out group-hover:-translate-y-full">
            Next
          </span>
        </span>
        <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-0.5 transition-transform duration-200 ease-in-out" />
      </button>
    </div>
  );
}
