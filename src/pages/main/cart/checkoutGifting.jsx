import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GIFT_FOR_OPTIONS = ["Self", "Wife", "Mother", "Sister", "Friend", "Girlfriend", "Daughter"];

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
                className={`w-2 h-2 rounded-full ${isActive || isCompleted ? "bg-[#6b21a8]" : "bg-[#d1d5db]"
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

const PERSONALISED_NOTE_MAX = 250;

const CheckoutGifting = () => {
  const navigate = useNavigate();
  const [giftFor, setGiftFor] = useState("Self");
  const [personalisedNote, setPersonalisedNote] = useState("");

  const handleProceedToPayment = () => {
    navigate("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter-regular">
      <header className="w-full border-b border-[#f3e8ff] bg-[var(--primary-color-d)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 -m-1 rounded-full hover:bg-[#f3f4f6] touch-manipulation"
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
            <div className="flex-1 flex justify-center hidden md:flex min-w-0">
              <div className="max-w-md w-full">
                <Stepper active={1} />
              </div>
            </div>
            <div className="w-8 md:w-0" aria-hidden />
          </div>
          <div className="md:hidden mt-3">
            <div className="max-w-md w-full">
              <Stepper active={1} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="max-w-[800px] mx-auto px-4 md:px-8 py-6 md:py-8 pb-8 md:pb-10 space-y-6 md:space-y-8">
          {/* Gift wrap */}
          <section className="space-y-4">
            <h2 className="text-center text-base md:text-lg font-inter-semibold text-[#4b0f52]">
              Choose Gift Wrap <span className="text-[#ec4899] text-xs">(Free)</span>
            </h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-3">
              {[{
                label: "Warm hugs",
                img: "https://d2jx8mn46q1h32.cloudfront.net/uploads/image_attachment/image/17465/Giftwrap-3x1.png"
              }, {
                label: "Purple sun",
                img: "https://d2jx8mn46q1h32.cloudfront.net/uploads/image_attachment/image/17466/Giftwrap-3x3.png"
              }, {
                label: "Fairy Tales",
                img: "	https://d2jx8mn46q1h32.cloudfront.net/uploads/image_attachment/image/17467/Giftwrap-3x2.png"
              }].map(({ label, img }, idx) => (
                <button
                  key={label}
                  type="button"
                  className={`rounded-2xl overflow-hidden border ${idx === 0 ? "border-[#a855f7] ring-1 ring-[#a855f7]" : "border-[#e5e7eb]"
                    } bg-[#fdf2ff] flex flex-col touch-manipulation active:opacity-90`}
                >
                  <div style={{
                    display: "block",
                    border: "1px solid rgb(246, 243, 249)",
                    width: "100%",
                    height: "138px",
                    position: "relative",
                    left: "0px",
                    bottom: "0px",
                    backgroundImage: `url(${img})`,
                    borderRadius: "12px 12px 0 0",
                    backgroundSize: "100%",
                  }} />
                  <div className="px-3 py-3 sm:py-2 text-xs font-inter-semibold text-[#4b0f52] text-center">
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
                maxLength={PERSONALISED_NOTE_MAX}
                value={personalisedNote}
                onChange={(e) => setPersonalisedNote(e.target.value.slice(0, PERSONALISED_NOTE_MAX))}
                className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 pb-6 text-sm sm:text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7] min-h-[100px]"
              />
              <span
                className={`absolute right-4 bottom-2 text-[10px] font-medium ${
                  personalisedNote.length >= PERSONALISED_NOTE_MAX ? "text-red-500" : "text-[#f97316]"
                }`}
              >
                {personalisedNote.length}/{PERSONALISED_NOTE_MAX}
              </span>
            </div>
          </section>

          {/* Who is the gift for */}
          <section className="space-y-4">
            <h3 className="text-center text-sm font-inter-semibold text-[#4b0f52]">
              Who is the gift for?
            </h3>
            <div className="flex flex-wrap items-center justify-start gap-2 rounded-2xl bg-[#f5f3ff] p-2">
              {GIFT_FOR_OPTIONS.map((label) => {
                const isSelected = giftFor === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setGiftFor(label)}
                    className={`min-h-[36px] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-inter-semibold whitespace-nowrap touch-manipulation transition-colors ${
                      isSelected
                        ? "bg-white text-[#4b0f52] shadow-sm border border-[#a855f7]"
                        : "bg-transparent text-[#6b7280] hover:bg-white/50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2 min-w-0">
              <div className="flex items-center justify-center px-3 h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] text-xs text-[#4b5563] flex-shrink-0">
                IN +91
              </div>
              <input
                type="text"
                placeholder="Recipient's Mobile*"
                className="w-full min-w-0 h-11 rounded-xl border border-[#f3e8ff] bg-[#faf5ff] px-4 text-sm sm:text-xs text-[#4b5563] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
              />
            </div>
          </section>

          <div className="pt-2 pb-2">
            <button
              type="button"
              onClick={handleProceedToPayment}
              className="w-full h-12 sm:h-11 rounded-full text-sm font-inter-semibold text-white shadow-md touch-manipulation active:opacity-95"
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

