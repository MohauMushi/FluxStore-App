"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      {/* Back to products link */}
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          router.back();
        }}
        className="
          inline-block px-4 py-2 mb-4
          text-sm font-medium text-white
          bg-teal-500 rounded-md shadow-md
          transition duration-300 ease-in-out
          hover:bg-teal-600 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
          active:bg-teal-700 active:shadow-inner
          transform hover:-translate-y-0.5 active:translate-y-0
          "
      >
        <span className="inline-block mr-2 transition-transform duration-300 group-hover:-translate-x-1">
          &larr;
        </span>
        Back to products
      </Link>
    </>
  );
}
