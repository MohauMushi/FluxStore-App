"use client";

import { useAuth } from "./context/AuthContext";
import ProductGrid from "../components/ProductGrid";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

// export const metadata = {
//   title: "FluxStore - Online Shopping | SA's online store",
//   description:
//     "Discover a wide range of products at FluxStore. From electronics to fashion, find everything you need at great prices.",
// };

/**
 * Home content component that handles the main layout and authentication state.
 * @returns {JSX.Element} The home page content structure.
 */
function HomeContent() {
  const { user, logOut, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen p-4 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {user ? (
          <div className="mb-4 p-4 bg-white rounded shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <p className="text-lg text-gray-800">Welcome, {user.email}</p>
              <button
                onClick={logOut}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Content for non-authenticated users */}
          </div>
        )}

        <Suspense fallback={<LoadingSpinner />}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}

/**
 * Main Home page component.
 * @returns {JSX.Element} The complete home page structure.
 */
export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomeContent />
    </Suspense>
  );
}
