import api from "../utils/axios";

const cartService = {
  /**
   * Get current user's cart.
   * GET /api/cart
   */
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  /**
   * Add an item to cart.
   * POST /api/cart/add
   * body: { productId, variantId, quantity, selectedOptions }
   */
  addToCart: async (payload) => {
    const body = { ...payload };

    // Backend expects variantId only when there is a concrete variant.
    if (body.variantId == null) {
      delete body.variantId;
    }

    // Clean up selectedOptions if it's empty or null.
    if (
      body.selectedOptions &&
      typeof body.selectedOptions === "object" &&
      Object.keys(body.selectedOptions).length === 0
    ) {
      delete body.selectedOptions;
    }

    const response = await api.post("/cart/add", body);
    return response.data;
  },

  /**
   * Remove an item from cart.
   * DELETE /api/cart/remove
   * body: { productId, variantId }
   */
  removeFromCart: async (payload) => {
    const response = await api.delete("/cart/remove", { data: payload });
    return response.data;
  },
};

export default cartService;

