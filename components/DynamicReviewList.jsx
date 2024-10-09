"use client";

import { useState, useEffect } from "react";
import ReviewList from "./Reviews";

/**
 * @typedef {Object} Review
 * @property {string} id - The unique identifier of the review
 * @property {number} rating - The rating given in the review (1-5)
 * @property {string} comment - The text content of the review
 * @property {string} reviewerName - The name of the reviewer
 * @property {string} reviewerEmail - The email of the reviewer
 * @property {string} date - The date the review was submitted
 */

/**
 * DynamicReviewList component for managing and displaying reviews with dynamic updates
 * @param {Object} props - The component props
 * @param {Review[]} props.initialReviews - The initial array of review objects
 * @param {string} props.productId - The ID of the product
 * @returns {JSX.Element} The DynamicReviewList component
 */
export default function DynamicReviewList({ initialReviews, productId }) {
  const [reviews, setReviews] = useState(initialReviews);

  /**
   * Fetches the latest reviews for the product
   */
  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`);
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  /**
   * Handles changes in reviews by fetching the latest data
   */
  const handleReviewChange = () => {
    fetchReviews();
  };

  return (
    <ReviewList
      productId={productId}
      reviews={reviews}
      onReviewChange={handleReviewChange}
    />
  );
}
