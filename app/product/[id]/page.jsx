import { Suspense } from "react";
import { getProduct } from "../../../lib/api";
import ProductDetails from "../../../components/ProductDetails";
import ReviewList from "../../../components/Reviews";
import Loading from "../[id]/loading";
import BackButton from "../../../components/BackButton";

/**
 * Generating metadata for the product page.
 * @async
 * @function generateMetadata
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the product.
 * @returns {Promise<Object>} The metadata object for the product.
 */
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        { url: product.images[0], width: 800, height: 600, alt: product.title },
      ],
    },
  };
}

/**
 * Renders the product page.
 * @async
 * @function ProductPage
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the product.
 * @returns {Promise<JSX.Element>} The rendered product page.
 */
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) return <div>No product found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <Suspense fallback={<Loading />}>
        <ProductDetails product={product} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ReviewList reviews={product.reviews || []} />
      </Suspense>
    </div>
  );
}
