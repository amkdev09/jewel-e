import React, { useState } from "react";

/* ========== IMAGES ========== */
const HERO_BG =
  "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=1600&q=80";
const CONSULTANT_IMG =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80";
const JEWEL_BOX =
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80";
const PEOPLE_SMILE =
  "https://images.unsplash.com/photo-1606964212863-4d2e3c8932b5?w=400&q=80";
const TIPS_IMG =
  "https://images.unsplash.com/photo-1596944924297-2e5c2f5c1c8a?w=400&q=80";
const RING_IMG =
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80";
const EARRING_IMG =
  "https://images.unsplash.com/photo-1596944924297-2e5c2f5c1c8a?w=400&q=80";
const PENDANT_IMG =
  "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80";

const BTN_GRADIENT =
  "linear-gradient(90deg, #8863fb 0%, #e56eeb 50%, #fd8b9e 100%)";

/* ========== HERO ========== */
const HeroSection = () => (
  <section className="relative min-h-[420px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center scale-105"
      style={{ backgroundImage: `url(${HERO_BG})` }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 100%)",
      }}
    />
    <div className="absolute top-4 right-4 md:top-8 md:right-8 w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden border-2 border-white/30 shadow-xl bg-gray-800">
      <img
        src={PEOPLE_SMILE}
        alt="Live call"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
      <h1
        className="font-inter-semibold text-white mb-4"
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          lineHeight: 1.2,
        }}
      >
        Buy Jewellery Live on Video Call
      </h1>
      <p className="text-white/95 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
        With our Live video call, you get to have your personal jewellery
        consultant - your Jewellery Expert
      </p>
      <button
        type="button"
        className="font-inter-semibold text-white py-4 px-8 rounded-xl hover:opacity-95 transition-opacity"
        style={{
          background: BTN_GRADIENT,
          boxShadow: "0 4px 14px rgba(136, 99, 251, 0.4)",
        }}
      >
        Schedule a Live Call
      </button>
    </div>
  </section>
);

/* ========== HOW IT WORKS ========== */
const HOW_STEPS = [
  {
    step: 1,
    title: "Schedule a Live Video Call",
    desc: "Pick a date and time that suits you. We'll connect you with a jewellery expert over a secure video call.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Shop for Jewellery",
    desc: "Browse our curated collection during the call. Your consultant will show you designs that match your taste and budget.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    step: 3,
    title: "View Jewellery in Real-Time",
    desc: "See each piece up close on screen. Ask questions, compare options, and make a confident choice from home.",
    icon: (
      <svg
        className="w-10 h-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
];

const HowItWorksSection = () => (
  <section
    className="py-14 md:py-20 px-4 md:px-8"
    style={{ backgroundColor: "#f5f5f5" }}
  >
    <div className="max-w-[1280px] mx-auto">
      <h2
        className="font-inter-semibold text-[#1f2937] text-center mb-12 md:mb-16"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
      >
        How it works
      </h2>
      <div className="relative">
        <div className="hidden md:flex items-start justify-between gap-4">
          {HOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="flex-1 flex flex-col items-center text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-[var(--primary-color-a)] flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #ede9f5 0%, #e8dcf8 100%)",
                  boxShadow: "0 4px 14px rgba(79, 50, 103, 0.15)",
                }}
              >
                {item.icon}
              </div>
              <p className="text-[#6b7280] text-sm mb-1">Step {item.step}</p>
              <h3 className="font-inter-semibold text-[#1f2937] text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="md:hidden space-y-8">
          {HOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-[var(--primary-color-a)]"
                style={{
                  background: "linear-gradient(135deg, #ede9f5 0%, #e8dcf8 100%)",
                  boxShadow: "0 4px 14px rgba(79, 50, 103, 0.15)",
                }}
              >
                {item.icon}
              </div>
              <p className="text-[#6b7280] text-sm mb-1">Step {item.step}</p>
              <h3 className="font-inter-semibold text-[#1f2937] text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          type="button"
          className="font-inter-semibold text-white py-4 px-8 rounded-xl hover:opacity-95 transition-opacity"
          style={{
            background: BTN_GRADIENT,
            boxShadow: "0 4px 14px rgba(136, 99, 251, 0.35)",
          }}
        >
          Schedule a Live Call
        </button>
      </div>
    </div>
  </section>
);

/* ========== CONSULTANT FORM ========== */
const DATE_OPTIONS = ["Today", "Tomorrow", "Next Week"];
const TIME_SLOTS = ["9AM", "11AM", "1PM", "3PM", "5PM", "7PM"];

const ConsultantSection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <section
      className="py-14 md:py-20 px-4 md:px-8"
      style={{ backgroundColor: "#fafafa" }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-3">
            <h2
              className="font-inter-semibold text-[#1f2937] mb-3"
              style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)" }}
            >
              Get your own Jewellery Consultant by filling this request form
            </h2>
            <p className="text-[#4b5563] text-sm mb-8 leading-relaxed">
              Tell us your preferred date and time. Our team will confirm and
              connect you with an expert for a personalised video call.
            </p>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder:text-[#9ca3af] font-inter-regular text-sm outline-none focus:border-[var(--primary-color-b)] focus:ring-1 focus:ring-[var(--primary-color-b)]"
              />
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder:text-[#9ca3af] font-inter-regular text-sm outline-none focus:border-[var(--primary-color-b)] focus:ring-1 focus:ring-[var(--primary-color-b)]"
              />
            </div>
            <p className="text-[#6b7280] text-xs mb-2">Preferred date</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {DATE_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  className="px-4 py-2.5 rounded-lg border text-sm font-inter-regular transition-colors"
                  style={{
                    borderColor: selectedDate === d ? "var(--primary-color-b)" : "#e5e7eb",
                    backgroundColor: selectedDate === d ? "var(--primary-color-d)" : "white",
                    color: selectedDate === d ? "var(--primary-color-a)" : "#4b5563",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="text-[#6b7280] text-xs mb-2">Preferred time</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  className="px-4 py-2.5 rounded-lg border text-sm font-inter-regular transition-colors"
                  style={{
                    borderColor: selectedTime === t ? "var(--primary-color-b)" : "#e5e7eb",
                    backgroundColor: selectedTime === t ? "var(--primary-color-d)" : "white",
                    color: selectedTime === t ? "var(--primary-color-a)" : "#4b5563",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="w-full font-inter-semibold text-white py-4 rounded-xl hover:opacity-95 transition-opacity"
              style={{
                background: BTN_GRADIENT,
                boxShadow: "0 4px 14px rgba(136, 99, 251, 0.35)",
              }}
            >
              Find a Call
            </button>
          </div>
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div
              className="rounded-2xl overflow-hidden max-w-sm w-full"
              style={{
                boxShadow: "0 20px 40px rgba(79, 50, 103, 0.12)",
                aspectRatio: "3/4",
              }}
            >
              <img
                src={CONSULTANT_IMG}
                alt="Consultant on video call"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ========== SMART SHOPPING ========== */
const SMART_FEATURES = [
  {
    title: "8000+ Designs at your Fingertips",
    desc: "Browse our vast collection during your call. Your consultant will shortlist the best options for you.",
    image: JEWEL_BOX,
  },
  {
    title: "Make it a Fun Experience",
    desc: "Shop with family or friends on the same call. Get instant feedback and make decisions together.",
    image: PEOPLE_SMILE,
  },
  {
    title: "Get Tips on Jewellery Shopping",
    desc: "Learn about quality, craftsmanship, and care. Our experts help you choose with confidence.",
    image: TIPS_IMG,
  },
];

const SmartShoppingSection = () => (
  <section
    className="py-14 md:py-20 px-4 md:px-8"
    style={{ backgroundColor: "#f5f5f5" }}
  >
    <div className="max-w-[1280px] mx-auto">
      <h2
        className="font-inter-semibold text-[#1f2937] text-center mb-12 md:mb-14"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
      >
        Designed for Smart Shopping!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {SMART_FEATURES.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden text-center"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div className="aspect-square max-h-48 overflow-hidden bg-[#faf9fb]">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-inter-semibold text-[#1f2937] text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          type="button"
          className="font-inter-semibold text-white py-4 px-8 rounded-xl hover:opacity-95 transition-opacity"
          style={{
            background: BTN_GRADIENT,
            boxShadow: "0 4px 14px rgba(136, 99, 251, 0.35)",
          }}
        >
          Schedule a Live Call
        </button>
      </div>
    </div>
  </section>
);

/* ========== BROWSE PRODUCTS GRID ========== */
const BROWSE_CATEGORIES = [
  { label: "Earrings", image: EARRING_IMG },
  { label: "Rings", image: RING_IMG },
  { label: "Bracelets", image: RING_IMG },
  { label: "Necklace", image: PENDANT_IMG },
  { label: "Kids Jewellery", image: JEWEL_BOX },
  { label: "Other Jewellery", image: PENDANT_IMG },
  { label: "Bangles", image: RING_IMG },
  { label: "New Arrivals", image: EARRING_IMG },
  { label: "22KT Jewellery", image: RING_IMG },
];

const BrowseProductsSection = () => (
  <section
    className="py-14 md:py-20 px-4 md:px-8"
    style={{ backgroundColor: "#fafafa" }}
  >
    <div className="max-w-[1280px] mx-auto">
      <h2
        className="font-inter-semibold text-[#1f2937] text-center mb-12 md:mb-14"
        style={{
          fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
          lineHeight: 1.3,
        }}
      >
        Browse Products. Shortlist your Design. Book a call Today!
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
        {BROWSE_CATEGORIES.map((item, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden aspect-[4/3] group"
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 flex items-end p-4"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
              }}
            >
              <span className="font-inter-semibold text-white text-sm md:text-base">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          type="button"
          className="font-inter-semibold text-white py-4 px-8 rounded-xl hover:opacity-95 transition-opacity"
          style={{
            background: BTN_GRADIENT,
            boxShadow: "0 4px 14px rgba(136, 99, 251, 0.35)",
          }}
        >
          Schedule a Live Call
        </button>
      </div>
    </div>
  </section>
);

/* ========== REVIEWS ========== */
const REVIEWS = [
  {
    text: "The live call experience was fantastic. I could see every design clearly and the consultant helped me pick the perfect necklace for my wedding.",
    stars: 5,
  },
  {
    text: "So convenient! I shopped from my couch while the expert showed me earrings. Bought two pairs and couldn't be happier.",
    stars: 5,
  },
  {
    text: "Best way to buy jewellery online. Felt like having a friend at the store. Highly recommend the video call service.",
    stars: 5,
  },
];

const ReviewsSection = () => (
  <section
    className="py-14 md:py-20 px-4 md:px-8"
    style={{ backgroundColor: "#f5f5f5" }}
  >
    <div className="max-w-[1280px] mx-auto">
      <h2
        className="font-inter-semibold text-[#1f2937] text-center mb-12 md:mb-14"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
      >
        Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {REVIEWS.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 flex flex-col"
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <span
              className="text-4xl font-serif text-[var(--primary-color-b)] opacity-60 leading-none mb-4"
              aria-hidden
            >
              "
            </span>
            <p className="text-[#4b5563] text-sm leading-relaxed flex-1 mb-4">
              {r.text}
            </p>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  className="w-5 h-5"
                  fill={s <= r.stars ? "#f59e0b" : "#e5e7eb"}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <button
          type="button"
          className="font-inter-semibold text-white py-4 px-8 rounded-xl hover:opacity-95 transition-opacity"
          style={{
            background: BTN_GRADIENT,
            boxShadow: "0 4px 14px rgba(136, 99, 251, 0.35)",
          }}
        >
          Schedule a Live Call
        </button>
      </div>
    </div>
  </section>
);

/* ========== HAVE SOME QUESTIONS (FOOTER) ========== */
const FAQ_LINKS = [
  "About Us",
  "Contact Us",
  "Shipping Policy",
  "Return/Exchange Policy",
  "Terms & Conditions",
  "Privacy Policy",
];

const QuestionsSection = () => (
  <section
    className="py-12 md:py-16 px-4 md:px-8 border-t border-[#e5e7eb]"
    style={{ backgroundColor: "#f0f0f0" }}
  >
    <div className="max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h2 className="font-inter-semibold text-[#1f2937] text-xl md:text-2xl mb-6">
            Have Some Questions?
          </h2>
          <a
            href="tel:+919999111111"
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#1f2937] font-inter-regular text-sm hover:border-[var(--primary-color-b)] transition-colors"
          >
            <svg
              className="w-5 h-5 text-[var(--primary-color-a)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call us now at +91-9999111111
          </a>
        </div>
        <div>
          <ul className="space-y-0">
            {FAQ_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center justify-between py-3 border-b border-[#e5e7eb] text-[#4b5563] font-inter-regular text-sm hover:text-[var(--primary-color-a)] transition-colors group"
                >
                  {label}
                  <svg
                    className="w-4 h-4 text-[#9ca3af] group-hover:text-[var(--primary-color-a)] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* ========== PAGE ========== */
const CallLive = () => {
  return (
    <div className="min-h-screen bg-white font-inter-regular">
      <HeroSection />
      <HowItWorksSection />
      <ConsultantSection />
      <SmartShoppingSection />
      <BrowseProductsSection />
      <ReviewsSection />
      <QuestionsSection />
    </div>
  );
};

export default CallLive;
