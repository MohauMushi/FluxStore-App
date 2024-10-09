import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * @typedef {Object} Review
 * @property {string} id - The unique identifier of the review
 * @property {number} rating - The rating given in the review (1-5)
 * @property {string} comment - The text content of the review
 */

/**
 * ReviewForm component for submitting or editing product reviews
 * @param {Object} props - The component props
 * @param {string} props.productId - The ID of the product being reviewed
 * @param {function} props.onReviewSubmit - Callback function called after successful review submission
 * @param {Review|null} [props.initialReview=null] - Initial review data for editing (null for new reviews)
 * @returns {JSX.Element} The ReviewForm component
 */
export default function ReviewForm({
  productId,
  onReviewSubmit,
  initialReview = null,
}) {
  const [rating, setRating] = useState(
    initialReview ? initialReview.rating : 0
  );
  const [comment, setComment] = useState(
    initialReview ? initialReview.comment : ""
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  /**
   * Handles the review submission process
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const token = await user.getIdToken(true);
      const url = `/api/products/${productId}/reviews`;
      const method = initialReview ? "PUT" : "POST";
      const body = JSON.stringify({
        rating,
        comment,
        reviewerName: user.displayName || "Anonymous",
        ...(initialReview && { reviewId: initialReview.id }),
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      onReviewSubmit(data.review);

      if (!initialReview) {
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.message.includes("network-request-failed")) {
        setError(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        setError(error.message || "Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Redirects the user to the login page
   */
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-teal-700 mb-6">
          {initialReview ? "Edit Your Review" : "Write a Review"}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Comment textarea */}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              placeholder="Share your thoughts about this product..."
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-teal-300 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Submitting..."
              : initialReview
                ? "Update Review"
                : "Submit Review"}
          </button>
        </form>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-2">Login Required</h3>
            <p className="text-gray-600 mb-4">
              You need to be logged in to submit a review. Would you like to log
              in now?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
