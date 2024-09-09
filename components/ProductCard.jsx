import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <>
      <div className="flex flex-col h-full bg-white border border-slate-200 shadow-lg shadow-slate-950/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-102 hover:shadow-xl">
        <Link href={`/product/${product.id}`} className="block">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={200}
              // priority={true}
              className="w-full mt-5 h-48 object-contain"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-00 mb-2 line-clamp-2">
                {product.title}
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 space-y-2 sm:space-y-0">
                <p className="px-2 py-1 bg-indigo-100 text-[#415a77] rounded-md text-xs font-medium">
                  {product.category}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
