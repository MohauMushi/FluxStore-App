"use client";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReviewForm({
  productId,
  onReviewSubmit,
  initialReview = null,
}) {
  const [comment, setComment] = useState(
    initialReview ? initialReview.comment : ""
  );
  const [rating, setRating] = useState(
    initialReview ? initialReview.rating : 0
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const token = await user.getIdToken(true);
      const url = `/api/products/${productId}/reviews`;
      const method = initialReview ? "PUT" : "POST";

      const reviewData = {
        rating: Number(rating),
        comment: comment.trim(),
        ...(initialReview && { reviewId: initialReview.id }),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Failed to ${initialReview ? "update" : "submit"} review`
        );
      }

      onReviewSubmit(data.review);

      if (!initialReview) {
        setRating(0);
        setComment("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(
        error.message ||
          `Failed to ${initialReview ? "update" : "submit"} review. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">
        {initialReview ? "Edit Your Review" : "Write a Review"}
      </h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    value <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
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
    </div>
  );
}
