import StarRating from "./StarRating";
import Gallery from "./Gallery";

/**
 * ProductDetails component displays detailed information about a product.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object containing details to be displayed.
 * @param {string} props.product.title - The title of the product.
 * @param {string} props.product.description - The description of the product.
 * @param {number} props.product.price - The price of the product.
 * @param {string} props.product.category - The category of the product.
 * @param {number} props.product.rating - The rating of the product.
 * @param {number} props.product.stock - The available stock of the product.
 * @param {string[]} props.product.tags - An array of tags associated with the product.
 * @param {string[]} props.product.images - An array of image URLs for the product.
 * @returns {JSX.Element} The rendered ProductDetails component.
 */
export default function ProductDetails({ product }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product details grid */}
      <div className="grid bg-gray-50 p-5 rounded-lg grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product image gallery */}
        <div>
          <Gallery images={[...product.images]} />
        </div>

        {/* Product information */}
        <div>
          {/* Product title */}
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          {/* Product description */}
          <p className="text-gray-600 mb-4">{product.description}</p>
          {/* Product price */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold mr-2">${product.price}</span>
            {/* <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.discountPercentage}% OFF
            </span> */}
          </div>
          {/* Product rating */}
          <div className="mb-4">
            <StarRating rating={product.rating} />
          </div>
          <p className="text-sm text-gray-600 mb-4">Brand: {product.brand}</p>
          {/* Product category */}
          <p className="text-gray-600 px-2 py-1 bg-indigo-100 rounded-md text-xs font-medium mb-4 inline-block">
            {product.category}
          </p>
          {/* Stock information */}
          <div className="flex items-center space-x-2 mb-2 text-sm font-medium">
            <span
              className={`px-2 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
            <span className="text-gray-600">
              Available: <span className="font-bold">{product.stock}</span>
            </span>
          </div>

          {/* Product tags */}
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
    </div>
  );
}
