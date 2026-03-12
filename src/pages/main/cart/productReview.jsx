import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../../services/productSerive";

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
  const name = raw.name ?? raw.title ?? "Livora Ring";
  const priceNum = raw.price ?? raw.salePrice ?? raw.sellingPrice ?? 1908236;
  const originalNum = raw.originalPrice ?? raw.mrp ?? 1999000;
  const price = formatPrice(priceNum) ?? "₹19,08,236";
  const original = originalNum != null ? formatPrice(originalNum) : "₹19,99,000";
  const discountPct = originalNum > 0 && priceNum < originalNum
    ? Math.round(((originalNum - priceNum) / originalNum) * 100)
    : null;
  const images = Array.isArray(raw.images)
    ? raw.images
    : raw.image
      ? [raw.image]
      : [raw.thumbnail ?? PLACEHOLDER_IMAGE];
  const mainImage = images[0] ?? PLACEHOLDER_IMAGE;
  return {
    id: raw.id ?? raw._id,
    name,
    price,
    original,
    discountPct,
    images,
    mainImage,
    ringSize: raw.ringSize ?? "11-Indian",
    metal: raw.metal ?? "Gold",
    purity: raw.purity ?? "18KT",
    design: raw.design ?? "Traditional",
    grossWeight: raw.grossWeight ?? "7.02 g",
    metalColour: raw.metalColour ?? "Yellow",
    ringSizeValue: raw.ringSizeValue ?? "11",
    collection: raw.collection ?? "—",
    gender: raw.gender ?? "—",
    occasion: raw.occasion ?? "—",
    certificate: raw.certificate ?? "—",
  };
}

const DEMO_PRODUCT = {
  name: "Livora Ring",
  price: "₹19,08,236",
  original: "₹19,99,000",
  discountPct: 5,
  images: [PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE],
  mainImage: PLACEHOLDER_IMAGE,
  ringSize: "11-Indian",
  metal: "Gold",
  purity: "18KT",
  design: "Traditional",
  grossWeight: "7.02 g",
  metalColour: "Yellow",
  ringSizeValue: "11",
  collection: "—",
  gender: "—",
  occasion: "—",
  certificate: "—",
};

const RING_SIZES = ["9-Indian", "10-Indian", "11-Indian", "12-Indian", "13-Indian", "14-Indian"];

const PRODUCT_DETAILS_ROWS = (p) => [
  { label: "Metal", value: p?.metal ?? "Gold" },
  { label: "Purity", value: p?.purity ?? "18KT" },
  { label: "Design", value: p?.design ?? "Traditional" },
  { label: "Gross Weight", value: p?.grossWeight ?? "7.02 g" },
  { label: "Metal Colour", value: p?.metalColour ?? "Yellow" },
  { label: "Ring Size", value: p?.ringSizeValue ?? "11" },
  { label: "Collection", value: p?.collection ?? "—" },
  { label: "Gender", value: p?.gender ?? "—" },
  { label: "Occasion", value: p?.occasion ?? "—" },
  { label: "Certificate", value: p?.certificate ?? "—" },
];

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

export default function ProductReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [ringSize, setRingSize] = useState("");
  const [pincode, setPincode] = useState("");

  const loadProduct = useCallback(async () => {
    if (!id || String(id).startsWith("demo-")) {
      setProduct(DEMO_PRODUCT);
      setRingSize(DEMO_PRODUCT.ringSize);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const raw = await productService.getProductById(id);
      const normalized = normalizeDetailProduct(raw);
      setProduct(normalized ?? DEMO_PRODUCT);
      setRingSize(normalized?.ringSize ?? DEMO_PRODUCT.ringSize);
    } catch (err) {
      setError(err?.message ?? "Failed to load product");
      setProduct(DEMO_PRODUCT);
      setRingSize(DEMO_PRODUCT.ringSize);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const p = product ?? DEMO_PRODUCT;
  const images = p.images?.length ? p.images : [p.mainImage ?? PLACEHOLDER_IMAGE];
  const mainImageUrl = images[selectedImage] ?? images[0] ?? PLACEHOLDER_IMAGE;
  const detailsRows = PRODUCT_DETAILS_ROWS(p);

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: fontRegular }}>
        <p style={{ color: TEXT_MUTED, fontSize: textBase }}>Loading product…</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white text-[#000] max-w-[100vw] overflow-x-hidden"
      style={{ fontFamily: fontRegular }}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB]">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Left: Image gallery — 75% on desktop, full width on small */}
            <div className="space-y-3 lg:col-span-3  w-full">
              <div
                className="aspect-square bg-[#F5F0F8] rounded-lg overflow-hidden border border-[#E0E0E0]"
                style={{ maxHeight: "520px" }}
              >
                <img
                  src={mainImageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 4).map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-md overflow-hidden border-2 bg-[#F5F0F8] ${
                      selectedImage === i ? "border-[#6A2E8D]" : "border-transparent"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details & actions — 25% on desktop, full width on small */}
            <div className="space-y-5 lg:col-span-2 w-full">
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

              {/* Price */}
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
                  {RING_SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="flex-1 min-w-[140px] py-3 px-6 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: ACCENT, fontSize: textSm }}
                >
                  ADD TO CART
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 py-3 px-4 rounded-lg border-2 border-[#6A2E8D] text-[#6A2E8D] font-semibold hover:bg-[#F8F2FC] transition-colors"
                  style={{ fontSize: textSm }}
                >
                  <HeartOutline />
                  ADD TO WISHLIST
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
                      <span>{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

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
