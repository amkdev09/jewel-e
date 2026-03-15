import api from "../utils/axios";

const MIN_AMOUNT_INR = 1;
const MAX_AMOUNT_INR = 99_99_99_999;

/**
 * Sanitize amount: ensure number, in rupees. Backend may expect rupees (API example uses 66465).
 */
function sanitizeAmount(amount) {
  const n = Number(amount);
  if (Number.isNaN(n) || n < MIN_AMOUNT_INR || n > MAX_AMOUNT_INR) {
    return null;
  }
  return Math.round(n * 100) / 100;
}

/**
 * Create Razorpay order for a given backend order.
 * POST /api/payment/create-order
 * @param {{ orderId: string, amount: number, currency?: string }}
 * @returns {Promise<{ success: boolean, data?: { razorpayOrder: object, keyId: string }, message?: string }>}
 */
async function createPaymentOrder({ orderId, amount, currency = "INR" }) {
  const id = typeof orderId === "string" ? orderId.trim() : "";
  if (!id) {
    throw new Error("Invalid order ID");
  }
  const amountRupees = sanitizeAmount(amount);
  if (amountRupees == null) {
    throw new Error("Invalid amount");
  }
  const response = await api.post("/payment/create-order", {
    orderId: id,
    amount: amountRupees,
    currency: currency.toUpperCase(),
  });
  const data = response?.data;
  if (!data || typeof data.success !== "boolean") {
    throw new Error("Invalid response from server");
  }
  if (!data.success) {
    throw new Error(data.message || "Failed to create payment order");
  }
  if (!data.data?.razorpayOrder?.id || !data.data?.keyId) {
    throw new Error("Invalid payment order data");
  }
  return data;
}

/**
 * Verify payment status with backend (success or failed/cancelled).
 * POST /api/payment/verify
 * @param {object} payload - { orderId, amount, razorpay_order_id, razorpay_payment_id, razorpay_signature, success }
 */
async function verifyPayment(payload) {
  if (!payload || typeof payload.success !== "boolean") {
    throw new Error("Invalid verify payload");
  }
  const response = await api.post("/payment/verify", payload);
  const data = response?.data;
  if (!data || typeof data.success !== "boolean") {
    throw new Error("Invalid response from server");
  }
  return data;
}

const paymentService = {
  createPaymentOrder,
  verifyPayment,
};

export default paymentService;
