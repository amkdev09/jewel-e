import React from "react";
const ring = "https://images.unsplash.com/photo-1628926379972-9843ad139a8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const ICON = ({ d, className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d={d} />
  </svg>
);

const currentSlide = 1;
const totalSlides = 3;

const promoCurrentSlide = 1;
const promoTotalSlides = 4;

const ChevronLeftIcon = () => <ICON d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />;
const ChevronRightIcon = () => <ICON d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />;

const Hero = () => (
  <section
    className="flex items-center my-8 rounded-[12px] flex-col gap-[24px]"
    style={{ height: "720px" }}
  >
    <div className="relative w-full h-full flex items-center pl-[40px] rounded-[inherit]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 rounded-[inherit] bg-[#4E0756]"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(78,7,86,0.85) 0%, rgba(78,7,86,0.4) 50%, #4E0756 100%), url(https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=1600&q=80)",
        }}
      />
      <div className="relative z-10 max-w-[560px]">
        <p className="text-white" style={{ fontSize: "24px", lineHeight: 1.3, marginBottom: "8px" }}>
          SHOP STUNNING DESIGNS WITH
        </p>
        <p className="font-bold" style={{ fontSize: "72px", lineHeight: 1.1, color: "#FFE082", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          EXTRA ₹500/GM
        </p>
        <p className="text-white" style={{ fontSize: "18px", lineHeight: 1.4 }}>
          ON ALL CUSTOM GOLD JEWELLERY
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {[...Array(totalSlides)].map((_, index) => {
        const slideNumber = index + 1;

        if (slideNumber === currentSlide) {
          return (
            <span
              key={slideNumber}
              className="px-3 py-[4px] rounded-full bg-[#2F2F2F] text-white text-[12px] leading-none font-medium"
            >
              {currentSlide}/{totalSlides}
            </span>
          );
        }

        return (
          <span
            key={slideNumber}
            className="w-2 h-2 rounded-full bg-gray-400 opacity-60"
          />
        );
      })}
    </div>
  </section>
);

const BtnPrimary = ({ children, className = "" }) => (
  <button
    type="button"
    className={`text-white text-sm font-inter-semibold hover:opacity-90 transition-opacity bg-[var(--primary-color-a)] py-4 px-16 rounded-[6px] ${className}`}
  >
    {children}
  </button>
);

const ProductCard = ({ name, price, image }) => (
  <div className="flex flex-col rounded-[6px] overflow-hidden" >
    <div className="aspect-[4/4] bg-[#F5F0F8] relative overflow-hidden rounded-[6px]" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)" }}>
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="p-4 w-[260px] rounded-md">
      <div className="flex items-center gap-2">
        <span className="text-[#4E0756] font-semibold text-lg">
          {price}
        </span>

        <span className="text-gray-500 line-through text-sm">
          ₹7,000
        </span>
      </div>

      <p className="text-gray-600 text-sm mt-1 truncate">
        Gratitude Gold Plated 925 Silver Ring
      </p>
    </div>
  </div>
);

const TrendingSection = () => (
  <section className="flex gap-0 mx-8.75 rounded-[12px] overflow-hidden h-[380px] shadow-lg" style={{ marginTop: "30px" }}>
    <div
      className="relative flex flex-col justify-center pl-[50px] pr-[40px] overflow-hidden"
      style={{ width: "50%", backgroundColor: "#4E0756" }}
    >
      <p className="text-white relative z-10" style={{ fontSize: "22px", marginBottom: "8px" }}>TRENDING DESIGNS</p>
      <p className="text-white font-bold relative z-10" style={{ fontSize: "36px", marginBottom: "20px", lineHeight: 1.2 }}>GET UPTO 40% OFF</p>
      <div className="relative z-10"><BtnPrimary>SHOP NOW</BtnPrimary></div>
      <div className="absolute right-0 bottom-0 w-[45%] h-[85%] flex items-end justify-end pointer-events-none opacity-90 z-0">
        <img src={ring} alt="" className="max-h-full object-contain object-right-bottom" />
      </div>
    </div>
    <div className="py-[50px] pl-[40px] pr-[40px] relative"
      style={{ background: "linear-gradient(180deg, #CFC1FF 0%, #FFFFFF 100%)", width: "50%" }}>
      <div className="grid grid-cols-4 gap-5">
        {["MIRA NACKLACE", "DESIGN TWO", "DESIGN THREE", "DESIGN FOUR"].map((name, i) => (
          <ProductCard
            key={i}
            name={name}
            price="₹ 27,900"
            image={ring}
          />
        ))}
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4E0756] hover:bg-[#F5F0F8] border border-[#F5F0F8]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}><ChevronLeftIcon /></button>
        <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4E0756] hover:bg-[#F5F0F8] border border-[#F5F0F8]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}><ChevronRightIcon /></button>
      </div>
    </div>
  </section>
);

const GuayaSection = () => (
  <section className="flex gap-4 rounded-[12px] overflow-hidden h-[880px] shadow-lg" style={{ marginTop: "30px" }}>
    <div
      className="relative flex items-end justify-start overflow-hidden rounded-[12px] flex-1 min-h-0"
    >
      <img src={ring} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative z-10 pl-[50px] pb-[50px]">
        <p className="text-white font-normal" style={{ fontSize: "70px", lineHeight: 1.1, fontFamily: "Great Vibes, cursive" }}>GUAYA</p>
        <p className="text-white" style={{ fontSize: "36px", fontFamily: "Great Vibes, cursive" }}>Gulabo</p>
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="relative flex flex-col justify-center items-start pl-[40px] overflow-hidden rounded-[12px] flex-1 min-h-0" style={{ backgroundColor: "#7EB5C6" }}>
        <img src={ring} alt="" className="absolute right-0 bottom-0 w-48 h-full object-cover object-right opacity-80" />
        <p className="text-white font-semibold relative z-10" style={{ fontSize: "44px", letterSpacing: "0.02em" }}>LATEST</p>
        <p className="text-white relative z-10" style={{ fontSize: "20px", marginBottom: "16px" }}>DESIGNS</p>
        <BtnPrimary className="relative z-10">SHOP NOW</BtnPrimary>
      </div>
      <div className="relative flex flex-col justify-center items-start pl-[40px] overflow-hidden rounded-[12px] flex-1 min-h-0" style={{ backgroundColor: "#2C2C2C" }}>
        <img src={ring} alt="" className="absolute right-0 bottom-0 w-48 h-full object-cover object-right opacity-70" />
        <p className="text-white relative z-10" style={{ fontSize: "22px", marginBottom: "4px" }}>In Season,</p>
        <p className="text-white font-semibold relative z-10" style={{ fontSize: "36px", letterSpacing: "0.02em" }}>PEARL</p>
        <BtnPrimary className="relative z-10 mt-2">SHOP NOW</BtnPrimary>
      </div>
    </div>
  </section>
);

const GiftIcon = () => (
  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#8B7B9E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="#E8E0F0" opacity="0.9" />
  </svg>
);

const CATEGORY_CARDS = [
  { label: "COUPLE RINGS", image: ring },
  { label: "HEART PENDANTS", image: ring },
  { label: "ROSE GOLD EARRINGS FOR HER", image: ring },
  { label: "GIFTS UNDER 15K", image: ring },
  { label: "EVIL EYE DESIGNS", image: ring },
  { label: "GOLD CHAINS FOR HIM", image: ring },
];

const CategoryRow = () => (
  <section
    className="flex gap-5 mx-8.75 py-[50px] overflow-x-auto border-2 border-[#8863FB]/12 rounded-[12px]"
    style={{ marginTop: "70px", paddingLeft: "40px", paddingRight: "40px", backgroundColor: "var(--primary-color-d)" }}
  >
    <div className="flex gap-5 items-center justify-center flex-col w-[20%]">
      <GiftIcon />
      <p
        className="text-center py-3 px-2 text-[#4F3267] font-medium leading-snug min-h-[44px] flex items-center justify-center"
        style={{ fontSize: "12px" }}
      >
        Wrapped with love
      </p>
    </div>
    {CATEGORY_CARDS.map(({ label, icon, image }) => (
      <a
        key={label}
        href="/jewellery"
        className="flex flex-col w-[220px] flex-shrink-0 "
        style={{ height: "280px" }}
      >
        <div
          className="w-full flex-shrink-0 overflow-hidden rounded-t-2xl flex items-center justify-center bg-white rounded-2xl overflow-hidden cursor-pointer transition-shadow hover:shadow-md"
          style={{ height: "70%" }}
        >
          <img src={image} alt="" className="w-full h-full object-contain" />
        </div>
        <p
          className="flex-1 text-center py-4 px-3 text-[#4F3267] font-semibold text-[1rem] uppercase tracking-wide leading-snug flex items-center justify-center"
        >
          {label}
        </p>
      </a>
    ))}
  </section >
);

const GUARANTEE_ITEMS = [
  {
    label: "100% Certified",
    bg: "#E3F2FD",
    border: "#90CAF9",
    iconUrl: "url(https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0) -9px -546px / 340px no-repeat",
  },
  {
    label: "15 Day Exchange",
    bg: "#FCE4EC",
    border: "#F48FB1",
    iconUrl: "url(https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0) -60px -546px / 340px no-repeat",
  },
  {
    label: "Lifetime Exchange",
    bg: "#E8F5E9",
    border: "#81C784",
    iconUrl: "url(https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0) -111px -546px / 340px no-repeat",
  },
  {
    label: "One Year Warranty",
    bg: "#FFF9C4",
    border: "#FFEE58",
    iconUrl: "url(https://assets.cltstatic.com/images/responsive/cart-checkout.png?v1.0) -162px -546px / 340px no-repeat",
  },
];

const GuaranteeStrip = () => (
  <section
    className="flex flex-wrap items-center justify-center gap-x-10 py-6 my-12 -mx-5"
    style={{ backgroundColor: "var(--primary-color-d)" }}
  >
    {GUARANTEE_ITEMS.map(({ label, bg, border, iconUrl }, i) => (
      <div key={label} className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0"
        >
          <span className={`css-109u56e`} style={{ background: iconUrl }} />
        </div>
        <span className="text-[var(--primary-color-a)] text-lg font-inter-semibold whitespace-nowrap">
          {label}
        </span>
      </div>
    ))}
  </section>
);

const GiftEmeraldSection = () => (
  <section className="flex gap-5 min-h-[860px]">
    <div className="flex flex-col justify-center pl-[50px] pr-[40px] relative overflow-hidden w-[50%] bg-[#4E0756] rounded-[12px]">
      <div className="text-4xl mb-4 opacity-80">🎁</div>
      <p className="text-white" style={{ fontSize: "22px", marginBottom: "8px" }}>GIFT A THOUSAND SMILES</p>
      <p className="text-white opacity-90" style={{ fontSize: "14px", lineHeight: 1.5, marginBottom: "20px", maxWidth: "320px" }}>
        Explore our gifting collection for every occasion.
      </p>
      <BtnPrimary>SHOP NOW</BtnPrimary>
    </div>
    <div className="flex flex-col gap-5 w-[50%]">
      <div className="relative flex-1 flex flex-col justify-center items-start pl-[40px] overflow-hidden bg-[#214D3C] rounded-[12px]">
        <p className="text-white font-semibold" style={{ fontSize: "40px", letterSpacing: "0.02em" }}>EMERALD</p>
        <BtnPrimary className="mt-2">SHOP NOW</BtnPrimary>
      </div>
      <div className="relative flex-1 flex flex-col justify-center items-start pl-[40px] bg-[#F5F0F8] rounded-[12px]">
        <p className="text-[#1F1F1F] font-semibold" style={{ fontSize: "28px", letterSpacing: "0.02em" }}>Prebook Gold.</p>
        <BtnPrimary className="mt-2">SHOP NOW</BtnPrimary>
      </div>
    </div>
  </section>
);

const BestSellersSection = () => (
  <section className="bg-white pt-10.5 css-1w2m1a2 -mx-5 mt-8">
    <h2 className="font-inter-semibold text-center text-[var(--primary-color-a)] pb-10.5 text-3xl">CaratLane Collections</h2>
    <div className="px-5">
      <div className="grid grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="aspect-[4/4] bg-[#F5F0F8] rounded-[12px]" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)" }}>
            <img src={ring} className="w-full h-full object-cantain" />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-11.5">
        <BtnPrimary className="px-28">VIEW ALL COLLECTIONS</BtnPrimary>
      </div>
    </div>
  </section>
);

const ThreeBannersRow = () => (
  <section className="flex flex-col gap-5 my-10.5">
    <div className="flex items-center gap-2">
      {[
        { bg: "#E082A8", title: "JEWELLERY FOR KIDS", img: ring },
        { bg: "#4E0756", title: "DIAMOND BRACELETS", img: ring },
        { bg: "#F5F0F8", title: "SOLITAIRES", textDark: true, img: ring },
      ].map((item, i) => (
        <div
          key={i}
          className="flex-1 relative flex flex-col justify-center items-start overflow-hidden rounded-[12px]"
          style={{ minHeight: "320px", backgroundColor: item.bg, paddingLeft: "40px" }}
        >
          <img src={item.img} alt="" className="absolute right-0 bottom-0 w-1/2 h-full object-cover object-right opacity-80" />
          <p className={`relative z-10 font-semibold ${item.textDark ? "text-[#1F1F1F]" : "text-white"}`} style={{ fontSize: "22px", marginBottom: "16px" }}>{item.title}</p>
          <BtnPrimary className="relative z-10">SHOP NOW</BtnPrimary>
        </div>
      ))}
    </div>
    <div className="flex-1 flex items-center justify-center gap-2">
      {[...Array(totalSlides)].map((_, index) => {
        const slideNumber = index + 1;

        if (slideNumber === currentSlide) {
          return (
            <span
              key={slideNumber}
              className="px-3 py-[4px] rounded-full bg-[#2F2F2F] text-white text-[12px] leading-none font-medium"
            >
              {currentSlide}/{totalSlides}
            </span>
          );
        }

        return (
          <span
            key={slideNumber}
            className="w-2 h-2 rounded-full bg-gray-400 opacity-60"
          />
        );
      })}
    </div>
  </section>
);

const OffersCarouselRow = () => (
  <section className="mt-10.5 px-5">
    <div className="bg-transparent rounded-[18px]">
      <div className="flex gap-5">
        {[
          {
            label: "ONE OF A KIND",
            title: "Silver Jewellery",
            subtitle: "",
            brand: "SHAYA",
            button: "Shop Now",
            note: "Terms & Conditions apply.",
            gradient: "linear-gradient(90deg, #C868FF 0%, #FF7AD9 50%, #FFB36B 100%)",
          },
          {
            label: "GOLD EXCHANGE PROGRAM",
            title: "Enjoy 0% Deduction on your exchange value",
            subtitle: "",
            brand: "",
            button: "Calculate Your Gold Value",
            note: "Terms & Conditions apply.",
            gradient: "linear-gradient(90deg, #E7C57E 0%, #D4AF6A 100%)",
          },
          {
            label: "INVEST WITH E-GOLD",
            title: "Now you can invest & redeem anytime",
            subtitle: "",
            brand: "",
            button: "Buy Digital Gold",
            note: "Terms & Conditions apply.",
            gradient: "linear-gradient(90deg, #9AD96C 0%, #5BAF45 100%)",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-1 rounded-[18px] overflow-hidden text-white"
            style={{ background: item.gradient, minHeight: "170px" }}
          >
            <div className="h-full px-8 py-6 flex flex-col justify-between">
              <div>
                <p
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-90"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {item.label}
                </p>
                <h3 className="mt-2 font-semibold" style={{ fontSize: "22px", lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="mt-1 text-sm opacity-95">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  className="bg-white text-[#3d3d3d] font-medium rounded-[999px] px-5 py-2 text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
                >
                  {item.button}
                </button>
                {item.brand && (
                  <span className="ml-auto text-lg font-semibold tracking-[0.18em] uppercase opacity-90">
                    {item.brand}
                  </span>
                )}
              </div>
              {item.note && (
                <p className="mt-3 text-[11px] opacity-80">
                  {item.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2">
          {[...Array(promoTotalSlides)].map((_, index) => {
            const slideNumber = index + 1;

            if (slideNumber === promoCurrentSlide) {
              return (
                <span
                  key={slideNumber}
                  className="px-3 py-[4px] rounded-full bg-[#2F2F2F] text-white text-[12px] leading-none font-medium"
                >
                  {promoCurrentSlide}/{promoTotalSlides}
                </span>
              );
            }

            return (
              <span
                key={slideNumber}
                className="w-2 h-2 rounded-full bg-gray-400 opacity-60"
              />
            );
          })}
        </div>
        <div className="flex items-center gap-3 pr-2">
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#4E0756] text-white flex items-center justify-center hover:bg-[#3a0542] transition-colors"
            aria-label="Previous banner"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#4E0756] text-white flex items-center justify-center hover:bg-[#3a0542] transition-colors"
            aria-label="Next banner"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  </section>
);

const JourneySection = () => (
  <section className="bg-white mx-8.75">
    <div className="max-h-[860px]">
      <div className="flex gap-0">
        <div className="w-[50%] aspect-[4/3] rounded-[12px_0_0_12px] overflow-hidden bg-[#F5F0F8]">
          <img src={ring} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center bg-[#F8EFEA] rounded-[0_12px_12px_0] p-8 md:p-10">
          <h3 className="text-center font-medium text-[#3d3d3d] mb-6" style={{ fontSize: "18px", lineHeight: 1.4 }}>
            Find your favorite designs at a Store Nearby
          </h3>
          <div className="flex items-center gap-2 max-w-md mx-auto w-full mb-5">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-[8px] border border-[#e8dcd5] px-3 py-2.5">
              <svg className="w-4 h-4 text-[#8c7369] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="Enter Pincode or City"
                className="flex-1 min-w-0 bg-transparent text-[#333] placeholder:text-[#9a8f88] outline-none"
                style={{ fontSize: "14px" }}
              />
            </div>
            <button type="button" className="text-[#c96d6d] font-semibold hover:underline whitespace-nowrap" style={{ fontSize: "13px" }}>
              CHANGE
            </button>
          </div>
          <div className="flex items-center gap-4 max-w-md mx-auto w-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex flex-col items-center justify-center rounded-[6px] bg-[#c94a4a] text-white flex-shrink-0" style={{ padding: "6px 10px" }}>
                <span className="font-semibold leading-tight" style={{ fontSize: "14px" }}>8.0</span>
                <span className="leading-tight opacity-90" style={{ fontSize: "10px" }}>SM</span>
              </div>
              <div className="min-w-0">
                <p className="text-[#8c7369]" style={{ fontSize: "12px" }}>Nearest Store</p>
                <p className="font-medium text-[#3d3d3d] truncate" style={{ fontSize: "14px" }}>Ghumar Mandi</p>
              </div>
              <svg className="w-4 h-4 text-[#8c7369] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a href="tel:" className="w-9 h-9 rounded-full bg-white border border-[#e8dcd5] flex items-center justify-center text-[#3d3d3d] hover:bg-[#f5ebe6] transition-colors" aria-label="Call store">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white border border-[#e8dcd5] flex items-center justify-center text-[#25D366] hover:bg-[#f5ebe6] transition-colors" aria-label="WhatsApp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-8 pt-10.5">
      {[
        {
          title: "Unsure About What Design to Pick?",
          button: "BOOK A TRIAL AT HOME",
          img: "https://images.unsplash.com/photo-1606964212863-4d2e3c8932b5?w=800&q=80",
        },
        {
          title: "View Designs on Live Video Call",
          button: "SCHEDULE A VIDEO CALL",
          img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="relative rounded-[12px] overflow-hidden bg-[#2a2a2a] min-h-[320px] flex flex-col justify-end"
        >
          <img
            src={item.img}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            aria-hidden
          />
          <div className="relative z-10 p-6 pt-16">
            <h3 className="text-white font-semibold mb-4" style={{ fontSize: "20px", lineHeight: 1.3 }}>
              {item.title}
            </h3>
            <button
              type="button"
              className="bg-[#3d3d3d] text-white font-semibold uppercase tracking-wide hover:bg-[#4a4a4a] transition-colors rounded-[8px] px-5 py-3"
              style={{ fontSize: "13px" }}
            >
              {item.button}
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const GradientBannersRow = () => (
  <section className="mt-[70px] px-[40px]">
    <div className="w-full rounded-[18px] bg-[#EDEBFF] py-8 px-10">
      <div className="flex justify-center gap-8">
        {[
          { count: "480+ Designs", title: "Floral Jewellery Designs" },
          { count: "24+ Designs", title: "Evil Eye Bracelets" },
          { count: "80+ Designs", title: "Jewellery Designs" },
          { count: "100+ Designs", title: "Necklaces-Pendants" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center min-w-[180px]">
            {/* Stacked white cards with image */}
            <div className="relative w-[190px] h-[150px] flex items-center justify-center">
              {/* back card */}
              <div className="absolute inset-x-0 top-3 mx-auto w-[168px] h-[118px] rounded-[18px] bg-[#F1ECFF]" />
              {/* front card */}
              <div className="absolute inset-x-0 top-0 mx-auto w-[180px] h-[126px] rounded-[18px] bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src={ring} alt={item.title} className="max-w-[140px] max-h-[95px] object-contain" />
              </div>
            </div>
            {/* Light purple band with count */}
            <div className="relative z-10 -mt-4 px-5 py-1.5 rounded-[16px] bg-[#C7B5FF] text-[11px] text-[#4E0756] font-medium">
              {item.count}
            </div>
            {/* Dark purple title bar */}
            <button
              type="button"
              className="relative -mt-1 w-full max-w-[210px] bg-[#4E0756] text-white text-[13px] font-semibold rounded-[10px] px-4 py-3 leading-tight hover:bg-[#3a0542] transition-colors"
            >
              {item.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const INSTAGRAM_TILES = [
  { id: 1, className: "col-span-2 row-span-2" },
  { id: 2, className: "col-span-2" },
  { id: 3, className: "col-span-2 row-span-2" },
  { id: 4, className: "col-span-1 row-span-2" },
  { id: 5, className: "col-span-1" },
  { id: 6, className: "col-span-2 row-span-2" },
  { id: 7, className: "col-span-1" },
  { id: 8, className: "col-span-1 row-span-2" },
  { id: 9, className: "col-span-2" },
  { id: 10, className: "col-span-1" },
  { id: 11, className: "col-span-1" },
  { id: 12, className: "col-span-2 row-span-2" },
];

const InstagramSection = () => (
  <section
    className="py-[60px] px-[40px] -mx-5"
    style={{ marginTop: "70px", backgroundColor: "#06001A" }}
  >
    <div className="max-w-[1200px] mx-auto rounded-[24px] overflow-hidden relative bg-[#100020]">
      <div className="grid grid-cols-6 auto-rows-[120px] gap-[14px] p-6">
        {INSTAGRAM_TILES.map((tile) => (
          <div
            key={tile.id}
            className={`relative rounded-[16px] overflow-hidden bg-white/10 ${tile.className}`}
          >
            <img src={ring} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#06001A]/85" />

      <div className="absolute inset-0 flex flex-col items-center text-center px-6">
        <p
          className="text-white/80 mb-3 font-inter-semibold text-4xl"
        >
          CaratLane <span className="exp-italic">Expressions</span>
        </p>
        <h2
          className="font-inter-semibold text-4xl max-w-[690px] leading-snug mb-5 share-jewel"
        >
          Share your #MyCaratLaneStory and win jewellery worth up to ₹15,000
        </h2>
        <button
          type="button"
          className="mt-1 px-5 py-3.5 rounded-[12px] text-[13px] font-semibold tracking-[0.16em] uppercase text-white transition-opacity"
          style={{ background: "linear-gradient(92.56deg, rgb(255, 105, 151) -16.63%, rgb(185, 35, 255) 112.24%)" }}
        >
          SHARE YOUR STORY
        </button>
      </div>
    </div>
  </section>
);

const OpenGiftIcon = () => (
  <svg className="w-[68px] h-[68px] flex-shrink-0" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="26" width="44" height="30" rx="2" fill="#6B2D7A" stroke="#5a2566" strokeWidth="1.5" />
    <path d="M34 26v30M12 41h44" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M34 26L18 42h32L34 26z" fill="#D4AF37" stroke="#b8942e" strokeWidth="1.2" />
    <ellipse cx="34" cy="22" rx="8" ry="4" fill="#D4AF37" stroke="#b8942e" strokeWidth="1" />
    <circle cx="18" cy="18" r="2.5" fill="#FFD700" />
    <circle cx="50" cy="14" r="2" fill="#FFD700" />
    <circle cx="46" cy="22" r="1.5" fill="#FFD700" />
    <circle cx="22" cy="22" r="1.5" fill="#FFD700" />
  </svg>
);

const NewsletterSection = () => (
  <section className="py-10 px-10 rounded-2xl flex mt-10.5" style={{ background: "linear-gradient(rgb(0, 0, 0), rgb(116, 67, 191))" }}>
    <div
      className="max-w-[1000px] mx-auto flex items-center justify-between gap-14"
    >
      <div className="flex items-center gap-5 flex-1 min-w-[280px]">
        <OpenGiftIcon />
        <div>
          <h2 className="text-white text-2xl font-inter-semibold mb-1">
            Join CaratLane Insider
          </h2>
          <p className="text-white font-inter-regular text-base">
            To discover enticing deals, latest arrivals, & more
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 justify-center flex-shrink-0" style={{ minWidth: "320px" }}>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full bg-white text-[#333] placeholder:text-gray-400 outline-none rounded-lg px-4 py-3 font-inter-regular text-sm"
        />
        <button
          type="submit"
          className="w-full text-white font-inter-regular rounded-[12px] py-2 px-4 text-base font-inter-regular bg-[var(--color-pink)]"
        >
          submit
        </button>
        <div className="flex items-center justify-center gap-6 pt-1 mb-6">
          {["Female", "Male", "Other"].map((label, i) => (
            <label key={label} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" defaultChecked={i === 0} className="w-4 h-4 accent-[#9C27B0]" />
              <span className="text-white" style={{ fontSize: "14px" }}>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Home = () => (
  <div className="min-h-screen bg-white text-[#333333]" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
    <main className="px-5">
      <Hero />
      <TrendingSection />
      <GuayaSection />
      <CategoryRow />
      <GuaranteeStrip />
      <OffersCarouselRow />
      <GiftEmeraldSection />
      <BestSellersSection />
      <TrendingSection />
      <ThreeBannersRow />
      <JourneySection />
      <GradientBannersRow />
      <InstagramSection />
      <NewsletterSection />
    </main>
  </div>
);

export default Home;
