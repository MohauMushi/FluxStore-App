import StarRating from "./StarRating";

export default function ReviewList({ reviews }) {

  return (
    <div className="mt-8 bg-gray-50 rounded-md">
      <div className="m-6">
        <h2 className="text-[1.2rem] font-bold mb-6 text-gray-700">Reviews</h2>
        <div className="flex flex-col lg:flex-row">
          
          <div className="">
            {reviews.map((review, index) => (
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
