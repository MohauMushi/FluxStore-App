"use client";
import { useState } from "react";
import StarRating from "./StarRating";
import { useAuth } from "@/app/context/AuthContext";
import ReviewForm from "./ReviewForm";
import { Star, Edit, Trash2 } from "lucide-react";
import AlertModal from "./AlertModal";

export default function ReviewList({ productId, reviews, onReviewChange }) {
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [editingReview, setEditingReview] = useState(null);
  const { user } = useAuth();
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });

  // Calculate average rating and rating counts
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
  const roundedAverage = Math.round(averageRating * 10) / 10;
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date);
    } else if (sortBy === "rating") {
      return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
    }
    return 0;
  });

  const handleEditReview = (review) => {
    setEditingReview(review);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!user) {
      setAlertModal({
        isOpen: true,
        message: "You must be logged in to delete a review.",
        type: "error",
      });
      return;
    }

    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const token = await user.getIdToken(true);
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reviewId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete review");
      }

      setAlertModal({
        isOpen: true,
        message: "Review deleted successfully!",
        type: "success",
      });
      onReviewChange();
    } catch (error) {
      console.error("Error deleting review:", error);
      setAlertModal({
        isOpen: true,
        message: error.message || "Failed to delete review. Please try again.",
        type: "error",
      });
    }
  };

  const handleReviewSubmit = () => {
    setAlertModal({
      isOpen: true,
      message: editingReview
        ? "Review updated successfully!"
        : "Review added successfully!",
      type: "success",
    });
    onReviewChange();
    setEditingReview(null);
  };

  return (
    <div className="space-y-6">
      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        message={alertModal.message}
        type={alertModal.type}
      />
      <h2 className="text-2xl font-bold">Reviews</h2>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-8">
        {/* Left column: Rating summary and Review Form */}
        <div className="lg:w-1/3">
          {/* Rating summary section */}
          <div className="mb-6">
            {/* Average rating display */}
            <div className="flex items-center mb-4">
              <span className="text-5xl md:text-6xl text-gray-600 font-bold mr-2">
                {roundedAverage}
              </span>
              <div className="flex flex-col justify-center">
                <StarRating rating={roundedAverage} />
                <p className="text-gray-600 text-sm md:text-base mt-1">
                  {reviews.length} Reviews
                </p>
              </div>
            </div>

            {/* Rating distribution bars */}
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={`star-bar-${rating}`}
                className="flex items-center mb-2"
              >
                <span className="flex justify-center items-center w-8 text-gray-600">
                  {rating}
                  <Star className="w-4 h-4 ml-1 text-yellow-400 fill-current" />
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${reviews.length ? ((ratingCounts[rating] || 0) / reviews.length) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-gray-600 w-8 text-right">
                  {ratingCounts[rating] || 0}
                </span>
              </div>
            ))}
          </div>

          {/* Review Form - only show if user is logged in */}
          <div className="mb-6">
            {user ? (
              editingReview ? (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Edit Review</h3>
                  <ReviewForm
                    productId={productId}
                    initialReview={editingReview}
                    onReviewSubmit={handleReviewSubmit}
                  />
                  <button
                    onClick={() => setEditingReview(null)}
                    className="mt-4 text-gray-600 hover:text-gray-800"
                  >
                    Cancel Edit
                  </button>
                </div>
              ) : (
                <ReviewForm
                  productId={productId}
                  onReviewSubmit={handleReviewSubmit}
                />
              )
            ) : (
              <p className="text-gray-600">Please log in to write a review.</p>
            )}
          </div>
        </div>

        {/* Right column: Reviews list */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <label htmlFor="sortBy" className="mr-2 text-sm md:text-base">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split("-");
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                className="border rounded p-1 text-sm md:text-base"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="rating-desc">Highest Rating</option>
                <option value="rating-asc">Lowest Rating</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <StarRating rating={review.rating} />
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  {user && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="flex items-center text-blue-600 hover:text-blue-800 px-2 py-1 rounded text-sm md:text-base"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="flex items-center text-red-600 hover:text-red-800 px-2 py-1 rounded text-sm md:text-base"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2">{review.comment}</p>
                {/* Debug info - remove in production */}
                <p className="mt-2 text-xs text-gray-400">
                  Reviewer email: {review.reviewerEmail} | User email:{" "}
                  {user?.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
