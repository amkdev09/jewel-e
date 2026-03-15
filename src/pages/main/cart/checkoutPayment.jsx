import React, { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import paymentService from "../../../services/paymentService";
import { loadRazorpay } from "../../../utils/razorpayLoader";
import useSnackbar from "../../../hooks/useSnackbar";

const Stepper = ({ active }) => {
  const steps = ["Address", "Gifting", "Payment"];
  return (
    <div className="flex items-center gap-4 text-[11px] text-[#9ca3af] mt-2">
      {steps.map((label, index) => {
        const isActive = active === index;
        const isCompleted = index < active;
        return (
          <div key={label} className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="flex-1 h-[2px] rounded-full bg-gradient-to-r from-[#6b21a8] to-[#a855f7]"
              style={{ opacity: isActive || isCompleted ? 1 : 0.3 }}
            />
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive || isCompleted ? "bg-[#6b21a8]" : "bg-[#d1d5db]"
                }`}
              />
              <span className={isActive ? "text-[#4b0f52] font-inter-semibold" : ""}>
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function getOrderFromStorage() {
  try {
    const raw = localStorage.getItem("activeOrder");
    if (!raw) return null;
    const order = JSON.parse(raw);
    if (!order || typeof order !== "object") return null;
    const id = order._id;
    if (!id || typeof id !== "string" || id.trim() === "") return null;
    const amount = order.finalAmount ?? order.totalAmount ?? order.amount;
    const num = Number(amount);
    if (Number.isNaN(num) || num < 1) return null;
    return { orderId: id.trim(), amount: num, order };
  } catch {
    return null;
  }
}

function getErrorMessage(err, fallback = "Something went wrong. Please try again.") {
  const msg =
    err?.response?.data?.message ??
    err?.response?.data?.error ??
    err?.message;
  return typeof msg === "string" && msg.trim() ? msg.trim() : fallback;
}

const APP_NAME = "Jewel-E";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const isProcessingRef = useRef(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const clearActiveOrder = useCallback(() => {
    try {
      localStorage.removeItem("activeOrder");
    } catch {
      // ignore
    }
  }, []);

  const handlePayNow = useCallback(async () => {
    if (isProcessingRef.current) return;

    const parsed = getOrderFromStorage();
    if (!parsed) {
      showSnackbar("No valid order found. Please complete address step again.", "error");
      navigate("/cart/shopping-cart", { replace: true });
      return;
    }

    const { orderId, amount } = parsed;
    isProcessingRef.current = true;
    setIsProcessing(true);

    try {
      const createRes = await paymentService.createPaymentOrder({
        orderId,
        amount,
        currency: "INR",
      });

      const { razorpayOrder, keyId } = createRes.data;
      if (!razorpayOrder?.id || !keyId) {
        throw new Error("Invalid payment setup from server");
      }

      const Razorpay = await loadRazorpay();

      const rzp = new Razorpay({
        key: keyId,
        order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",
        name: APP_NAME,
        description: `Order ${orderId}`,
        handler: async (response) => {
          if (!response?.razorpay_payment_id || !response?.razorpay_order_id || !response?.razorpay_signature) {
            showSnackbar("Invalid payment response. Please contact support if amount was deducted.", "error");
            isProcessingRef.current = false;
            setIsProcessing(false);
            return;
          }
          try {
            const verifyRes = await paymentService.verifyPayment({
              orderId,
              amount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              success: true,
            });
            if (verifyRes?.success) {
              clearActiveOrder();
              showSnackbar("Payment successful. Thank you for your order!", "success");
              navigate("/cart/shopping-cart", { replace: true, state: { paymentSuccess: true } });
            } else {
              showSnackbar(
                getErrorMessage(null, "Payment verification failed. Support will assist if amount was deducted."),
                "error"
              );
            }
          } catch (verifyErr) {
            showSnackbar(
              getErrorMessage(verifyErr, "Could not verify payment. Please contact support if amount was deducted."),
              "error"
            );
          } finally {
            isProcessingRef.current = false;
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: async () => {
            try {
              await paymentService.verifyPayment({
                orderId,
                amount,
                razorpay_order_id: razorpayOrder.id,
                razorpay_payment_id: null,
                razorpay_signature: null,
                success: false,
              });
            } catch {
              // best-effort; don't block UI
            }
            showSnackbar("Payment was cancelled. You can try again when ready.", "info");
            isProcessingRef.current = false;
            setIsProcessing(false);
          },
        },
      });

      rzp.on("payment.failed", () => {
        showSnackbar("Payment failed. Please try again or use another method.", "error");
        isProcessingRef.current = false;
        setIsProcessing(false);
      });

      rzp.open();
    } catch (err) {
      isProcessingRef.current = false;
      setIsProcessing(false);
      const message = getErrorMessage(err, "Failed to start payment. Please try again.");
      showSnackbar(message, "error");
    }
  }, [navigate, showSnackbar, clearActiveOrder]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter-regular">
      <header className="w-full border-b border-[#f3e8ff] bg-[var(--primary-color-d)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-1 rounded-full hover:bg-[#f3f4f6]"
                aria-label="Back"
                onClick={() => navigate(-1)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-base md:text-lg font-inter-semibold text-[var(--primary-color-a)]">
                Payment
              </h1>
            </div>
          </div>
          <Stepper active={2} />
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[900px] mx-auto px-4 md:px-8 py-8 space-y-8">
          <section className="space-y-4">
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#f5f3ff] px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-inter-semibold text-[#4b0f52]">
                  Have a gift card?
                </p>
                <p className="text-[11px] text-[#6b7280]">
                  Avail additional discounts with gift cards
                </p>
              </div>
              <button
                type="button"
                className="text-xs font-inter-semibold text-[var(--color-pink)]"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-inter-semibold text-[#6b7280]">
                Payment Options
              </p>
              <button
                type="button"
                className="w-full flex items-center justify-between rounded-2xl border border-[#a855f7] bg-[#f5f3ff] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#a855f7]">
                    ▢
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-inter-semibold text-[#4b0f52]">
                      Pay Online
                    </p>
                    <p className="text-[11px] text-[#6b7280]">
                      Credit, Debit, Net Banking, UPI &amp; More
                    </p>
                  </div>
                </div>
                <span className="w-4 h-4 rounded-full border-2 border-[#a855f7] bg-[#a855f7]" />
              </button>
            </div>
          </section>

          <div className="pt-2">
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isProcessing}
              id="checkout-pay-now-btn"
              aria-busy={isProcessing}
              className="w-full h-11 rounded-full text-sm font-inter-semibold text-white shadow-md disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
              style={{
                background:
                  "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)",
              }}
            >
              {isProcessing ? "Opening…" : "PAY NOW"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPayment;
