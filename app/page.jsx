import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export const metadata = {
  title: "FluxStore - Home",
  description: "Browse our wide range of products at FluxStore",
};
/**
 * Home page component.
 * @returns {JSX.Element} The home page structure with a ProductGrid.
 */
export default function Home() {
  return (
    // Main content area with styling for minimum height, padding, and background
    <main className="min-h-screen px-4 bg-gray-100 text-gray-900 transition-colors duration-300">
      <div className="container mx-auto py-8">
        <SearchBar />
        <Suspense fallback={<LoadingSpinner />}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
