import api from "../utils/axios";

const wishlistService = {
  /**
   * Get current user's wishlist.
   * GET /api/wishlist
   */
  getWishlist: async () => {
    const response = await api.get("/wishlist");
    return response.data;
  },

  /**
   * Add a product to wishlist.
   * POST /api/wishlist/add
   * body: { productId }
   */
  addToWishlist: async (payload) => {
    const response = await api.post("/wishlist/add", payload);
    return response.data;
  },
};

export default wishlistService;

