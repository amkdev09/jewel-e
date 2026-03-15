import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../../services/productSerive";
import cartService from "../../../services/cartService";
import wishlistService from "../../../services/wishlistService";
import * as reviewService from "../../../services/reviewService";
import useSnackbar from "../../../hooks/useSnackbar";
import useAuth from "../../../hooks/useAuth";
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

function formatReviewDate(isoString) {
  if (!isoString) return "—";
  try {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" });
  } catch {
    return "—";
  }
}

const StarIcon = ({ filled, className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

function StarRating({ value, max = 5, sizeClass = "w-5 h-5", gold }) {
  const v = Math.min(max, Math.max(0, Number(value) || 0));
  return (
    <span className={`inline-flex items-center gap-0.5 ${gold ? "text-amber-500" : ""}`} role="img" aria-label={`${v} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} filled={i < v} className={sizeClass} />
      ))}
    </span>
  );
}

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
  const [reviewsData, setReviewsData] = useState(null);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [myReview, setMyReview] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [editingReviewId, setEditingReviewId] = useState(null);

  const { isLoggedIn } = useAuth();
  const REVIEWS_LIMIT = 5;

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

  const loadReviews = useCallback(async () => {
    if (!id) return;
    setReviewsLoading(true);
    try {
      const res = await reviewService.getReviewsByProduct(id, reviewsPage, REVIEWS_LIMIT);
      if (res?.success && res?.data) setReviewsData(res.data);
    } catch {
      setReviewsData(null);
    } finally {
      setReviewsLoading(false);
    }
  }, [id, reviewsPage]);

  const loadMyReview = useCallback(async () => {
    if (!id) return;
    if (!isLoggedIn) {
      setMyReview(null);
      return;
    }
    try {
      const res = await reviewService.getMyReview(id);
      if (res?.success && res?.data) setMyReview(res.data);
      else setMyReview(null);
    } catch {
      setMyReview(null);
    }
  }, [id, isLoggedIn]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    loadMyReview();
  }, [loadMyReview]);

  const openReviewModal = useCallback((edit = false) => {
    if (edit && myReview) {
      setReviewForm({ rating: myReview.rating ?? 5, comment: myReview.comment ?? "" });
      setEditingReviewId(myReview._id);
    } else {
      setReviewForm({ rating: 5, comment: "" });
      setEditingReviewId(null);
    }
    setReviewModalOpen(true);
  }, [myReview]);

  const closeReviewModal = useCallback(() => {
    setReviewModalOpen(false);
    setEditingReviewId(null);
    setReviewForm({ rating: 5, comment: "" });
  }, []);

  const handleReviewSubmit = useCallback(async () => {
    const { rating, comment } = reviewForm;
    if (!id || rating < 1 || rating > 5) return;
    setReviewSubmitLoading(true);
    try {
      if (editingReviewId) {
        await reviewService.updateReview(editingReviewId, { rating, comment });
        showSnackbar("Review updated successfully.", "success");
      } else {
        await reviewService.createReview({ productId: id, rating, comment });
        showSnackbar("Thank you for your review!", "success");
      }
      closeReviewModal();
      loadReviews();
      loadMyReview();
    } catch (err) {
      const msg = err?.message ?? err?.response?.data?.message ?? "Could not save review.";
      showSnackbar(msg, "error");
    } finally {
      setReviewSubmitLoading(false);
    }
  }, [id, reviewForm, editingReviewId, closeReviewModal, loadReviews, loadMyReview, showSnackbar]);

  const handleDeleteReview = useCallback(async () => {
    if (!editingReviewId) return;
    setReviewSubmitLoading(true);
    try {
      await reviewService.deleteReview(editingReviewId);
      showSnackbar("Review deleted.", "success");
      closeReviewModal();
      setMyReview(null);
      loadReviews();
    } catch (err) {
      const msg = err?.message ?? err?.response?.data?.message ?? "Could not delete review.";
      showSnackbar(msg, "error");
    } finally {
      setReviewSubmitLoading(false);
    }
  }, [editingReviewId, closeReviewModal, loadReviews, showSnackbar]);

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
                  className={`flex-1 min-w-[140px] py-3 px-6 rounded-lg font-semibold transition-opacity flex items-center justify-center gap-2 ${isInStock ? "text-white hover:opacity-90" : "cursor-not-allowed bg-gray-300 text-gray-500"
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

          {/* Customer Reviews */}
          <section className="mt-10 border-t border-[#E0E0E0] pt-8" style={{ fontFamily: fontRegular }}>
            <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
              <div>
                <h2 className="font-bold text-[#333] mb-2" style={{ fontSize: textXl }}>Customer Reviews</h2>
                <div className="flex items-center gap-2 mb-1 text-amber-500">
                  <StarRating value={reviewsData?.averageRating ?? 0} sizeClass="w-6 h-6" gold />
                  <span className="font-semibold text-[#333]" style={{ fontSize: textBase }}>
                    {(reviewsData?.averageRating ?? 0).toFixed(1)}/5
                  </span>
                </div>
                <p className="text-[#666]" style={{ fontSize: textSm }}>
                  Based on {reviewsData?.totalReviews ?? 0} Ratings &amp; Reviews
                </p>
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => openReviewModal(!!myReview)}
                    className="mt-3 py-2.5 px-5 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: ACCENT, fontSize: textSm }}
                  >
                    {myReview ? "EDIT REVIEW" : "WRITE A REVIEW"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate("/login", { state: { from: `/product/${id}` } })}
                    className="mt-3 py-2.5 px-5 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: ACCENT, fontSize: textSm }}
                  >
                    WRITE A REVIEW
                  </button>
                )}
              </div>
              {reviewsData?.ratingDistribution && Object.keys(reviewsData.ratingDistribution).length > 0 && (
                <div className="flex flex-col gap-1.5 min-w-[140px]">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <StarRating value={star} max={5} sizeClass="w-4 h-4" />
                      <span className="text-[#666]" style={{ fontSize: textXs }}>
                        ({reviewsData.ratingDistribution[String(star)] ?? 0})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <h3 className="font-semibold text-[#333] mb-4" style={{ fontSize: textBase }}>
              Customer Reviews{reviewsData?.total != null && reviewsData.total > 0 ? ` : Showing ${reviewsLoading ? "…" : `${(reviewsPage - 1) * REVIEWS_LIMIT + 1} - ${Math.min(reviewsPage * REVIEWS_LIMIT, reviewsData.total)} out of ${reviewsData.total}`}` : ""}
            </h3>

            {reviewsLoading ? (
              <div className="py-8 text-center text-[#888]" style={{ fontSize: textSm }}>Loading reviews…</div>
            ) : !reviewsData?.items?.length ? (
              <div className="py-8 text-center text-[#888]" style={{ fontSize: textSm }}>No reviews yet. Be the first to review!</div>
            ) : (
              <>
                <ul className="space-y-6">
                  {reviewsData.items.map((rev) => (
                    <li key={rev._id} className="bg-[#FAFAFA] rounded-xl p-4 border border-[#E0E0E0]">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E0E0E0] flex items-center justify-center shrink-0 text-[#888]">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-semibold text-[#333]" style={{ fontSize: textSm }}>
                              {rev.userId?.name ?? "Customer"}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[#22c55e] text-xs font-medium">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              VERIFIED PURCHASE
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2 text-amber-500">
                            <StarRating value={rev.rating} sizeClass="w-4 h-4" gold />
                            <span className="text-[#666]" style={{ fontSize: textXs }}>{rev.rating}/5</span>
                            <span className="text-[#888]" style={{ fontSize: textXs }}>{formatReviewDate(rev.createdAt)}</span>
                          </div>
                          {rev.comment ? (
                            <p className="text-[#333]" style={{ fontSize: textSm }}>{rev.comment}</p>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {(reviewsData.totalPages ?? 0) > 1 && (
                  <nav className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Reviews pagination">
                    <button
                      type="button"
                      disabled={reviewsPage <= 1}
                      onClick={() => setReviewsPage(1)}
                      className="py-2 px-3 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                      style={{ color: ACCENT }}
                    >
                      FIRST
                    </button>
                    <button
                      type="button"
                      disabled={reviewsPage <= 1}
                      onClick={() => setReviewsPage((prev) => Math.max(1, prev - 1))}
                      className="p-2 rounded border border-[#E0E0E0] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5]"
                    >
                      <BackArrow />
                    </button>
                    {(() => {
                      const totalP = reviewsData.totalPages ?? 1;
                      const start = Math.max(1, reviewsPage - 2);
                      const end = Math.min(totalP, start + 4);
                      const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
                      return pages.map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setReviewsPage(pageNum)}
                          className="w-9 h-9 rounded-full text-sm font-semibold transition-colors"
                          style={{
                            backgroundColor: reviewsPage === pageNum ? ACCENT : "transparent",
                            color: reviewsPage === pageNum ? "#fff" : "#333",
                          }}
                        >
                          {pageNum}
                        </button>
                      ));
                    })()}
                    <button
                      type="button"
                      disabled={reviewsPage >= (reviewsData.totalPages ?? 1)}
                      onClick={() => setReviewsPage((prev) => prev + 1)}
                      className="p-2 rounded border border-[#E0E0E0] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5] rotate-180"
                    >
                      <BackArrow />
                    </button>
                    <button
                      type="button"
                      disabled={reviewsPage >= (reviewsData.totalPages ?? 1)}
                      onClick={() => setReviewsPage(reviewsData.totalPages ?? 1)}
                      className="py-2 px-3 rounded text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                      style={{ color: ACCENT }}
                    >
                      LAST
                    </button>
                  </nav>
                )}
              </>
            )}
          </section>

          {/* Write / Edit Review Modal */}
          {reviewModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={(e) => e.target === e.currentTarget && closeReviewModal()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-modal-title"
            >
              <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                <h3 id="review-modal-title" className="font-bold text-[#333] mb-4" style={{ fontSize: textLg }}>
                  {editingReviewId ? "Edit your review" : "Write a review"}
                </h3>
                <div className="mb-4">
                  <p className="text-[#666] mb-2" style={{ fontSize: textSm }}>Rating</p>
                  <div className="flex gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                        className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#6A2E8D]"
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      >
                        <StarIcon filled={star <= (reviewForm.rating || 0)} className="w-8 h-8" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="review-comment" className="block text-[#666] mb-2" style={{ fontSize: textSm }}>Comment</label>
                  <textarea
                    id="review-comment"
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full border border-[#E0E0E0] rounded-lg px-3 py-2 text-[#333] resize-none focus:outline-none focus:ring-2 focus:ring-[#6A2E8D] focus:border-transparent"
                    style={{ fontSize: textSm }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleReviewSubmit}
                    disabled={reviewSubmitLoading}
                    className="py-2.5 px-5 rounded-lg text-white font-semibold disabled:opacity-70 transition-opacity"
                    style={{ backgroundColor: ACCENT, fontSize: textSm }}
                  >
                    {reviewSubmitLoading ? <ButtonSpinner className="w-5 h-5 inline" /> : (editingReviewId ? "Update" : "Submit")}
                  </button>
                  {editingReviewId && (
                    <button
                      type="button"
                      onClick={handleDeleteReview}
                      disabled={reviewSubmitLoading}
                      className="py-2.5 px-5 rounded-lg border border-[#dc2626] text-[#dc2626] font-semibold hover:bg-[#dc2626]/5 disabled:opacity-70 transition-opacity"
                      style={{ fontSize: textSm }}
                    >
                      Delete
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeReviewModal}
                    className="py-2.5 px-5 rounded-lg border border-[#E0E0E0] text-[#333] font-semibold hover:bg-[#F5F5F5]"
                    style={{ fontSize: textSm }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

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
