import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const SIDEBAR_BG = "#F8F8FA";
const BANNER_BG = "#58004C";

// Order: left column then right column (Rings, Earrings = row1; Bracelets, Solitaires = row2; …)
const CATEGORIES = [
  { name: "Rings", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&h=120&fit=crop" },
  { name: "Earrings", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=120&h=120&fit=crop" },
  { name: "Bracelets & Bangles", img: "https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=120&h=120&fit=crop" },
  { name: "Solitaires", img: "https://images.unsplash.com/photo-1628926379972-9843ad139a8c?w=120&h=120&fit=crop" },
  { name: "Mangalsutras", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=120&h=120&fit=crop" },
  { name: "Necklaces & Pendants", img: "https://images.unsplash.com/photo-1573408301185-6d9972e454c1?w=120&h=120&fit=crop" },
  { name: "Men's Designs", img: "https://images.unsplash.com/photo-1617038260897-491c4c140c27?w=120&h=120&fit=crop" },
  { name: "Kid's Designs", img: "https://images.unsplash.com/photo-1596944923788-bc0c2f2d3760?w=120&h=120&fit=crop" },
  { name: "Silver by Shaya", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=120&h=120&fit=crop" },
  { name: "Gifting", img: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=120&h=120&fit=crop" },
];

const PROMO_BANNERS = [
  {
    title: "EVERYDAY 22KT",
    subtitle: "FOR THE MODERN WOMAN",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=160&h=120&fit=crop",
  },
  {
    title: "WE ♥ YOU WIN",
    subtitle: "",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=160&h=120&fit=crop",
  },
];

const FEATURED = [
  { label: "Best Sellers", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=120&fit=crop" },
  { label: "Latest", img: "https://images.unsplash.com/photo-1628926379972-9843ad139a8c?w=200&h=120&fit=crop" },
  { label: "Trending", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=120&fit=crop" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = React.useRef(null);

  const syncCarouselIndex = () => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.querySelector(".shrink-0")?.offsetWidth ?? 0;
    const gap = 16;
    if (cardWidth) setCarouselIndex(Math.round(scrollLeft / (cardWidth + gap)));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <aside
      className={`fixed left-0 top-[52px] bottom-0 z-[48] w-full flex flex-col shadow-xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      style={{ backgroundColor: SIDEBAR_BG }}
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
    >
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-5 pt-6 pb-8">
        {/* Category grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              to={`/jewellery?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-row items-center gap-3 rounded-xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
              onClick={onClose}
            >
              <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <img src={cat.img} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-semibold text-gray-800 truncate">{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* More Jewellery */}
        <Link
          to="/jewellery"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white py-4 px-5 shadow-md transition-shadow hover:shadow-lg w-full"
          onClick={onClose}
        >
          <span className="text-base font-semibold text-gray-800">More Jewellery</span>
          <IoChevronForward className="w-5 h-5 text-gray-800 shrink-0" />
        </Link>

        {/* Promo carousel */}
        <div className="mt-8">
          <div
            ref={carouselRef}
            onScroll={syncCarouselIndex}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-5 px-5"
          >
            {PROMO_BANNERS.map((banner, i) => (
              <div
                key={i}
                className="shrink-0 w-[85%] max-w-[280px] snap-center rounded-xl overflow-hidden"
                style={{ backgroundColor: BANNER_BG }}
              >
                <div className="flex items-center justify-between p-5 min-h-[100px]">
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-lg font-bold tracking-wide ${i === 0 ? "text-[#fbbf24]" : "text-white"}`}>
                      {banner.title}
                    </span>
                    {banner.subtitle && (
                      <span className="text-xs font-medium text-white/90">{banner.subtitle}</span>
                    )}
                  </div>
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                    <img src={banner.img} alt="" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="rounded-md bg-gray-800 px-2 py-0.5 text-xs font-medium text-white">
              {carouselIndex + 1}/{PROMO_BANNERS.length}
            </span>
            <div className="flex gap-1">
              {PROMO_BANNERS.map((_, i) => (
                <span
                  key={i}
                  className={`block w-2 h-2 rounded-full ${i === carouselIndex ? "bg-gray-800" : "bg-gray-300"}`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>

        {/* Featured: Best Sellers, Latest, Trending */}
        <div className="mt-8 space-y-4">
          {FEATURED.map((item) => (
            <Link
              key={item.label}
              to={`/jewellery?filter=${encodeURIComponent(item.label.toLowerCase())}`}
              className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg w-full"
              onClick={onClose}
            >
              <span className="text-base font-semibold text-gray-800">{item.label}</span>
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img src={item.img} alt="" className="w-full h-full object-cover" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
