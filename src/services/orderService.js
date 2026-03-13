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
};

export default orderService;

