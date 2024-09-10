import { getProduct } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import ReviewList from "../../../components/Reviews";
import Gallery from "../../../components/Gallery";

export default async function ProductPage({ params }) {
  try {
    const product = await getProduct(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
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
        <div className="grid bg-gray-50 p-5 rounded-lg grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* <Image
              src={product.thumbnail}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-96 object-contain rounded-lg"
            /> */}
            <Gallery images={[product.thumbnail, ...product.images]} />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">${product.price}</p>
            <p className="mb-2">Category: {product.category}</p>
            <p className="mb-2">Rating: {product.rating}/5</p>
            <p className="mb-4">Stock: {product.stock}</p>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Tags:</h2>
              <div className="flex flex-wrap">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ReviewList reviews={product.reviews || []} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500">
        Failed to load product. Please try again later.
      </div>
    );
  }
}
