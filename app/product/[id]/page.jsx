import { Suspense } from "react";
import { getProduct } from "../../../lib/api";
import ProductDetails from "../../../components/ProductDetails";
import ReviewList from "../../../components/Reviews";
import Loading from "../[id]/loading";
import BackButton from "../../../components/BackButton";
import DynamicReviewList from "@/components/DynamicReviewList";

/**
 * Generating metadata for the product page.
 * @async
 * @function generateMetadata
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the product.
 * @returns {Promise<Object>} The metadata object for the product.
 */
export async function generateMetadata({ params }) {
  try {
    const product = await getProduct(params.id);
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.images[0],
            width: 800,
            height: 600,
            alt: product.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
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
  try {
    const product = await getProduct(params.id);

    if (!product) {
      throw new Error("Product not found");
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <Suspense fallback={<Loading />}>
          <ProductDetails {...product} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <DynamicReviewList
            initialReviews={product.reviews || []}
            productId={params.id}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error rendering product page:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>
          Sorry, there was an error loading the product. Please try again later.
        </p>
      </div>
    );
  }
}
