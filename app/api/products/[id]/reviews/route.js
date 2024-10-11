import { verifyAuth } from "@/lib/auth";
import { db } from "@/lib/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { NextResponse } from "next/server";

/**
 * Fetch reviews for a product
 * @param {Request} request - The incoming request object
 * @param {Object} params - The route parameters
 * @param {string} params.id - The product ID
 * @returns {Promise<NextResponse>} The response containing the reviews or an error
 */
export async function GET(request, { params }) {
  const { id } = params;
  const paddedId = id.toString().padStart(3, "0");

  try {
    const docRef = doc(db, "products", paddedId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(docSnap.data(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Add a new review for a product
 * @param {Request} request - The incoming request object
 * @param {Object} params - The route parameters
 * @param {string} params.id - The product ID
 * @returns {Promise<NextResponse>} The response containing the new review or an error
 */
export async function POST(request, { params }) {
  try {
    const userId = await verifyAuth(request);

    const { id } = params;
    const paddedId = id.toString().padStart(3, "0");
    const { rating, comment, reviewerName } = await request.json();

    if (!rating || !comment) {
      return NextResponse.json(
        { error: "Rating and comment are required" },
        { status: 400 }
      );
    }

    const productRef = doc(db, "products", paddedId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const currentDate = new Date();
    const reviewData = {
      id: `${userId}-${Date.now()}`,
      rating: Number(rating),
      comment: String(comment),
      reviewerEmail: String(userId),
      reviewerName: String(reviewerName || "Anonymous"),
      date: currentDate.toISOString(), // Store as ISO string
    };

    await updateDoc(productRef, {
      reviews: arrayUnion(reviewData),
    });

    // Update average rating
    const updatedProductSnap = await getDoc(productRef);
    const updatedProductData = updatedProductSnap.data();
    const allReviews = updatedProductData.reviews || [];

    const averageRating =
      allReviews.reduce((sum, review) => sum + review.rating, 0) /
      allReviews.length;

    await updateDoc(productRef, {
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: allReviews.length,
    });

    return NextResponse.json(
      {
        message: "Review added successfully",
        review: reviewData, // Send back the same review data
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Edit an existing review for a product
 * @param {Request} request - The incoming request object
 * @param {Object} params - The route parameters
 * @param {string} params.id - The product ID
 * @returns {Promise<NextResponse>} The response containing the updated review or an error
 */
export async function PUT(request, { params }) {
  try {
    const userId = await verifyAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { id } = params;
    const { reviewId, rating, comment } = await request.json();

    const paddedId = id.toString().padStart(3, "0");
    const productRef = doc(db, "products", paddedId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productData = productSnapshot.data();
    const reviewToUpdate = productData.reviews.find(
      (review) => review.id === reviewId
    );

    if (!reviewToUpdate) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Compare using email instead of userId
    if (reviewToUpdate.reviewerEmail !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to edit this review" },
        { status: 403 }
      );
    }

    const updatedReview = {
      ...reviewToUpdate,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    // Remove old review and add updated one
    await updateDoc(productRef, {
      reviews: arrayRemove(reviewToUpdate),
    });
    await updateDoc(productRef, {
      reviews: arrayUnion(updatedReview),
    });

    // Update average rating
    const updatedProductSnap = await getDoc(productRef);
    const updatedProductData = updatedProductSnap.data();
    const allReviews = updatedProductData.reviews || [];

    const averageRating =
      allReviews.reduce((sum, review) => sum + review.rating, 0) /
      allReviews.length;

    await updateDoc(productRef, {
      averageRating: Number(averageRating.toFixed(1)),
    });

    return NextResponse.json(
      { message: "Review updated successfully", review: updatedReview },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update review" },
      { status: 500 }
    );
  }
}

/**
 * Delete a review for a product
 * @param {Request} request - The incoming request object
 * @param {Object} params - The route parameters
 * @param {string} params.id - The product ID
 * @returns {Promise<NextResponse>} The response confirming the deletion or an error
 */
export async function DELETE(request, { params }) {
  try {
    const userId = await verifyAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { id } = params;
    const { reviewId } = await request.json();

    const paddedId = id.toString().padStart(3, "0");
    const productRef = doc(db, "products", paddedId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productData = productSnapshot.data();
    const reviewToDelete = productData.reviews.find(
      (review) => review.id === reviewId
    );

    if (!reviewToDelete) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Compare using email instead of userId
    if (reviewToDelete.reviewerEmail !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to delete this review" },
        { status: 403 }
      );
    }

    await updateDoc(productRef, {
      reviews: arrayRemove(reviewToDelete),
    });

    // Update average rating
    const updatedReviews = productData.reviews.filter(
      (review) => review.id !== reviewId
    );
    const averageRating =
      updatedReviews.length > 0
        ? updatedReviews.reduce((sum, review) => sum + review.rating, 0) /
          updatedReviews.length
        : 0;

    await updateDoc(productRef, {
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: updatedReviews.length,
    });

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete review" },
      { status: 500 }
    );
  }
}
