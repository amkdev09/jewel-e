import api from "../utils/axios";

/**
 * Get paginated reviews for a product (public).
 * GET /api/reviews/product/:productId?page=1&limit=20
 */
export async function getReviewsByProduct(productId, page = 1, limit = 20) {
  const response = await api.get(`/reviews/product/${productId}`, {
    params: { page, limit },
  });
  return response.data;
}

/**
 * Get current user's review for a product (requires auth).
 * GET /api/reviews/product/:productId/my-review
 */
export async function getMyReview(productId) {
  const response = await api.get(`/reviews/product/${productId}/my-review`);
  return response.data;
}

/**
 * Create a review (requires auth).
 * POST /api/reviews
 */
export async function createReview({ productId, rating, comment }) {
  const response = await api.post("/reviews", {
    productId,
    rating: Number(rating),
    comment: comment ? String(comment).trim() : "",
  });
  return response.data;
}

/**
 * Update a review (requires auth).
 * PUT /api/reviews/:id
 */
export async function updateReview(reviewId, { rating, comment }) {
  const response = await api.put(`/reviews/${reviewId}`, {
    rating: Number(rating),
    comment: comment ? String(comment).trim() : "",
  });
  return response.data;
}

/**
 * Delete a review (requires auth).
 * DELETE /api/reviews/:id
 */
export async function deleteReview(reviewId) {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
}
