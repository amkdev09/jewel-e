import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/images/avatar.png";
import emptyStateIllustration from "../../../assets/svg/emptyShoppingCart.svg";

const BTN_GRADIENT =
    "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)";

/* ========== CART HEADER ========== */
const CartHeader = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-[#e5e7eb]">
            <div className="px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="p-1 text-[#374151] hover:text-[var(--primary-color-a)] transition-colors"
                            aria-label="Go back"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            type="button"
                            aria-label="Account"
                            className="w-8 h-8 rounded-full flex items-center bg-[var(--color-pink)] justify-center shadow-sm"
                        >
                            <figure className="w-7 h-7 rounded-full overflow-hidden object-cover bg-[#ffdee4]">
                                <img src={avatar} alt="avatar" />
                            </figure>
                        </button>
                    </div>

                    <div className="relative flex items-start p-[2px] rounded-[9px] w-[20rem] cursor-pointer"
                        style={{
                            backgroundColor: 'rgb(232, 225, 255)',
                        }}
                    >
                        {/* Tab 1 */}
                        <input
                            type="radio"
                            name="tab"
                            id="tab1"
                            defaultChecked
                            className="peer/tab1 absolute w-[10rem] h-10 opacity-0 z-20 cursor-pointer"
                        />
                        <label
                            htmlFor="tab1"
                            className="font-inter-regular relative z-30 flex items-center justify-center w-[10rem] h-10 text-base cursor-pointer"
                        >
                            Shopping Bag (0)
                        </label>

                        {/* Tab 2 */}
                        <input
                            type="radio"
                            name="tab"
                            id="tab2"
                            className="peer/tab2 absolute left-[10rem] w-[10rem] h-10 opacity-0 z-20 cursor-pointer"
                        />
                        <label
                            htmlFor="tab2"
                            className="font-inter-regular relative z-30 flex items-center justify-center w-[10rem] h-10 text-base cursor-pointer"
                        >
                            Home Trial (0)
                        </label>

                        {/* Indicator */}
                        <div
                            className="
                                    absolute top-[2px] left-[2px]
                                    w-[10rem] h-10
                                    bg-white rounded-[7px]
                                    border border-black/5
                                    transition-all duration-200
                                    peer-checked/tab2:left-[10rem]
                                "
                        />
                    </div>

                    <div className="flex items-center gap-2 text-[#374151]">
                        <span className="text-sm font-inter-regular hidden sm:inline">Need Assistance?</span>
                        <button type="button" className="p-2 rounded-lg hover:bg-[#f3f4f6] transition-colors" aria-label="Chat">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>
                        <a href="tel:" className="p-2 rounded-lg hover:bg-[#f3f4f6] transition-colors" aria-label="Call">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

/* ========== EMPTY STATE ILLUSTRATION ========== */
const EmptyStateIllustration = () => (
    <div className="relative w-48 h-56 md:w-56 md:h-64 mx-auto mb-8">
        {/* Light blue cloud-like organic shape behind */}
        <div
            className="absolute w-full h-full rounded-[45%_55%_60%_40%_/55%_45%_55%_45%] opacity-95"
            style={{
                transform: "scale(1.15) translateY(-8%)",
            }}
        />
        <img src={emptyStateIllustration} alt="Empty State Illustration" />
        {/* Person: purple cap, purple top, light blue pants, holding brown box - flat style */}
    </div>
);

const badges = [
    {
        icon: (
            <div
                class="block mx-auto w-[43px] h-[29px] bg-[url('https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0')] bg-[-136px_-385px] bg-[length:340px]"
            ></div>
        ),
        line1: "BIS 100% Hall",
        line2: "Marked Jewellery",
    },
    {
        icon: (
            <div
                class="block mx-auto w-[66px] h-[33px] bg-[url('https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0')] bg-[-199px_-368px] bg-[length:340px]"
            ></div>
        ),
        line1: "Trust of Tanishq",
        line2: "Titan Priviledges",
    },
    {
        icon: (
            <div
                class="block mx-auto w-[51px] h-[26px] bg-[url('https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0')] bg-[-91px_-424px] bg-[length:340px]"
            ></div>
        ),
        line1: "100% Certified by",
        line2: "Caratlane",
    },
];
/* ========== EMPTY STATE SECTION ========== */
const EmptyStateSection = () => (
    <section className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <EmptyStateIllustration />
        <h1 className="font-inter-semibold text-[var(--primary-color-a)] text-bold text-center text-2xl mb-2">
            There is nothing here!
        </h1>
        <p className="font-inter-regular text-[#6b7280] text-center text-base mb-8">
            Let&apos;s do some retail therapy.
        </p>
        <Link
            to="/"
            className="flex items-center justify-center h-[42px] w-full max-w-[350px] font-inter-semibold text-white uppercase text-base rounded-[8px] box-border"
            style={{
                background: "linear-gradient(90deg, rgb(229, 110, 235) 0%, rgb(136, 99, 251) 100%)",
            }}
        >
            START SHOPPING
        </Link>
        <div className="w-full max-w-[350px] mx-auto mt-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
                {badges.map((b, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                        <div className="mb-3">{b.icon}</div>
                        <p className="font-inter-semibold text-[#374151] text-xs">{b.line1}</p>
                        <p className="font-inter-regular text-[#374151] text-xs">{b.line2}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

/* ========== BOTTOM FOOTER BAR ========== */
const FooterBar = () => {
    const policies = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "15 Day Exchange",
            sub: "On Online Orders",
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            ),
            title: "100% Certified",
        },
        {
            icon: (
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            ),
            title: "Lifetime Exchange",
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "One Year Warranty",
        },
    ];

    const paymentLabels = ["VISA", "Mastercard", "PayPal", "Amex"];

    return (
        <footer
            className="w-full py-6 md:py-8 px-4 md:px-8 border-t border-[#e5e7eb]"
            style={{ backgroundColor: "#EDE9F1" }}
        >
            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 md:gap-8">
                        {policies.map((p, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="text-[var(--primary-color-a)]">{p.icon}</div>
                                <div>
                                    <p className="font-inter-semibold text-[#374151] text-sm">{p.title}</p>
                                    {p.sub && <p className="font-inter-regular text-[#6b7280] text-xs">{p.sub}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-4">
                        {paymentLabels.map((label) => (
                            <span
                                key={label}
                                className="font-inter-regular text-[#6b7280] text-xs px-3 py-1.5 border border-[#d1d5db] rounded bg-white"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

/* ========== PAGE ========== */
const ShoppingCart = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white font-inter-regular">
            <CartHeader />
            <EmptyStateSection />
            <FooterBar />
        </div>
    );
};

export default ShoppingCart;
