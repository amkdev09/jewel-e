import api from "../utils/axios";

const paymentService = {
  /**
   * Create Razorpay order for a given backend order.
   * POST /api/payment/create-order
   */
  createPaymentOrder: async ({ orderId, amount, currency = "INR" }) => {
    const response = await api.post("/payment/create-order", {
      orderId,
      amount,
      currency,
    });
    return response.data;
  },

  /**
   * Verify payment status with backend.
   * POST /api/payment/verify
   */
  verifyPayment: async (payload) => {
    const response = await api.post("/payment/verify", payload);
    return response.data;
  },
};

export default paymentService;

