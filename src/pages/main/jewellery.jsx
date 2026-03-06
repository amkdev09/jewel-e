import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
const ring = "https://images.unsplash.com/photo-1628926379972-9843ad139a8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
/* Pixel-perfect Jewellery listing page — exact clone of design. */

const ICON = ({ d, className = "", viewBox = "0 0 24 24", fill = "none", stroke = "currentColor" }) => (
  <svg className={className} fill={fill} stroke={stroke} strokeWidth={fill === "currentColor" ? 0 : 2} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const SearchIcon = () => <ICON d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
const HeartIcon = () => <ICON d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />;
const HeartOutlineIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const CompareIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
    <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
  </svg>
);
const VideoCameraIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const BagIcon = () => <ICON d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />;
const UserIcon = () => <ICON d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
const TrackIcon = () => <ICON d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />;
const StoreIcon = () => <ICON d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />;
const ContactIcon = () => <ICON d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
const ChevronDownIcon = () => <ICON d="M19 9l-7 7-7-7" />;
const ArrowUpIcon = () => <ICON d="M5 10l7-7m0 0l7 7m-7-7v18" />;

const TOP_LINKS_LEFT = ["Jewellery", "Apparels", "Home & living", "Gifts"];
const TOP_LINKS_RIGHT = [
  { icon: TrackIcon, label: "Track Order" },
  { icon: StoreIcon, label: "Store Locator" },
  { icon: ContactIcon, label: "Contact Us" },
];
const CATEGORIES = [
  "Wedding Jewellery", "Necklaces", "Earrings", "Rings", "Bracelets & Bangles",
  "Pendants", "Nosepins", "Chains", "Mangalsutra", "Kids Jewellery", "Gifts",
];
const FILTER_SECTIONS = [
  { title: "Product Type", items: ["Bracelets", "Bangles", "Kada", "Other"], count: 234 },
  { title: "Price", isRange: true, range: "₹0 - ₹10,000" },
  { title: "Purity", items: ["22K", "18K", "14K"] },
  { title: "Weight Approx.", isRange: true },
  { title: "Gender", items: ["Women", "Men", "Unisex"] },
  { title: "Collection", items: ["Collection A", "Collection B"] },
  { title: "Occasion", items: ["Casual", "Wedding", "Party"] },
  { title: "Material", items: ["Gold", "Silver", "Diamond"] },
  { title: "Color", items: ["Yellow", "Rose", "White"] },
  { title: "Stone", items: ["Diamond", "Pearl", "Emerald"] },
  { title: "Availability", items: ["In Stock"] },
  { title: "Offers", items: ["On Sale"] },
];

const MOCK_PRODUCTS = [
  { name: "Tisya Diamond Gemstone Pendant Necklace", price: "₹78,365", original: "₹83,654", save: "₹ 3,000", exclusive: true, badge: "NEW", image: ring },
  { name: "Soul Bliss Gemstone Pendant Necklace", price: "₹65,420", original: "₹72,000", save: null, exclusive: false, badge: null, image: ring },
  { name: "Lush Petals Gemstone Necklace", price: "₹91,200", original: "₹98,500", save: null, exclusive: true, badge: null, image: ring },
  { name: "Victoria Pearl Pendant Necklace", price: "₹44,990", original: null, save: null, exclusive: false, badge: "NEW", image: ring },
  { name: "Floral Gold Plated Bracelet", price: "₹ 21,999", original: "₹ 25,000", save: "₹ 3,000", exclusive: true, badge: "NEW", image: ring },
  { name: "Classic Gold Bangle Set", price: "₹ 18,500", original: null, save: null, exclusive: false, badge: null, image: ring },
  { name: "Designer Kada Bracelet", price: "₹ 32,000", original: "₹ 35,000", save: "₹ 3,000", exclusive: true, badge: null, image: ring },
  { name: "Elegant Pearl Bracelet", price: "₹ 14,999", original: null, save: null, exclusive: false, badge: "NEW", image: ring },
  { name: "Artistic Gold Bracelet", price: "₹ 27,500", original: "₹ 30,000", save: "₹ 2,500", exclusive: false, badge: null, image: ring },
  { name: "Traditional Bangle Pair", price: "₹ 22,000", original: null, save: null, exclusive: true, badge: null, image: ring },
  { name: "Contemporary Cuff Bracelet", price: "₹ 19,999", original: "₹ 24,000", save: "₹ 4,001", exclusive: false, badge: "NEW", image: ring },
  { name: "Minimalist Gold Bracelet", price: "₹ 16,500", original: null, save: null, exclusive: false, badge: null, image: ring },
  { name: "Statement Gold Bracelet", price: "₹ 45,000", original: "₹ 50,000", save: "₹ 5,000", exclusive: true, badge: null, image: ring },
  { name: "Pearl & Gold Bracelet", price: "₹ 28,750", original: null, save: null, exclusive: false, badge: "NEW", image: ring },
  { name: "Tennis Bracelet Style", price: "₹ 38,000", original: "₹ 42,000", save: "₹ 4,000", exclusive: false, badge: null, image: ring },
  { name: "Oxidised Silver Bracelet", price: "₹ 12,999", original: null, save: null, exclusive: true, badge: null, image: ring },
  { name: "Bridal Gold Bracelet", price: "₹ 52,000", original: "₹ 58,000", save: "₹ 6,000", exclusive: false, badge: "NEW", image: ring },
  { name: "Diamond Line Bracelet", price: "₹ 65,000", original: null, save: null, exclusive: true, badge: null, image: ring },
  { name: "Rose Gold Bangle", price: "₹ 24,500", original: "₹ 27,000", save: "₹ 2,500", exclusive: false, badge: null, image: ring },
  { name: "Kids Charm Bracelet", price: "₹ 8,999", original: null, save: null, exclusive: false, badge: "NEW", image: ring },
  { name: "Antique Finish Bracelet", price: "₹ 31,000", original: "₹ 34,000", save: "₹ 3,000", exclusive: true, badge: null, image: ring },
  { name: "Chain Link Bracelet", price: "₹ 15,750", original: null, save: null, exclusive: false, badge: null, image: ring },
  { name: "Gemstone Bracelet", price: "₹ 29,999", original: "₹ 33,000", save: "₹ 3,001", exclusive: false, badge: "NEW", image: ring },
  { name: "Twisted Gold Bracelet", price: "₹ 20,250", original: null, save: null, exclusive: true, badge: null, image: ring },
];

const FOOTER_COLUMNS = [
  { heading: "SHOP BY", links: ["Jewellery", "Apparels", "Home & living", "Gifts"] },
  { heading: "ABOUT US", links: ["Our Story", "Careers", "Press"] },
  { heading: "CUSTOMER SERVICE", links: ["Contact Us", "FAQ", "Shipping", "Returns"] },
  { heading: "Our Stores", links: [], address: "123 Jewellery Lane, City", phone: "+91 98765 43210", email: "hello@corazor.com" },
];

const BreadcrumbBar = () => (
  <div
    className="hidden md:flex items-center justify-between bg-white px-4 md:px-6 lg:px-[35px]"
    style={{
      height: "40px",
      fontSize: "14px",
      color: "#333333",
      fontWeight: 400,
    }}
  >
    <span>Home / Jewellery</span>
    <span className="font-bold" style={{ color: "#6A2E8D", fontSize: "16px" }}>Bracelets & Bangles</span>
  </div>
);

const MobileFilterBar = () => (
  <div className="md:hidden sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E0E0E0]">
    <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded border border-[#E0E0E0] text-[#333333] text-sm font-medium">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      Filter
    </button>
    <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded border border-[#E0E0E0] text-[#333333] text-sm font-medium">
      Sort by: Recommended
      <MdKeyboardArrowDown style={{ fontSize: 16 }} />
    </button>
  </div>
);

const FilterSidebar = () => (
  <aside
    className="hidden md:flex flex-col flex-shrink-0 bg-white border-r border-[#E0E0E0] overflow-y-auto"
    style={{ width: "250px", padding: "20px 0" }}
  >
    <div className="flex items-center justify-between px-4 mb-5" style={{ paddingBottom: "8px" }}>
      <span className="font-bold text-[#333333]" style={{ fontSize: "16px" }}>Filter By</span>
      <button type="button" className="text-[#B069D6] hover:underline" style={{ fontSize: "12px" }}>Clear All</button>
    </div>
    {FILTER_SECTIONS.map((section) => (
      <div key={section.title} className="border-b border-[#E0E0E0] px-4" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
        <p className="text-[#333333] font-normal mb-2" style={{ fontSize: "14px" }}>{section.title}</p>
        {section.isRange ? (
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <input type="text" placeholder="Min." className="w-full border border-[#E0E0E0] rounded-[3px] px-2 py-1.5 text-[#333333]" style={{ fontSize: "12px" }} />
              <input type="text" placeholder="Max." className="w-full border border-[#E0E0E0] rounded-[3px] px-2 py-1.5 text-[#333333]" style={{ fontSize: "12px" }} />
            </div>
            {section.range && <p className="text-[#333333]" style={{ fontSize: "12px" }}>{section.range}</p>}
            <div className="h-2 bg-[#E0E0E0] rounded-full relative" style={{ backgroundColor: "#E0E0E0" }}>
              <div className="absolute inset-y-0 left-0 w-1/2 bg-[#6A2E8D] rounded-full" />
              <span className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-[#6A2E8D] border-2 border-white shadow" style={{ left: "0%" }} />
              <span className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#6A2E8D] border-2 border-white shadow" style={{ left: "50%" }} />
            </div>
          </div>
        ) : (
          <ul className="space-y-2" style={{ marginTop: "8px" }}>
            {(section.items || []).slice(0, 5).map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <input type="checkbox" id={`${section.title}-${i}`} className="rounded border-[#E0E0E0] text-[#6A2E8D]" />
                <label htmlFor={`${section.title}-${i}`} className="text-[#333333] cursor-pointer" style={{ fontSize: "14px" }}>{item}{section.count && i === 0 ? ` (${section.count})` : ""}</label>
              </li>
            ))}
            {section.items && section.items.length > 4 && (
              <li><button type="button" className="text-[#B069D6] hover:underline" style={{ fontSize: "12px" }}>View All</button></li>
            )}
          </ul>
        )}
      </div>
    ))}
  </aside>
);

const ProductCard = ({ product }) => (
  <div className="bg-white flex flex-col rounded-lg overflow-hidden">
    <div className="relative aspect-square bg-[#F5F0F8] overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
      {product.badge && (
        <span className="absolute top-2 left-2 font-bold text-black rounded px-1.5 py-0.5 text-[10px] bg-[#FFD700]">
          {product.badge}
        </span>
      )}
      <button type="button" className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm" aria-label="Add to wishlist">
        <HeartOutlineIcon />
      </button>
      <button type="button" className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-[#6A2E8D]" aria-label="Compare">
        <CompareIcon />
      </button>
    </div>
    <div className="p-3 flex flex-col gap-1">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="font-bold text-[#4E0756] text-base md:text-lg">{product.price}</span>
        {product.original && <span className="text-[#B069D6] line-through text-sm">{product.original}</span>}
      </div>
      <button type="button" className="text-[#B069D6] text-xs font-medium hover:underline w-fit text-left">
        Check Delivery Date
      </button>
      <p className="text-[#333333] text-sm truncate">{product.name}</p>
      <div className="flex items-center gap-2 mt-2 min-w-0">
        <button type="button" className="flex-1 min-w-0 border border-[#B069D6] text-[#6A2E8D] font-semibold text-[10px] sm:text-xs py-2.5 rounded hover:bg-[#F8F2FC] transition-colors">
          <span className="block truncate">TRY AT HOME</span>
        </button>
        <button type="button" className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded border-2 border-emerald-500 text-emerald-600 shrink-0 flex-shrink-0" aria-label="Video call">
          <VideoCameraIcon />
        </button>
      </div>
    </div>
  </div>
);

const CATEGORY_TITLE = "Gemstone Jewellery";
const DESIGN_COUNT = "1383 Designs";

const MobileHeader = () => (
  <div className="md:hidden px-4 py-4 pb-3 border-b border-[#E0E0E0] bg-white">
    <h1 className="text-[#333333] font-semibold text-lg">{CATEGORY_TITLE}</h1>
    <p className="text-[#888888] text-sm mt-0.5">{DESIGN_COUNT}</p>
  </div>
);

const MainContent = () => (
  <div className="flex flex-1 min-h-0 bg-white">
    <FilterSidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <MobileHeader />
      <MobileFilterBar />
      <div className="flex flex-col px-3 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between mb-4 md:mb-5">
          <span className="text-[#333333] text-sm hidden md:block">2345 results</span>
          <div className="hidden md:flex items-center gap-1 text-[#333333] text-sm ml-auto">
            Sort by: Recommended
            <MdKeyboardArrowDown style={{ fontSize: 16 }} />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {MOCK_PRODUCTS.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-3 md:gap-4 mt-6 md:mt-8 mb-8 md:mb-10">
          <button
            type="button"
            className="text-white font-normal hover:opacity-90 transition-opacity rounded-[5px] py-3 px-6 md:py-3 md:px-8 text-sm"
            style={{ backgroundColor: "#6A2E8D" }}
          >
            Load More
          </button>
          <p className="text-[#333333] text-xs md:text-sm text-center px-2">Showing 1-20 of 2345 products</p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-2">
            <span className="flex items-center justify-center rounded-full bg-[#6A2E8D] text-white w-9 h-9 md:w-6 md:h-6 text-xs">1</span>
            <a href="#page2" className="flex items-center justify-center w-9 h-9 md:w-6 md:h-6 text-[#333333] hover:bg-[#F8F2FC] rounded-full text-xs">2</a>
            <a href="#page3" className="flex items-center justify-center w-9 h-9 md:w-6 md:h-6 text-[#333333] hover:bg-[#F8F2FC] rounded-full text-xs">3</a>
            <span className="text-[#333333] px-1 text-xs">...</span>
            <a href="#next" className="flex items-center justify-center w-9 h-9 md:w-6 md:h-6 text-[#333333] hover:bg-[#F8F2FC] rounded-full">
              <ICON d="M9 5l7 7-7 7" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FooterSection = () => (
  <footer
    className="bg-[#F8F2FC] py-8 md:py-12 lg:py-[50px] px-4 md:px-6 lg:px-[35px]"
  >
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
      {FOOTER_COLUMNS.map((col) => (
        <div key={col.heading}>
          <h3 className="font-bold text-[#333333] mb-3" style={{ fontSize: "16px" }}>{col.heading}</h3>
          {col.links && col.links.length > 0 ? (
            <ul className="space-y-2" style={{ fontSize: "14px" }}>
              {col.links.map((link) => (
                <li key={link}><a href={`#${link}`} className="text-[#333333] hover:text-[#6A2E8D]">{link}</a></li>
              ))}
            </ul>
          ) : (
            <div className="text-[#333333]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
              {col.address && <p className="mb-2">{col.address}</p>}
              {col.phone && <p className="mb-2 flex items-center gap-2"><span aria-hidden>📞</span>{col.phone}</p>}
              {col.email && <p className="flex items-center gap-2"><span aria-hidden>✉</span>{col.email}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="max-w-[1400px] mx-auto mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-6">
      <div>
        <p className="text-[#333333] mb-1 text-sm">Experience The App</p>
        <p className="text-[#333333] mb-3 text-xs">Download and get flat 10% off</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="bg-[#333333] text-white rounded-lg px-3 py-2 text-xs font-medium">App Store</button>
          <button type="button" className="bg-[#333333] text-white rounded-lg px-3 py-2 text-xs font-medium">Google Play</button>
        </div>
      </div>
      <div>
        <p className="text-[#333333] mb-2 text-sm">Connect With Us</p>
        <div className="flex flex-wrap gap-2">
          {["Facebook", "Instagram", "Twitter", "YouTube", "Pinterest"].map((name) => (
            <a key={name} href={`#${name}`} className="w-8 h-8 rounded-full bg-[#E8D5F2] flex items-center justify-center text-[#6A2E8D] hover:opacity-80" aria-label={name}>
              <span className="text-xs font-bold">{name[0]}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto mt-6 md:mt-8 pt-4 md:pt-6 border-t border-[#E0E0E0] flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 md:gap-4">
      <div className="flex gap-3 md:gap-4 flex-wrap justify-center sm:justify-start">
        <span className="text-[#888888] text-xs">Visa</span>
        <span className="text-[#888888] text-xs">Mastercard</span>
        <span className="text-[#888888] text-xs">RuPay</span>
      </div>
      <div className="flex gap-3 md:gap-4 flex-wrap justify-center sm:justify-end">
        <span className="text-[#888888] text-xs">Hallmark</span>
        <span className="text-[#888888] text-xs">IGI</span>
        <span className="text-[#888888] text-xs">SGL</span>
      </div>
    </div>
  </footer>
);

const LegalSection = () => (
  <div
    className="bg-white text-[#888888] py-6 md:py-10 px-4 md:px-6 lg:px-[35px]"
    style={{ fontSize: "10px", lineHeight: 1.6 }}
  >
    <div className="max-w-[900px] mx-auto space-y-4">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p className="text-center mt-6" style={{ fontSize: "12px" }}>© 2026 Corazor. All Rights Reserved.</p>
    </div>
  </div>
);

const ScrollToTopButton = () => (
  <a
    href="#top"
    className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-[#6A2E8D] text-white hover:opacity-90 shadow-lg transition-opacity"
    style={{ width: "44px", height: "44px" }}
    aria-label="Scroll to top"
  >
    <ArrowUpIcon className="w-5 h-5" />
  </a>
);

const Jewellery = () => (
  <div
    id="top"
    className="min-h-screen flex flex-col bg-white text-[#333333] max-w-[100vw] overflow-x-hidden"
    style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
  >
    <BreadcrumbBar />
    <MainContent />
    <FooterSection />
    <LegalSection />
    {/* <ScrollToTopButton /> */}
  </div>
);

export default Jewellery;
