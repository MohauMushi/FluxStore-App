import ProductGrid from "../components/ProductGrid";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import PriceSort from "../components/PriceSort";

export const metadata = {
  title: "FluxStore - Shop the Latest Products",
  description:
    "Discover a wide range of products at FluxStore. From electronics to fashion, find everything you need at great prices.",
};
/**
 * Home page component.
 * @returns {JSX.Element} The home page structure with a ProductGrid.
 */
export default function Home() {
  return (
    // Main content area with styling for minimum height, padding, and background
    <main className="min-h-screen px-4 bg-gray-100 text-gray-900 transition-colors duration-300">
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <CategoryFilter />
        </div>
        {/* <div className="w-full sm:w-auto max-w-md">
          <SearchBar />
        </div> */}
        <div className="w-full sm:w-auto">
          <PriceSort />
        </div>
      </div>
      <div className="container mx-auto py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
