import api from "../utils/axios";

const orderService = {
  /**
   * Create order from current cart.
   * POST /api/order/create
   */
  createOrderFromCart: async ({ shippingAddress, couponCode }) => {
    const payload = { shippingAddress };
    if (couponCode) {
      payload.couponCode = couponCode;
    }
    const response = await api.post("/order/create", payload);
    return response.data;
  },

  /**
   * Get paginated list of user orders.
   * GET /api/order/my-orders?page=1&limit=20
   */
  getMyOrders: async (page = 1, limit = 20) => {
    const response = await api.get("/order/my-orders", {
      params: { page, limit },
    });
    return response.data;
  },
};

export default orderService;

