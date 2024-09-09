import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8 bg-gray-100 text-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductGrid />
    </main>
  );
}
