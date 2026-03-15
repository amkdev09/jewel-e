import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../../services/productSerive";
import cartService from "../../../services/cartService";
import wishlistService from "../../../services/wishlistService";
import useSnackbar from "../../../hooks/useSnackbar";
import { useCartCount } from "../../../context/CartCountContext";

/* Product detail page – pixel-perfect to design. Uses index.css vars and product-level data. */

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1628926379972-9843ad139a8c?q=80&w=2070&auto=format&fit=crop";

const ACCENT = "#6A2E8D";
const ACCENT_LIGHT = "#B069D6";
const ACCENT_BG = "#F8F2FC";
const TEXT_PRIMARY = "#333333";
const TEXT_MUTED = "#888888";
const BORDER = "#E0E0E0";
const TEAL_BANNER = "#2D9381";
const ORANGE_BANNER = "#B7532B";

const fontRegular = "var(--font-regular)";
const fontSemiBold = "var(--font-semiBold)";
const textXs = "var(--text-xs)";
const textSm = "var(--text-sm)";
const textBase = "var(--text-base)";
const textLg = "var(--text-lg)";
const textXl = "var(--text-xl)";
const text2xl = "var(--text-2xl)";
const text3xl = "var(--text-3xl)";

function formatPrice(value) {
  if (value == null || Number.isNaN(Number(value))) return null;
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function normalizeDetailProduct(raw) {
  if (!raw || typeof raw !== "object") return null;
  const name = raw.name ?? raw.title ?? "";
  const description = raw.description ?? "";
  const breakdown = raw.price?.breakdown;
  const priceNum =
    breakdown?.finalPrice ??
    raw.price?.basePrice ??
    raw.basePrice ??
    raw.price ??
    raw.salePrice ??
    raw.sellingPrice ??
    0;
  const price = formatPrice(priceNum) ?? "₹0";
  const originalNum = raw.originalPrice ?? raw.mrp ?? null;
  const original = originalNum != null ? formatPrice(originalNum) : null;
  const discountPct =
    originalNum != null && originalNum > 0 && priceNum < originalNum
      ? Math.round(((originalNum - priceNum) / originalNum) * 100)
      : null;
  const images = Array.isArray(raw.images)
    ? raw.images
    : raw.image
      ? [raw.image]
      : [raw.thumbnail ?? PLACEHOLDER_IMAGE];
  const mainImage = images[0] ?? PLACEHOLDER_IMAGE;
  const inv = raw.inventory ?? {};
  const isInStock = inv.isInStock ?? true;
  const stockAvailable = inv.stockAvailable ?? 0;
  const stockReserved = inv.stockReserved ?? 0;
  const metalType = raw.metalType ?? raw.metal ?? "gold";
  const metalColor = raw.metalColor ?? raw.metalColour ?? "yellow";
  const purity = raw.purity ?? "—";
  const goldWeight = raw.goldWeight != null ? raw.goldWeight : null;
  const diamondWeight = raw.diamondWeight != null ? raw.diamondWeight : null;
  const diamondType = raw.diamondType ?? "—";
  const makingCharges = raw.makingCharges != null ? raw.makingCharges : null;
  const gstRate = raw.gstRate != null ? raw.gstRate : null;
  return {
    id: raw.id ?? raw._id,
    slug: raw.slug,
    name,
    description,
    price,
    original,
    discountPct,
    images,
    mainImage,
    ringSize: raw.ringSize ?? "11-Indian",
    metal: metalType,
    purity,
    metalColour: metalColor,
    goldWeight,
    diamondWeight,
    diamondType,
    makingCharges,
    gstRate,
    ringSizeValue: raw.ringSizeValue ?? "11",
    collection: raw.collection ?? "—",
    gender: raw.gender ?? "—",
    occasion: raw.occasion ?? "—",
    certificate: raw.certificate ?? "—",
    isInStock,
    stockAvailable,
    stockReserved,
    priceBreakdown: breakdown
      ? {
          goldWeight: breakdown.goldWeight,
          goldRate: breakdown.goldRate,
          goldAmount: breakdown.goldAmount,
          diamondWeight: breakdown.diamondWeight,
          diamondAmount: breakdown.diamondAmount,
          makingCharges: breakdown.makingCharges,
          variantAdjustment: breakdown.variantAdjustment,
          subTotal: breakdown.subTotal,
          gstRate: breakdown.gstRate,
          gstAmount: breakdown.gstAmount,
          finalPrice: breakdown.finalPrice,
        }
      : null,
  };
}

const RING_SIZES = ["9-Indian", "10-Indian", "11-Indian", "12-Indian", "13-Indian", "14-Indian"];

const PRODUCT_DETAILS_ROWS = (p) => {
  const fmtNum = (v) => (v != null && v !== "" ? String(v) : "—");
  const fmtWeight = (v) => (v != null ? `${v} g` : "—");
  return [
    { label: "Metal type", value: p?.metal ? String(p.metal).charAt(0).toUpperCase() + String(p.metal).slice(1) : "—" },
    { label: "Metal colour", value: p?.metalColour ? String(p.metalColour).charAt(0).toUpperCase() + String(p.metalColour).slice(1) : "—" },
    { label: "Purity", value: fmtNum(p?.purity) },
    { label: "Gold weight", value: fmtWeight(p?.goldWeight) },
    { label: "Diamond weight", value: fmtWeight(p?.diamondWeight) },
    { label: "Diamond type", value: p?.diamondType ? String(p.diamondType).charAt(0).toUpperCase() + String(p.diamondType).slice(1) : "—" },
    { label: "Making charges", value: p?.makingCharges != null ? formatPrice(p.makingCharges) : "—" },
    { label: "GST rate", value: p?.gstRate != null ? `${p.gstRate}%` : "—" },
    { label: "Stock available", value: fmtNum(p?.stockAvailable) },
    { label: "Stock reserved", value: fmtNum(p?.stockReserved) },
    { label: "Ring size", value: p?.ringSizeValue ?? p?.ringSize ?? "—" },
    { label: "Collection", value: p?.collection ?? "—" },
    { label: "Gender", value: p?.gender ?? "—" },
    { label: "Occasion", value: p?.occasion ?? "—" },
    { label: "Certificate", value: p?.certificate ?? "—" },
  ];
};

const YOU_MAY_LIKE = [
  { id: "1", name: "RL0032", price: "₹14,999", image: PLACEHOLDER_IMAGE },
  { id: "2", name: "RL0033", price: "₹18,500", image: PLACEHOLDER_IMAGE },
  { id: "3", name: "RL0034", price: "₹22,000", image: PLACEHOLDER_IMAGE },
];

const BackArrow = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const HeartOutline = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1h-1M4 12a1 1 0 011-1h1m10-1V6a1 1 0 00-1-1M2 6h10a1 1 0 011 1v10" />
  </svg>
);

const CardIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ButtonSpinner = ({ className = "w-5 h-5" }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export default function ProductReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { incrementCartCount } = useCartCount();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [ringSize, setRingSize] = useState("");
  const [pincode, setPincode] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!id) {
      setError("Invalid product");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const raw = await productService.getProductById(id);
      const normalized = normalizeDetailProduct(raw);
      setProduct(normalized);
      setRingSize(normalized?.ringSize || RING_SIZES[2] || "");
    } catch (err) {
      setError(err?.message ?? "Failed to load product");
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const p = product;

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: fontRegular }}>
        <p style={{ color: TEXT_MUTED, fontSize: textBase }}>Loading product…</p>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center" style={{ fontFamily: fontRegular }}>
        <p style={{ color: TEXT_MUTED, fontSize: textBase, marginBottom: 12 }}>{error || "Product not found."}</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md border border-[#E0E0E0] text-[#333] hover:bg-[#F5F5F5]"
          style={{ fontSize: textSm }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const images = Array.isArray(p.images) && p.images.length
    ? p.images
    : [p.mainImage ?? PLACEHOLDER_IMAGE];
  const mainImageUrl = images[selectedImage] ?? images[0] ?? PLACEHOLDER_IMAGE;
  const detailsRows = PRODUCT_DETAILS_ROWS(p);

  const availableRingSizes = (() => {
    if (!p?.ringSize) return RING_SIZES;
    if (RING_SIZES.includes(p.ringSize)) return RING_SIZES;
    return [p.ringSize, ...RING_SIZES];
  })();

  const isInStock = p?.isInStock ?? true;

  const handleAddToCart = async () => {
    if (!p?.id || !isInStock) return;
    setAddingToCart(true);
    try {
      const selectedOptions = {
        ringSize: ringSize || p.ringSizeValue || "",
        purity: p.purity || "",
        metalColor: p.metalColour || "",
      };
      const payload = {
        productId: p.id,
        variantId: null,
        quantity: 1,
        selectedOptions,
      };
      const res = await cartService.addToCart(payload);
      const message =
        res?.message ||
        res?.data?.message ||
        "Added to cart successfully.";
      showSnackbar(message, "success");
      incrementCartCount(1);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add to cart.";
      showSnackbar(message, "error");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!p?.id) return;
    setAddingToWishlist(true);
    try {
      const res = await wishlistService.addToWishlist({ productId: p.id });
      const message =
        res?.message ||
        res?.data?.message ||
        "Added to wishlist successfully.";
      showSnackbar(message, "success");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to add to wishlist.";
      showSnackbar(message, "error");
    } finally {
      setAddingToWishlist(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white text-[#000] max-w-[100vw] overflow-x-hidden"
      style={{ fontFamily: fontRegular }}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-1 text-[#374151] hover:opacity-80"
            aria-label="Go back"
          >
            <BackArrow />
          </button>
          <span style={{ fontSize: textBase, fontFamily: fontSemiBold, color: TEXT_PRIMARY }}>Product</span>
          <div className="w-8" />
        </div>
      </header>

      <main className="pb-12 max-w-[1470px] mx-auto">
        <div className="px-4 md:px-6 lg:px-8 py-6">
          {error && (
            <div className="mb-4 px-3 py-2 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 lg:gap-10">
            {/* Left: Image gallery — 60% on desktop, full width on small */}
            <div className="space-y-3">
              <div
                className="aspect-square bg-[#F5F0F8] overflow-hidden border border-[#E0E0E0]"
              >
                <img
                  src={mainImageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 4).map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden border-1 bg-[#F5F0F8] ${selectedImage === i ? "border-[#6A2E8D]" : "border-transparent"
                      }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details & actions — 25% on desktop, full width on small */}
            <div className="space-y-5">
              {/* Offer banner */}
              <div
                className="flex items-center justify-between rounded-lg px-4 py-3 text-white"
                style={{ backgroundColor: ACCENT, fontSize: textSm, fontFamily: fontSemiBold }}
              >
                <span>GET ₹500 OFF</span>
                <button type="button" className="underline opacity-90 hover:opacity-100">View offers</button>
              </div>

              <h1
                className="font-bold text-[#000]"
                style={{ fontSize: text2xl, fontFamily: fontSemiBold, lineHeight: 1.3 }}
              >
                {p.name}
              </h1>

              {p.description ? (
                <p className="text-[#333]" style={{ fontSize: textBase, lineHeight: 1.5 }}>
                  {p.description}
                </p>
              ) : null}

              {/* Price & stock */}
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-bold text-[#000]" style={{ fontSize: text3xl }}>{p.price}</span>
                {p.original && (
                  <span className="line-through text-[#666]" style={{ fontSize: textLg }}>{p.original}</span>
                )}
                {p.discountPct != null && p.discountPct > 0 && (
                  <span
                    className="rounded px-2 py-0.5 text-white font-medium"
                    style={{ fontSize: textXs, backgroundColor: "#22c55e" }}
                  >
                    {p.discountPct}% OFF
                  </span>
                )}
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${isInStock ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                    }`}
                >
                  {isInStock ? "In stock" : "Out of stock"}
                </span>
              </div>

              {/* Ring size */}
              <div>
                <label className="block mb-1.5 text-[#333]" style={{ fontSize: textSm, fontFamily: fontSemiBold }}>
                  Ring Size:
                </label>
                <select
                  value={ringSize}
                  onChange={(e) => setRingSize(e.target.value)}
                  className="w-full max-w-[200px] border border-[#E0E0E0] rounded-md px-3 py-2 text-[#333] bg-white"
                  style={{ fontSize: textBase }}
                >
                  {availableRingSizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <p className="mt-1 text-[10px] text-[#6b7280]">
                  Select your preferred ring size. Size is required to add this item to cart.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!isInStock || addingToCart}
                  className={`flex-1 min-w-[140px] py-3 px-6 rounded-lg font-semibold transition-opacity flex items-center justify-center gap-2 ${
                    isInStock ? "text-white hover:opacity-90" : "cursor-not-allowed bg-gray-300 text-gray-500"
                  } ${addingToCart ? "cursor-wait" : ""}`}
                  style={
                    isInStock
                      ? { backgroundColor: ACCENT, fontSize: textSm }
                      : { fontSize: textSm }
                  }
                  title={!isInStock ? "Out of stock" : undefined}
                >
                  {addingToCart ? (
                    <>
                      <ButtonSpinner className="w-5 h-5 text-white" />
                      <span>Adding…</span>
                    </>
                  ) : isInStock ? (
                    "ADD TO CART"
                  ) : (
                    "OUT OF STOCK"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleAddToWishlist}
                  disabled={addingToWishlist}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 border-[#6A2E8D] text-[#6A2E8D] font-semibold hover:bg-[#F8F2FC] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ fontSize: textSm }}
                >
                  {addingToWishlist ? (
                    <>
                      <ButtonSpinner className="w-5 h-5 text-[#6A2E8D]" />
                      <span>Adding…</span>
                    </>
                  ) : (
                    <>
                      <HeartOutline />
                      ADD TO WISHLIST
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="p-3 rounded-lg border border-[#E0E0E0] text-[#333] hover:bg-[#F5F5F5]"
                  aria-label="Share"
                >
                  <ShareIcon />
                </button>
              </div>

              {/* Delivery */}
              <div className="border border-[#E0E0E0] rounded-lg p-4 space-y-2">
                <p className="text-[#333]" style={{ fontSize: textSm }}>Delivery to: <span className="font-semibold">Pincode</span></p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter 6-digit pincode"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="flex-1 border border-[#E0E0E0] rounded-md px-3 py-2 text-[#333]"
                    style={{ fontSize: textBase }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md border border-[#6A2E8D] text-[#6A2E8D] font-semibold hover:bg-[#F8F2FC]"
                    style={{ fontSize: textSm }}
                  >
                    Check
                  </button>
                </div>
                <p className="text-[#333]" style={{ fontSize: textSm }}>Delivery by Fri, 7th Jul</p>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: TruckIcon, text: "Free Delivery & Easy Returns" },
                  { icon: CardIcon, text: "Flexible Payment Options" },
                  { icon: VideoIcon, text: "Live Video Calling Available" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 p-3 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA]"
                  >
                    <Icon />
                    <span className="text-[#333]" style={{ fontSize: textXs }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Product details table */}
              <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                <div
                  className="px-4 py-3 border-b border-[#E0E0E0] font-bold text-[#000] uppercase tracking-wide"
                  style={{ fontSize: textSm }}
                >
                  Product Details
                </div>
                <div className="divide-y divide-[#E0E0E0] max-h-[280px] overflow-y-auto">
                  {detailsRows.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center px-4 py-2.5 text-[#333]"
                      style={{ fontSize: textSm }}
                    >
                      <span className="capitalize">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price breakdown (from API) */}
              {p.priceBreakdown && (
                <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                  <div
                    className="px-4 py-3 border-b border-[#E0E0E0] font-bold text-[#000] uppercase tracking-wide"
                    style={{ fontSize: textSm }}
                  >
                    Price Breakdown
                  </div>
                  <div className="divide-y divide-[#E0E0E0]">
                    {[
                      { label: "Gold weight", value: p.priceBreakdown.goldWeight != null ? `${p.priceBreakdown.goldWeight} g` : null },
                      { label: "Gold rate", value: p.priceBreakdown.goldRate != null ? formatPrice(p.priceBreakdown.goldRate) : null },
                      { label: "Gold amount", value: p.priceBreakdown.goldAmount != null ? formatPrice(p.priceBreakdown.goldAmount) : null },
                      { label: "Diamond weight", value: p.priceBreakdown.diamondWeight != null ? `${p.priceBreakdown.diamondWeight} g` : null },
                      { label: "Diamond amount", value: p.priceBreakdown.diamondAmount != null ? formatPrice(p.priceBreakdown.diamondAmount) : null },
                      { label: "Making charges", value: p.priceBreakdown.makingCharges != null ? formatPrice(p.priceBreakdown.makingCharges) : null },
                      { label: "Variant adjustment", value: p.priceBreakdown.variantAdjustment != null ? formatPrice(p.priceBreakdown.variantAdjustment) : null },
                      { label: "Subtotal", value: p.priceBreakdown.subTotal != null ? formatPrice(p.priceBreakdown.subTotal) : null },
                      { label: "GST rate", value: p.priceBreakdown.gstRate != null ? `${p.priceBreakdown.gstRate}%` : null },
                      { label: "GST amount", value: p.priceBreakdown.gstAmount != null ? formatPrice(p.priceBreakdown.gstAmount) : null },
                      { label: "Final price", value: p.priceBreakdown.finalPrice != null ? formatPrice(p.priceBreakdown.finalPrice) : null },
                    ]
                      .filter((row) => row.value != null)
                      .map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex justify-between items-center px-4 py-2.5 text-[#333]"
                          style={{ fontSize: textSm }}
                        >
                          <span className="capitalize">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Brand / Certified */}
              <div className="flex items-center gap-6">
                <div className="font-bold text-[#333]" style={{ fontSize: textXl }}>TATA</div>
                <div className="flex items-center gap-2 rounded-full bg-[#22c55e] text-white px-3 py-1.5" style={{ fontSize: textXs }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Certified
                </div>
              </div>
            </div>
          </div>

          {/* Promo banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <div
              className="rounded-xl p-6 flex items-center justify-between text-white"
              style={{ backgroundColor: TEAL_BANNER }}
            >
              <div>
                <p className="font-semibold" style={{ fontSize: textLg }}>One Of A Kind Silver Jewellery</p>
                <p className="opacity-90" style={{ fontSize: textSm }}>SHAYA</p>
              </div>
              <button type="button" className="px-4 py-2 rounded-lg bg-white/20 font-semibold hover:bg-white/30" style={{ fontSize: textSm }}>Buy Now</button>
            </div>
            <div
              className="rounded-xl p-6 flex items-center justify-between text-white"
              style={{ backgroundColor: ORANGE_BANNER }}
            >
              <div>
                <p className="font-semibold" style={{ fontSize: textLg }}>Natural Diamond in 925 Silver</p>
                <p className="opacity-90" style={{ fontSize: textSm }}>SHAYA</p>
              </div>
              <button type="button" className="px-4 py-2 rounded-lg bg-white/20 font-semibold hover:bg-white/30" style={{ fontSize: textSm }}>Buy Now</button>
            </div>
          </div>

          {/* Rate Us */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="py-3 px-8 rounded-lg text-white font-semibold hover:opacity-90"
              style={{ backgroundColor: ACCENT, fontSize: textSm }}
            >
              Rate Us
            </button>
          </div>

          {/* You may also Like */}
          <section className="mt-12">
            <h2 className="font-bold text-[#000] mb-6" style={{ fontSize: textXl }}>You may also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {YOU_MAY_LIKE.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white rounded-lg border border-[#E0E0E0] overflow-hidden text-left hover:border-[#6A2E8D] transition-colors"
                >
                  <div className="relative aspect-square bg-[#F5F0F8]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-[#6A2E8D]">
                      <HeartOutline />
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-[#333] truncate" style={{ fontSize: textSm }}>{item.name}</p>
                    <p className="font-bold text-[#4E0756]" style={{ fontSize: textBase }}>{item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Store locator */}
          <section className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl border border-[#E0E0E0] overflow-hidden bg-[#FAFAFA]">
            <div className="min-h-[280px] bg-[#E5E7EB] flex items-center justify-center">
              <div className="text-center text-[#666]" style={{ fontSize: textSm }}>
                Map placeholder – store locations
              </div>
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <h3 className="font-bold text-[#000] mb-2" style={{ fontSize: textXl }}>Find a Store near you</h3>
              <p className="text-[#666] mb-4" style={{ fontSize: textSm }}>Enter your Pin-code or city to find stores nearby</p>
              <input
                type="text"
                placeholder="Pincode or City"
                className="w-full border border-[#E0E0E0] rounded-md px-4 py-3 mb-4 text-[#333] bg-white"
                style={{ fontSize: textBase }}
              />
              <button
                type="button"
                className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ACCENT, fontSize: textSm }}
              >
                EXPLORE ALL STORES
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
