import React from "react";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";
import { Suspense } from "react";
import { Compass } from "lucide-react";

const NotFoundContent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-[1.65rem] bg-gradient-to-b from-teal-50 to-white text-teal-800">
      <div className="relative">
        <h1 className="text-[200px] font-extrabold text-teal-100 select-none">
          404
        </h1>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <Compass
            size={80}
            className="text-teal-500 mx-auto mb-4 animate-spin-slow"
          />
          <p className="text-3xl font-semibold mb-2">Page Not Found</p>
          <p className="text-lg text-teal-600">We have lost our bearings</p>
        </div>
      </div>
      <p className="mt-8 text-xl text-center max-w-md text-teal-700">
        The page you are looking for seems to have drifted away.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
      >
        Navigate Home
      </Link>
    </div>
  );
};

export default function NotFound() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <NotFoundContent />
    </Suspense>
  );
}
