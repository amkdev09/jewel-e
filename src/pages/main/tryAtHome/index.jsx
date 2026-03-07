import React, { useRef } from "react";

/* ========== IMAGES ========== */
const HERO_IMAGE =
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80";
const RING_IMG =
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80";
const EARRING_IMG =
    "https://images.unsplash.com/photo-1596944924297-2e5c2f5c1c8a?w=400&q=80";
const PENDANT_IMG =
    "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80";

/* ========== HERO ========== */
const HeroSection = () => (
    <section
        className="relative overflow-hidden css-gz7rx1"
    >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-10 pt-8 md:pt-12 pb-12 md:pb-16">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 order-2 lg:order-1 text-center lg:text-left pt-4 lg:pt-0">
                    <h1
                        className="font-inter-semibold text-[var(--primary-color-a)] mb-4 text-4xl"
                    >
                        Try Jewellery at Home, for Free.
                    </h1>
                    <p
                        className="text-[#4b5563] font-inter-regular mb-8 max-w-xl mx-auto lg:mx-0"
                        style={{ fontSize: "1rem", lineHeight: 1.625 }}
                    >
                        Find upto 5 designs to try in the comfort of your home at your
                        convenience.
                    </p>
                    <button
                        type="button"
                        className="font-inter-semibold text-white uppercase tracking-wider text-sm py-4 px-8 rounded-xl shadow-md hover:opacity-95 transition-opacity"
                        style={{
                            background: "linear-gradient(90deg, #8863fb 0%, #b8a4f0 100%)",
                            boxShadow: "0 4px 14px rgba(136, 99, 251, 0.35)",
                        }}
                    >
                        CHECK AVAILABILITY
                    </button>
                </div>
                <div className="flex-1 order-1 lg:order-2 w-full max-w-md lg:max-w-lg">
                    <div
                        className="relative rounded-2xl overflow-hidden"
                        style={{
                            boxShadow:
                                "0 20px 40px rgba(79, 50, 103, 0.12), 0 8px 16px rgba(0,0,0,0.06)",
                            aspectRatio: "4/5",
                            background:
                                "linear-gradient(135deg, rgba(246,243,249,0.9) 0%, rgba(232,224,248,0.5) 100%)",
                        }}
                    >
                        <img
                            src={HERO_IMAGE}
                            alt="Woman wearing pearl drop earring"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section >
);

/* ========== HOW IT WORKS ========== */
const HOW_IT_WORKS = [
    {
        title: "Pick Your Favourite Designs",
        desc: "Tap here that stole your heart",
        gradient: "linear-gradient(135deg, #e8dcf8 0%, #f3e8ff 100%)",
        icon: (
            <svg
                className="w-8 h-8 text-[var(--primary-color-a)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
    {
        title: "Book a Slot",
        desc: "Choose date & time that works for you",
        gradient: "linear-gradient(135deg, #ffe8e4 0%, #fff0ed 100%)",
        icon: (
            <svg
                className="w-8 h-8 text-[var(--primary-color-a)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
    },
    {
        title: "Try at Home",
        desc: "Our expert brings designs to your doorstep",
        gradient: "linear-gradient(135deg, #e0e7ff 0%, #e8eeff 100%)",
        icon: (
            <svg
                className="w-8 h-8 text-[var(--primary-color-a)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
            </svg>
        ),
    },
    {
        title: "Keep What You Love",
        desc: "Buy only what you love, return the rest",
        gradient: "linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)",
        icon: (
            <svg
                className="w-8 h-8 text-[var(--primary-color-a)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        ),
    },
];

const HowItWorksSection = () => (
    <section
        className="py-14 md:py-20 px-4 md:px-8 relative overflow-hidden css-1tpyubb">
        <div className="max-w-[1280px] mx-auto">
            <h2
                className="font-inter-semibold text-[var(--primary-color-a)] text-center mb-12 md:mb-14"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
                How It Works ?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {HOW_IT_WORKS.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 md:p-7 flex flex-col items-center text-center"
                        style={{
                            boxShadow: "0 4px 20px rgba(79, 50, 103, 0.08)",
                        }}
                    >
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                            style={{
                                background: item.gradient,
                                boxShadow: "0 4px 12px rgba(79, 50, 103, 0.1)",
                            }}
                        >
                            {item.icon}
                        </div>
                        <h3 className="font-inter-semibold text-[#374151] text-base md:text-lg mb-2">
                            {item.title}
                        </h3>
                        <p className="text-[#6b7280] font-inter-regular text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ========== BROWSE DESIGNS ========== */
const BROWSE_PRODUCTS = [
    {
        price: "₹16,014",
        name: "Bright bloom Diamond stud...",
        image: EARRING_IMG,
    },
    {
        price: "₹24,500",
        name: "Classic solitaire Ring...",
        image: RING_IMG,
    },
    {
        price: "₹18,990",
        name: "Pearl drop Pendant...",
        image: PENDANT_IMG,
    },
    {
        price: "₹21,200",
        name: "Eternal love Earrings...",
        image: EARRING_IMG,
    },
    {
        price: "₹15,700",
        name: "Sparkle Diamond stud...",
        image: EARRING_IMG,
    },
];

const BrowseDesignsSection = () => {
    const carouselRef = useRef(null);

    const scroll = (dir) => {
        if (!carouselRef.current) return;
        const step = 280;
        carouselRef.current.scrollBy({
            left: dir === "left" ? -step : step,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-14 md:py-20 px-4 md:px-8 bg-white">
            <div className="max-w-[1280px] mx-auto">
                <h2
                    className="font-inter-semibold text-[var(--primary-color-a)] text-center mb-2"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}
                >
                    Celebrate Special Occasions
                </h2>
                <p className="text-[#6b7280] text-center text-sm md:text-base mb-10 max-w-2xl mx-auto">
                    Book a FREE jewellery trial at home, and let your loved ones choose
                    their gifts!
                </p>
                <h3 className="font-inter-semibold text-[var(--primary-color-a)] text-xl md:text-2xl mb-6">
                    Browse Designs
                </h3>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                        style={{
                            background: "rgba(136, 99, 251, 0.9)",
                            color: "white",
                        }}
                        aria-label="Previous"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                        style={{
                            background: "rgba(136, 99, 251, 0.9)",
                            color: "white",
                        }}
                        aria-label="Next"
                    >
                        <svg
                            className="w-5 h-5"
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
                    </button>
                    <div
                        ref={carouselRef}
                        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-2"
                        style={{ scrollSnapType: "x proximity" }}
                    >
                        {BROWSE_PRODUCTS.map((product, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 w-[260px] md:w-[280px] bg-white rounded-xl border border-[#f3f4f6] overflow-hidden"
                                style={{
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                                    scrollSnapAlign: "start",
                                }}
                            >
                                <div className="aspect-square bg-[#faf9fb] relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="font-inter-semibold text-[var(--primary-color-a)] text-lg mb-1">
                                        {product.price}
                                    </p>
                                    <p className="text-[#6b7280] text-sm mb-4 line-clamp-2">
                                        {product.name}
                                    </p>
                                    <button
                                        type="button"
                                        className="w-full font-inter-semibold text-white uppercase tracking-wider text-xs py-3 rounded-lg"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #8863fb 0%, #b8a4f0 100%)",
                                            boxShadow: "0 2px 8px rgba(136, 99, 251, 0.3)",
                                        }}
                                    >
                                        TRY AT HOME
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ========== STORE EXPERIENCE ========== */
const STORE_CATEGORIES = [
    {
        label: "Rings",
        bg: "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)",
        img: RING_IMG,
    },
    {
        label: "Solitaires",
        bg: "linear-gradient(135deg, #818cf8 0%, #a5b4fc 100%)",
        img: RING_IMG,
    },
    {
        label: "Necklaces",
        bg: "linear-gradient(135deg, #f472b6 0%, #f9a8d4 100%)",
        img: PENDANT_IMG,
    },
    {
        label: "Earrings",
        bg: "linear-gradient(135deg, #c084fc 0%, #e9d5ff 100%)",
        img: EARRING_IMG,
    },
    {
        label: "Bracelets",
        bg: "linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)",
        img: RING_IMG,
    },
    {
        label: "Mangalsutra",
        bg: "linear-gradient(135deg, #d4a574 0%, #e8d5c4 100%)",
        img: PENDANT_IMG,
    },
];

const StoreExperienceSection = () => (
    <section className="py-14 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-[1280px] mx-auto">
            <h2
                className="font-inter-semibold text-[var(--primary-color-a)] text-center mb-2"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}
            >
                Bring the Store Experience Home
            </h2>
            <p className="text-[#6b7280] text-center text-sm md:text-base mb-12 max-w-2xl mx-auto">
                Enjoy the Best of Shopping at Home, Together with Your Family
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {STORE_CATEGORIES.map((cat, i) => (
                    <div
                        key={i}
                        className="rounded-2xl overflow-hidden flex items-center justify-between p-6 min-h-[120px] md:min-h-[140px]"
                        style={{
                            background: cat.bg,
                            boxShadow: "0 4px 16px rgba(79, 50, 103, 0.12)",
                        }}
                    >
                        <span className="font-inter-semibold text-white text-lg md:text-xl">
                            {cat.label}
                        </span>
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white/20 flex-shrink-0">
                            <img
                                src={cat.img}
                                alt={cat.label}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ========== PERFECT FIT ========== */
const PerfectFitSection = () => (
    <section
        className="py-14 md:py-20 px-4 md:px-8"
        style={{ backgroundColor: "#fafafa" }}
    >
        <div className="max-w-[1280px] mx-auto text-center">
            <h2
                className="font-inter-semibold text-[var(--primary-color-a)] mb-2"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)" }}
            >
                Ensure the Perfect Fit
            </h2>
            <p className="text-[#6b7280] text-sm md:text-base max-w-xl mx-auto">
                Try stunning designs at home, & discover your perfect match!
            </p>
        </div>
    </section>
);

/* ========== TESTIMONIALS ========== */
const TESTIMONIALS = [
    {
        text: "The try at home experience was amazing. I could finally see how the earrings looked with my outfit. The representative was very helpful and patient.",
        name: "Ankitabhan",
        location: "Mumbai",
        stars: 5,
    },
    {
        text: "Loved that I could try multiple designs without stepping out. The jewellery quality was exactly as shown online. Highly recommend!",
        name: "Priya S.",
        location: "Delhi",
        stars: 5,
    },
    {
        text: "Such a convenient service. Tried 5 different necklaces and bought the one that suited me best. No pressure, great experience.",
        name: "Rekha M.",
        location: "Bangalore",
        stars: 4,
    },
    {
        text: "Perfect for gifting! I booked a trial for my mother and she could choose her favourite from the comfort of home.",
        name: "Vikram K.",
        location: "Chennai",
        stars: 5,
    },
    {
        text: "The team was professional and the designs were beautiful. Will definitely use this service again for my next purchase.",
        name: "Sneha L.",
        location: "Pune",
        stars: 5,
    },
    {
        text: "Try at home made my engagement ring selection so easy. No more store hopping. Absolutely worth it!",
        name: "Arjun P.",
        location: "Hyderabad",
        stars: 5,
    },
];

const StarRating = ({ count }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
            <svg
                key={i}
                className="w-4 h-4"
                fill={i <= count ? "var(--primary-color-b)" : "#e5e7eb"}
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const TestimonialsSection = () => (
    <section
        className="py-14 md:py-20 px-4 md:px-8 relative overflow-hidden"
        style={{
            backgroundColor: "#fefefe",
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(232, 224, 248, 0.25) 0%, transparent 40%),
        radial-gradient(circle at 80% 80%, rgba(246, 243, 249, 0.3) 0%, transparent 40%)`,
        }}
    >
        <div className="max-w-[1280px] mx-auto">
            <h2
                className="font-inter-semibold text-[var(--primary-color-a)] mb-10 md:mb-12 text-left"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
                1200+ Unforgettable Moments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {TESTIMONIALS.map((t, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 flex flex-col"
                        style={{
                            boxShadow: "0 4px 20px rgba(79, 50, 103, 0.08)",
                        }}
                    >
                        <p className="text-[#374151] font-inter-regular text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                            {t.text}
                        </p>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="font-inter-semibold text-[var(--primary-color-a)] text-sm">
                                {t.name}
                            </span>
                            <span className="text-[#9ca3af] text-xs">{t.location}</span>
                        </div>
                        <div className="mt-3">
                            <StarRating count={t.stars} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ========== PAGE ========== */
const TryAtHome = () => {
    return (
        <div className="min-h-screen bg-white font-inter-regular">
            <HeroSection />
            <HowItWorksSection />
            <BrowseDesignsSection />
            <StoreExperienceSection />
            <PerfectFitSection />
            <TestimonialsSection />
        </div>
    );
};

export default TryAtHome;
