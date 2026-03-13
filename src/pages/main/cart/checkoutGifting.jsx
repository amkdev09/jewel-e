import React from "react";
import { useNavigate } from "react-router-dom";

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

const CheckoutGifting = () => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate("/checkout/payment");
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
                Gifting
              </h1>
            </div>
          </div>
          <Stepper active={1} />
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 py-8 space-y-8">
          {/* Gift wrap */}
          <section className="space-y-4">
            <h2 className="text-center text-base md:text-lg font-inter-semibold text-[#4b0f52]">
              Choose Gift Wrap <span className="text-[#ec4899] text-xs">(Free)</span>
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {["Warm hugs", "Purple sun", "Fairy Tales"].map((label, idx) => (
                <button
                  key={label}
                  type="button"
                  className={`rounded-2xl overflow-hidden border ${
                    idx === 0 ? "border-[#a855f7]" : "border-transparent"
                  } bg-[#fdf2ff] flex flex-col`}
                >
                  <div className="h-32 bg-[#fecaf5]" />
                  <div className="px-3 py-2 text-xs font-inter-semibold text-[#4b0f52] text-center">
                    {label}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Personalised note */}
          <section className="space-y-3">
            <h3 className="text-center text-sm font-inter-semibold text-[#4b0f52]">
              Add Personalised Note <span className="text-[#9ca3af] text-xs">(Optional)</span>
            </h3>
            <div className="relative">
              <textarea
                rows={4}
                placeholder="Type something here..."
                className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
              />
              <span className="absolute right-4 bottom-2 text-[10px] text-[#f97316]">
                250
              </span>
            </div>
          </section>

          {/* Who is the gift for */}
          <section className="space-y-4">
            <h3 className="text-center text-sm font-inter-semibold text-[#4b0f52]">
              Who is the gift for?
            </h3>
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 overflow-x-auto px-2 py-1 rounded-full bg-[#f5f3ff]">
                {["Self", "Wife", "Mother", "Sister", "Friend", "Girlfriend", "Daughter"].map(
                  (label, idx) => (
                    <button
                      key={label}
                      type="button"
                      className={`px-4 py-2 rounded-full text-[11px] font-inter-semibold ${
                        idx === 0
                          ? "bg-white text-[#4b0f52] shadow-sm"
                          : "bg-transparent text-[#6b7280]"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2">
              <div className="flex items-center justify-center px-3 h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] text-xs text-[#4b5563]">
                IN +91
              </div>
              <input
                type="text"
                placeholder="Recipient's Mobile*"
                className="w-full h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
              />
            </div>
          </section>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleProceedToPayment}
              className="w-full h-11 rounded-full text-sm font-inter-semibold text-white shadow-md"
              style={{
                background:
                  "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)",
              }}
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutGifting;

