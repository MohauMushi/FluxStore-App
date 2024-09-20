"use client";

import { useState } from "react";
import StarRating from "./StarRating";

/**
 * ReviewList Component
 * Renders a list of reviews along with average rating and rating distribution.
 *
 * @param {Object} props - The component props
 * @param {Array} props.reviews - An array of review objects
 * @returns {JSX.Element} The rendered ReviewList component
 */
export default function ReviewList({ reviews }) {
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

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

  // Calculating the average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const roundedAverage = Math.round(averageRating * 10) / 10;

  // Counting the number of reviews for each rating
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const handleSortChange = (e) => {
    const [newSortBy, newSortOrder] = e.target.value.split("-");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="mt-8 bg-gray-50 p-3 rounded-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[1.2rem] font-bold text-gray-700">Reviews</h2>
          <div>
            <label className="mr-2">Sort by:</label>
            <select
              onChange={handleSortChange}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="date-desc">Newest Date</option>
              <option value="date-asc">Oldest Date</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="rating-asc">Lowest Rated</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          {/* Rating summary section */}
          <div className="mb-6 lg:mb-0 lg:w-1/3 lg:pr-5">
            {/* Average rating display */}
            <div className="flex items-center mb-1">
              <span className="text-[3rem] text-gray-600 font-bold mr-2">
                {roundedAverage}
              </span>
              <div className="p-1">
                <StarRating rating={roundedAverage} />
                <p className="text-gray-600 ml-[3.3rem] -mt-2 text-[1rem]">
                  {reviews.length} Reviews
                </p>
              </div>
            </div>

            {/* Rating distribution bars */}
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center mb-2">
                <span className="flex justify-center items-center w-8 text-gray-600">
                  {rating}{" "}
                  <svg
                    className="w-4 h-4 ml-1 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{
                      width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-gray-600 w-8 text-right">
                  {ratingCounts[rating] || 0}
                </span>
              </div>
            ))}
          </div>
          {/* Individual reviews section */}
          <div className="lg:w-2/3 lg:pl-6 lg:border-l md:ml-5  border-gray-200">
            {sortedReviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 mb-6 last:border-b-0"
              >
                <div className="flex items-center space-x-2">
                  <StarRating rating={review.rating} />
                </div>
                <div className="flex flex-wrap mb-3">
                  <p className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </p>
                  <p className="mx-2"> - </p>
                  <p className="text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="mb-3 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
