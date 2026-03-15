import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../assets/images/avatar.png";
import emptyStateIllustration from "../../../assets/svg/emptyShoppingCart.svg";
import cartService from "../../../services/cartService";
import useSnackbar from "../../../hooks/useSnackbar";
import { useCartCount } from "../../../context/CartCountContext";

const BTN_GRADIENT =
    "linear-gradient(90deg, #e879f9 0%, #a855f7 50%, #7c3aed 100%)";

/* ========== CART HEADER ========== */
const CartHeader = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    return (
        <header className="sticky top-0 z-10 bg-white border-b border-[#e5e7eb]">
            <div className="px-4 py-4">
                <div className="flex items-center md:justify-between gap-4">
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
                            className="w-8 h-8 rounded-full flex items-center bg-[var(--color-pink)] justify-center shadow-sm cursor-pointer hidden md:flex"
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

                    <div className="flex items-center gap-2 text-[#374151] hidden md:flex">
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
                className="block mx-auto w-[43px] h-[29px] bg-[url('https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0')] bg-[-136px_-385px] bg-[length:340px]"
            ></div>
        ),
        line1: "BIS 100% Hall",
        line2: "Marked Jewellery",
    },
    {
        icon: (
            <div
                className="block mx-auto w-[66px] h-[33px] bg-[url('https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0')] bg-[-199px_-368px] bg-[length:340px]"
            ></div>
        ),
        line1: "Trust of Tanishq",
        line2: "Titan Priviledges",
    },
    {
        icon: (
            <div
                className="block mx-auto w-[51px] h-[26px] bg-[url('https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0')] bg-[-91px_-424px] bg-[length:340px]"
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
            to="/jewellery"
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

/* ========== COUPON MODAL (desktop: center modal, mobile: bottom drawer) ========== */
const OTHER_OFFERS = [
    { code: "MOUNT5", validTill: "March 31 2026", description: "Flat 5% Off on Solitaire Mount SKU", applicable: false },
];

const CouponModal = ({ isOpen, onClose, onApply }) => {
    const [inputCode, setInputCode] = useState("");

    const handleApply = () => {
        const code = inputCode.trim();
        if (code) {
            onApply(code);
            setInputCode("");
            onClose();
        }
    };

    if (!isOpen) return null;

    const content = (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh] w-full md:max-w-md">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e7eb]">
                <h2 className="font-bold text-[#111827]" style={{ fontSize: "18px" }}>Apply Coupon</h2>
                <button type="button" onClick={onClose} className="p-2 -m-2 text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6] rounded-full" aria-label="Close">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-1 border border-[#e5e7eb] rounded-xl px-4 py-3 text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30 focus:border-[#ec4899]"
                        style={{ fontSize: "14px" }}
                    />
                    <button
                        type="button"
                        onClick={handleApply}
                        className="px-5 py-3 rounded-xl font-semibold text-white shrink-0"
                        style={{ backgroundColor: "#ec4899", fontSize: "14px" }}
                    >
                        APPLY
                    </button>
                </div>
                <div>
                    <h3 className="font-semibold text-[#111827] mb-3" style={{ fontSize: "14px" }}>Other Offers at CaratLane</h3>
                    <div className="space-y-3">
                        {OTHER_OFFERS.map((offer) => (
                            <div
                                key={offer.code}
                                className="flex rounded-xl border border-[#e5e7eb] overflow-hidden bg-white"
                            >
                                <div className="w-14 shrink-0 flex items-center justify-center bg-[#e5e7eb] text-[#4b5563] font-bold text-xs uppercase py-4 rounded-l-lg">
                                    {offer.code.includes("5") ? "5% OFF" : "OFF"}
                                </div>
                                <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                                    <p className="font-semibold text-[#111827] text-sm">{offer.code}</p>
                                    <p className="text-xs text-[#6b7280]">Valid till {offer.validTill}</p>
                                    <p className="text-xs text-[#4b5563] mt-0.5">{offer.description}</p>
                                </div>
                                <div className="shrink-0 flex items-center pr-3">
                                    <span className="text-xs text-[#9ca3af]">Not Applicable</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} aria-hidden />
            <div
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="coupon-modal-title"
            >
                <div
                    className="w-full md:max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {content}
                </div>
            </div>
        </>
    );
};

/* ========== PAGE ========== */
const ShoppingCart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [couponModalOpen, setCouponModalOpen] = useState(false);
    const [appliedCouponCode, setAppliedCouponCode] = useState("");
    const { showSnackbar } = useSnackbar();
    const { decrementCartCount } = useCartCount();
    const navigate = useNavigate();

    useEffect(() => {
        const loadCart = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await cartService.getCart();
                if (res?.success === false) {
                    throw new Error(res?.message || "Failed to load cart");
                }
                setCart(res?.data ?? null);
            } catch (err) {
                setError(err?.message || "Failed to load cart");
                setCart(null);
            } finally {
                setLoading(false);
            }
        };
        loadCart();
    }, []);

    const handleRemove = async (item) => {
        if (!item?.productId?._id && !item?.productId) return;
        try {
            const payload = {
                productId: item.productId._id || item.productId,
                variantId: item.variantId || null,
            };
            const res = await cartService.removeFromCart(payload);
            const message =
                res?.message ||
                res?.data?.message ||
                "Item removed from cart.";
            showSnackbar(message, "success");
            setCart(res?.data ?? cart);
            const qty = Number(item.quantity) || 1;
            decrementCartCount(qty);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to remove item.";
            showSnackbar(message, "error");
        }
    };

    const hasItems = Array.isArray(cart?.items) && cart.items.length > 0;

    return (
        <div className="min-h-screen flex flex-col bg-white font-inter-regular">
            <CartHeader />
            {loading ? (
                <section className="flex-1 flex items-center justify-center px-4 py-12">
                    <p className="text-[#6b7280] text-base">Loading your cart…</p>
                </section>
            ) : hasItems ? (
                <section className="flex-1 px-4 py-6 max-w-[1200px] mx-auto w-full">
                    {error && (
                        <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
                    )}
                    <h1 className="text-xl font-inter-semibold text-[#111827] mb-6">
                        Shopping Bag ({cart.items.length})
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6 lg:gap-8">
                        {/* Left column – items and try-at-home banner */}
                        <div className="space-y-4">
                            {/* See it before you buy banner */}
                            <div className="rounded-2xl px-4 py-3 flex items-center justify-between bg-gradient-to-r from-[#bbf7d0] via-[#bfdbfe] to-[#fef3c7] border border-white shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                                        <span className="text-[#22c55e] text-lg">💬</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="font-inter-semibold text-sm text-[#111827]">
                                            See it before you buy it
                                        </p>
                                        <p className="text-xs text-[#4b5563]">
                                            Experience our designs in detail with video call
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-inter-semibold text-white shadow"
                                    style={{ background: BTN_GRADIENT }}
                                >
                                    GET IT LIVE
                                </button>
                            </div>

                            {/* Cart items card */}
                            <div className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                                {cart.items.map((item, idx) => {
                                    const product = item.productId || {};
                                    const name = product.name || "Product";
                                    const image =
                                        (Array.isArray(product.images) && product.images[0]) || "";
                                    const price = item.priceAtTime || product.basePrice || 0;
                                    return (
                                        <div
                                            key={product._id || product.id || idx}
                                            className="flex gap-4 px-4 py-4 border-b last:border-b-0 border-[#f3f4f6]"
                                        >
                                            <div className="w-20 h-24 rounded-md bg-[#f9fafb] overflow-hidden flex-shrink-0">
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : null}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-inter-semibold text-[#111827] text-sm mb-1 truncate">
                                                    {name}
                                                </p>
                                                {item.selectedOptions && (
                                                    <p className="text-xs text-[#6b7280] mb-1 truncate">
                                                        {Object.entries(item.selectedOptions)
                                                            .map(([k, v]) => `${k}: ${v}`)
                                                            .join(" • ")}
                                                    </p>
                                                )}
                                                <p className="text-xs text-[#6b7280] mb-1">
                                                    Quantity: {item.quantity}
                                                </p>
                                                <button
                                                    type="button"
                                                    className="text-xs text-[var(--color-pink)] underline"
                                                >
                                                    Check Delivery Date
                                                </button>
                                                <p className="mt-2 font-inter-semibold text-[#4b5563] text-sm">
                                                    ₹{Number(price).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(item)}
                                                className="self-start text-xs text-[#9ca3af] hover:text-[#ef4444]"
                                                aria-label="Remove item"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right column – summary */}
                        <aside className="space-y-4">
                            {/* Offer banner */}
                            <div className="rounded-2xl px-5 py-4 bg-gradient-to-r from-[#fecaca] via-[#f9a8d4] to-[#fef3c7] text-[#4b0f52] shadow-sm">
                                <p className="text-xs uppercase tracking-wide mb-1 font-inter-semibold">
                                    Offer
                                </p>
                                <p className="text-2xl font-inter-semibold leading-snug">
                                    ₹500 OFF
                                </p>
                                <p className="text-xs text-[#6b21a8] mt-1 mb-3">
                                    by completing your profile on the app
                                </p>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/90 text-xs font-inter-semibold text-[#ec4899] shadow-sm"
                                >
                                    DOWNLOAD APP
                                </button>
                            </div>

                            {/* Apply coupon */}
                            <button
                                type="button"
                                onClick={() => setCouponModalOpen(true)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-[#eef2ff] to-[#fef3f7] border border-[#e5e7eb] text-left"
                            >
                                <div>
                                    <p className="text-sm font-inter-semibold text-[#111827]">
                                        Apply Coupon
                                    </p>
                                    <p className="text-xs text-[#6b7280]">
                                        {appliedCouponCode ? `Code: ${appliedCouponCode}` : "Have a coupon? Redeem it here"}
                                    </p>
                                </div>
                                <span className="inline-flex w-8 h-8 rounded-full items-center justify-center bg-white shadow text-[#ec4899]">
                                    →
                                </span>
                            </button>
                            <CouponModal
                                isOpen={couponModalOpen}
                                onClose={() => setCouponModalOpen(false)}
                                onApply={(code) => { setAppliedCouponCode(code); showSnackbar(`Coupon ${code} applied.`, "success"); }}
                            />

                            {/* Delivery & store details */}
                            <button
                                type="button"
                                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-[#e5e7eb] bg-white text-left"
                            >
                                <div>
                                    <p className="text-sm font-inter-semibold text-[#111827]">
                                        Check Delivery & Store Details
                                    </p>
                                    <p className="text-xs text-[#6b7280]">
                                        Enter pincode to see delivery options
                                    </p>
                                </div>
                                <span className="text-xs font-inter-semibold text-[var(--color-pink)]">
                                    Enter Pincode
                                </span>
                            </button>

                            {/* Price summary */}
                            <div className="rounded-2xl border border-[#e5e7eb] bg-white px-4 py-4 space-y-2 text-sm text-[#4b5563]">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span>
                                        ₹{Number(cart.totalAmount || cart.totalBreakdown?.subTotal || 0).toLocaleString("en-IN")}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Coupon Discount</span>
                                    <button
                                        type="button"
                                        onClick={() => setCouponModalOpen(true)}
                                        className="text-xs font-inter-semibold text-[var(--color-pink)]"
                                    >
                                        {appliedCouponCode ? appliedCouponCode : "Apply Coupon"}
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping (Standard)</span>
                                    <span className="text-emerald-500 font-inter-semibold">Free</span>
                                </div>
                                <hr className="my-1 border-dashed border-[#e5e7eb]" />
                                <div className="flex items-center justify-between pt-1">
                                    <span className="font-inter-semibold text-[#111827]">
                                        Total Cost
                                    </span>
                                    <span className="font-inter-semibold text-[#111827]">
                                        ₹{Number(cart.totalAmount || 0).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            {/* Place order button */}
                            <button
                                type="button"
                                className="w-full h-11 rounded-lg text-sm font-inter-semibold text-white shadow-md"
                                style={{ background: BTN_GRADIENT }}
                                onClick={() => navigate("/checkout/address", { state: { couponCode: appliedCouponCode } })}
                            >
                                PLACE ORDER
                            </button>
                        </aside>
                    </div>
                </section>
            ) : (
                <EmptyStateSection />
            )}
            <FooterBar />
        </div>
    );
};

export default ShoppingCart;
