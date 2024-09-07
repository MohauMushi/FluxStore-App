import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={200}
          className="w-full h-48 object-contain mb-4 rounded"
        />
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">{product.category}</p>
        <p className="text-xl font-bold">${product.price}</p>
      </div>
    </Link>
  );
}
