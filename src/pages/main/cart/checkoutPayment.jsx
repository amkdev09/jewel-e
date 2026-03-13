import React from "react";
import { useNavigate } from "react-router-dom";
import paymentService from "../../../services/paymentService";
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

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handlePayNow = async () => {
    let order = null;
    try {
      const stored = localStorage.getItem("activeOrder");
      if (stored) {
        order = JSON.parse(stored);
      }
    } catch {
      // ignore parse issues
    }
    if (!order?._id) {
      showSnackbar("No active order found. Please go back to cart.", "error");
      navigate("/cart/shopping-cart");
      return;
    }

    try {
      const amount = order.finalAmount || order.totalAmount || 0;
      const res = await paymentService.createPaymentOrder({
        orderId: order._id,
        amount,
        currency: "INR",
      });
      if (!res?.success) {
        throw new Error(res?.message || "Failed to initiate payment");
      }
      // At this point you can integrate Razorpay widget using res.data.razorpayOrder & res.data.keyId
      showSnackbar("Payment order created. Integrate gateway here.", "success");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to start payment. Please try again.";
      showSnackbar(message, "error");
    }
  };

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
          {/* Preferred payment options */}
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
              className="w-full h-11 rounded-full text-sm font-inter-semibold text-white shadow-md"
              style={{
                background:
                  "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)",
              }}
            >
              PAY NOW
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPayment;

