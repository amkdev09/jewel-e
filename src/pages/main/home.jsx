import React from "react";

/* Pixel-perfect Jewel-e homepage clone. Exact px values from design spec. */

const ICON = ({ d, className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d={d} />
  </svg>
);

const SearchIcon = () => <ICON d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />;
const HeartIcon = () => <ICON d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />;
const CartIcon = () => <ICON d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />;
const PersonIcon = () => <ICON d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />;
const ChevronLeftIcon = () => <ICON d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />;
const ChevronRightIcon = () => <ICON d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />;
const ArrowUpIcon = () => <ICON d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />;

const SocialIcons = ({ className = "" }) => (
  <div className={`flex items-center gap-[10px] ${className}`}>
    <a href="#facebook" className="text-white hover:opacity-80 transition-opacity" aria-label="Facebook"><svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
    <a href="#instagram" className="text-white hover:opacity-80 transition-opacity" aria-label="Instagram"><svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
    <a href="#twitter" className="text-white hover:opacity-80 transition-opacity" aria-label="X"><svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
    <a href="#pinterest" className="text-white hover:opacity-80 transition-opacity" aria-label="Pinterest"><svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" /></svg></a>
    <a href="#youtube" className="text-white hover:opacity-80 transition-opacity" aria-label="YouTube"><svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
    <a href="#whatsapp" className="text-white hover:opacity-80 transition-opacity" aria-label="WhatsApp"><svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></a>
  </div>
);

const TopBar = () => (
  <div
    className="flex items-center justify-between text-white"
    style={{
      height: "32px",
      backgroundColor: "#4E0756",
      paddingLeft: "35px",
      paddingRight: "35px",
      fontSize: "12px",
      lineHeight: "1.2",
    }}
  >
    <span>Download our app</span>
    <div className="flex items-center gap-[12px]">
      <SocialIcons />
      <span className="w-px h-3 bg-white/60 shrink-0" aria-hidden />
      <a href="#contact" className="text-white hover:opacity-80 transition-opacity">
        Contact Us
      </a>
    </div>
  </div>
);

const Header = () => (
  <header
    className="sticky top-0 z-50 flex items-center justify-between bg-white"
    style={{
      height: "85px",
      paddingLeft: "35px",
      paddingRight: "35px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  >
    <a href="/" className="text-[22px] font-semibold bg-[linear-gradient(135deg,#4E0756_0%,#8C309B_50%,#FFE082_100%)] bg-clip-text text-transparent">
      Jewel-e
    </a>
    <nav className="flex items-center gap-[34px]" style={{ fontSize: "14px", color: "#333333", fontWeight: 500 }}>
      <a href="#shop" className="hover:text-[#4E0756] transition-colors">Shop</a>
      <a href="#new" className="hover:text-[#4E0756] transition-colors">New Arrivals</a>
      <a href="#bestsellers" className="hover:text-[#4E0756] transition-colors">Best Sellers</a>
      <a href="#offers" className="hover:text-[#4E0756] transition-colors">Offers</a>
      <a href="#prebook" className="hover:text-[#4E0756] transition-colors">Pre-book Gold/Silver</a>
      <a href="#engage" className="hover:text-[#4E0756] transition-colors">Engage with us</a>
    </nav>
    <div className="flex items-center gap-[24px]" style={{ color: "#333333" }}>
      <button type="button" className="p-1 hover:opacity-70 transition-opacity" aria-label="Search"><SearchIcon /></button>
      <button type="button" className="p-1 hover:opacity-70 transition-opacity" aria-label="Wishlist"><HeartIcon /></button>
      <button type="button" className="p-1 hover:opacity-70 transition-opacity" aria-label="Cart"><CartIcon /></button>
      <button type="button" className="p-1 hover:opacity-70 transition-opacity" aria-label="Account"><PersonIcon /></button>
    </div>
  </header>
);

const Hero = () => (
  <section
    className="relative flex items-center bg-[#4E0756]"
    style={{ height: "650px", paddingLeft: "40px" }}
  >
    <div
      className="absolute inset-0 bg-cover bg-center opacity-90"
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(78,7,86,0.85) 0%, rgba(78,7,86,0.4) 50%, transparent 100%), url(https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=1600&q=80)",
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
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="rounded-full bg-white" style={{ width: "8px", height: "8px", opacity: i === 1 ? 1 : 0.5 }} />
      ))}
    </div>
  </section>
);

const BtnPrimary = ({ children, className = "" }) => (
  <button
    type="button"
    className={`text-white font-medium hover:opacity-90 transition-opacity ${className}`}
    style={{
      backgroundColor: "#8C309B",
      padding: "12px 32px",
      borderRadius: "6px",
      fontSize: "14px",
    }}
  >
    {children}
  </button>
);

const ProductCard = ({ name, price, image }) => (
  <div className="flex flex-col bg-white rounded-[6px] overflow-hidden" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)" }}>
    <div className="aspect-[3/4] bg-[#F5F0F8] relative overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="p-4">
      <p className="text-[#333333]" style={{ fontSize: "14px", marginBottom: "6px" }}>{name}</p>
      <p className="font-bold text-[#1F1F1F]" style={{ fontSize: "16px", marginBottom: "12px" }}>{price}</p>
      <BtnPrimary className="w-full py-2 text-center">ADD TO CART</BtnPrimary>
    </div>
  </div>
);

const TrendingSection = () => (
  <section className="flex gap-0" style={{ marginTop: "70px" }}>
    <div
      className="relative flex flex-col justify-center pl-[50px] pr-[40px] overflow-hidden"
      style={{ width: "42%", minHeight: "480px", backgroundColor: "#4E0756" }}
    >
      <p className="text-white relative z-10" style={{ fontSize: "22px", marginBottom: "8px" }}>TRENDING DESIGNS</p>
      <p className="text-white font-bold relative z-10" style={{ fontSize: "36px", marginBottom: "20px", lineHeight: 1.2 }}>GET UPTO 40% OFF</p>
      <div className="relative z-10"><BtnPrimary>SHOP NOW</BtnPrimary></div>
      <div className="absolute right-0 bottom-0 w-[45%] h-[85%] flex items-end justify-end pointer-events-none opacity-90 z-0">
        <img src="https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80" alt="" className="max-h-full object-contain object-right-bottom" />
      </div>
    </div>
    <div className="flex-1 bg-[#F5F0F8] py-[50px] pl-[40px] pr-[40px] relative">
      <div className="grid grid-cols-4 gap-5">
        {["MIRA NACKLACE", "DESIGN TWO", "DESIGN THREE", "DESIGN FOUR"].map((name, i) => (
          <ProductCard
            key={i}
            name={name}
            price="₹ 27,900"
            image="https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80"
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
  <section className="flex gap-0" style={{ marginTop: "70px" }}>
    <div
      className="relative flex items-end justify-start overflow-hidden"
      style={{ width: "50%", minHeight: "520px" }}
    >
      <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="relative z-10 pl-[50px] pb-[50px]">
        <p className="text-white font-normal" style={{ fontSize: "70px", lineHeight: 1.1, fontFamily: "Great Vibes, cursive" }}>GUAYA</p>
        <p className="text-white" style={{ fontSize: "36px", fontFamily: "Great Vibes, cursive" }}>Gulabo</p>
      </div>
    </div>
    <div className="flex-1 flex flex-col gap-0">
      <div className="relative flex flex-col justify-center items-start pl-[40px] overflow-hidden" style={{ minHeight: "260px", backgroundColor: "#7EB5C6" }}>
        <img src="https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80" alt="" className="absolute right-0 bottom-0 w-48 h-full object-cover object-right opacity-80" />
        <p className="text-white font-semibold relative z-10" style={{ fontSize: "44px", letterSpacing: "0.02em" }}>LATEST</p>
        <p className="text-white relative z-10" style={{ fontSize: "20px", marginBottom: "16px" }}>DESIGNS</p>
        <BtnPrimary className="relative z-10">SHOP NOW</BtnPrimary>
      </div>
      <div className="relative flex flex-col justify-center items-start pl-[40px] overflow-hidden" style={{ minHeight: "260px", backgroundColor: "#2C2C2C" }}>
        <img src="https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=400&q=80" alt="" className="absolute right-0 bottom-0 w-48 h-full object-cover object-right opacity-70" />
        <p className="text-white relative z-10" style={{ fontSize: "22px", marginBottom: "4px" }}>In Season,</p>
        <p className="text-white font-semibold relative z-10" style={{ fontSize: "36px", letterSpacing: "0.02em" }}>PEARL</p>
        <BtnPrimary className="relative z-10 mt-2">SHOP NOW</BtnPrimary>
      </div>
    </div>
  </section>
);

const CategoryRow = () => {
  const categories = ["Earrings", "Necklace", "Rings", "Bangles", "Pendant", "Bracelets"];
  return (
    <section className="flex justify-center gap-[40px] py-[50px] bg-white" style={{ marginTop: "70px", paddingLeft: "40px", paddingRight: "40px" }}>
      {categories.map((label) => (
        <div key={label} className="flex flex-col items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-[#F5F0F8] flex items-center justify-center text-[#4E0756] group-hover:bg-[#4E0756] group-hover:text-[#FFE082] transition-colors" style={{ fontSize: "24px" }}>◆</div>
          <span className="text-[#333333]" style={{ fontSize: "14px", fontWeight: 500 }}>{label}</span>
        </div>
      ))}
    </section>
  );
};

const GiftEmeraldSection = () => (
  <section className="flex gap-0" style={{ marginTop: "70px" }}>
    <div
      className="flex flex-col justify-center pl-[50px] pr-[40px] relative overflow-hidden"
      style={{ width: "42%", minHeight: "480px", backgroundColor: "#4E0756" }}
    >
      <div className="text-4xl mb-4 opacity-80">🎁</div>
      <p className="text-white" style={{ fontSize: "22px", marginBottom: "8px" }}>GIFT A THOUSAND SMILES</p>
      <p className="text-white opacity-90" style={{ fontSize: "14px", lineHeight: 1.5, marginBottom: "20px", maxWidth: "320px" }}>
        Explore our gifting collection for every occasion.
      </p>
      <BtnPrimary>SHOP NOW</BtnPrimary>
    </div>
    <div className="flex-1 flex flex-col gap-0">
      <div className="relative flex flex-col justify-center items-start pl-[40px] overflow-hidden" style={{ minHeight: "240px", backgroundColor: "#214D3C" }}>
        <p className="text-white font-semibold" style={{ fontSize: "40px", letterSpacing: "0.02em" }}>EMERALD</p>
        <BtnPrimary className="mt-2">SHOP NOW</BtnPrimary>
      </div>
      <div className="relative flex flex-col justify-center items-start pl-[40px] bg-[#F5F0F8]" style={{ minHeight: "240px" }}>
        <p className="text-[#1F1F1F] font-semibold" style={{ fontSize: "28px", letterSpacing: "0.02em" }}>Prebook Gold.</p>
        <BtnPrimary className="mt-2">SHOP NOW</BtnPrimary>
      </div>
    </div>
  </section>
);

const BestSellersSection = () => (
  <section className="bg-white py-[60px]" style={{ marginTop: "70px", paddingLeft: "40px", paddingRight: "40px" }}>
    <h2 className="text-center font-bold text-[#1F1F1F] mb-10" style={{ fontSize: "28px" }}>BEST SELLERS</h2>
    <div className="max-w-[1400px] mx-auto relative">
      <div className="grid grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <ProductCard
            key={i}
            name={`Best Seller ${i}`}
            price="₹ 24,500"
            image="https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80"
          />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2">
        <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4E0756] border border-gray-200 hover:bg-[#F5F0F8]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}><ChevronLeftIcon /></button>
        <button type="button" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4E0756] border border-gray-200 hover:bg-[#F5F0F8]" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}><ChevronRightIcon /></button>
      </div>
    </div>
  </section>
);

const ThreeBannersRow = () => (
  <section className="flex gap-0" style={{ marginTop: "70px" }}>
    {[
      { bg: "#E082A8", title: "JEWELLERY FOR KIDS", img: "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80" },
      { bg: "#4E0756", title: "DIAMOND BRACELETS", img: "https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=400&q=80" },
      { bg: "#F5F0F8", title: "SOLITAIRES", textDark: true, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex-1 relative flex flex-col justify-center items-start overflow-hidden"
        style={{ minHeight: "320px", backgroundColor: item.bg, paddingLeft: "40px" }}
      >
        <img src={item.img} alt="" className="absolute right-0 bottom-0 w-1/2 h-full object-cover object-right opacity-80" />
        <p className={`relative z-10 font-semibold ${item.textDark ? "text-[#1F1F1F]" : "text-white"}`} style={{ fontSize: "22px", marginBottom: "16px" }}>{item.title}</p>
        <BtnPrimary className="relative z-10">SHOP NOW</BtnPrimary>
      </div>
    ))}
  </section>
);

const JourneySection = () => (
  <section className="bg-white py-[60px]" style={{ marginTop: "70px", paddingLeft: "40px", paddingRight: "40px" }}>
    <h2 className="text-center font-bold text-[#1F1F1F] mb-12" style={{ fontSize: "28px" }}>JOURNEY OF CRAFTSMANSHIP</h2>
    <div className="max-w-[1400px] mx-auto">
      <div className="flex gap-8 mb-8">
        <div className="w-[55%] aspect-[4/3] rounded-[6px] overflow-hidden bg-[#F5F0F8]">
          <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[#333333] mb-4" style={{ fontSize: "15px", lineHeight: 1.6 }}>
            Discover the artistry behind every piece. From concept to creation, our craftsmen bring timeless designs to life.
          </p>
          <button type="button" className="text-[#4E0756] font-semibold underline hover:no-underline" style={{ fontSize: "14px" }}>READ MORE</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {[
          { title: "Our Heritage", img: "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=600&q=80" },
          { title: "The Process", img: "https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=600&q=80" },
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-48 flex-shrink-0 aspect-square rounded-[6px] overflow-hidden bg-[#F5F0F8]">
              <img src={item.img} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-[#1F1F1F] mb-2" style={{ fontSize: "20px" }}>{item.title}</h3>
              <button type="button" className="text-[#4E0756] font-semibold underline hover:no-underline text-left" style={{ fontSize: "14px" }}>READ MORE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const GradientBannersRow = () => (
  <section className="flex gap-0" style={{ marginTop: "70px" }}>
    {[
      { gradient: "linear-gradient(90deg, #32A895 0%, #2a8f80 100%)", title: "ORDER VIA WHATSAPP", sub: "ORDER NOW & GET ₹200 OFF", cta: "READ MORE", icon: "whatsapp" },
      { gradient: "linear-gradient(90deg, #E7C57E 0%, #d4af6a 100%)", title: "GOLD EXCHANGE", sub: "EXCHANGE OLD GOLD FOR NEW", cta: "EXPLORE NOW" },
      { gradient: "linear-gradient(90deg, #E082A8 0%, #c96d92 100%)", title: "LATEST BLOG", sub: "GET INSPIRED BY OUR JEWELLERY BLOGS", cta: "EXPLORE NOW" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex-1 flex flex-col justify-center items-start text-white"
        style={{ minHeight: "220px", background: item.gradient, paddingLeft: "40px", paddingRight: "40px" }}
      >
        <p className="font-semibold" style={{ fontSize: "22px", marginBottom: "6px" }}>{item.title}</p>
        <p className="opacity-95" style={{ fontSize: "14px", marginBottom: "16px" }}>{item.sub}</p>
        <button type="button" className="text-white font-medium border-2 border-white hover:bg-white/20 transition-colors" style={{ padding: "10px 24px", borderRadius: "6px", fontSize: "14px" }}>{item.cta}</button>
      </div>
    ))}
  </section>
);

const InstagramSection = () => (
  <section className="py-[60px] px-[40px]" style={{ marginTop: "70px", backgroundColor: "#4E0756" }}>
    <h2 className="text-center text-white mb-10" style={{ fontSize: "22px", letterSpacing: "0.02em" }}>TAG US #jewele AND GET FEATURED ON OUR INSTAGRAM.</h2>
    <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-[18px]">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="aspect-square rounded-[6px] overflow-hidden bg-white/10">
          <img src="https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80" alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  </section>
);

const NewsletterSection = () => (
  <section
    className="flex flex-wrap items-center justify-between gap-8 py-[50px] px-[40px]"
    style={{ marginTop: "70px", background: "linear-gradient(135deg, #4E0756 0%, #6b0f75 100%)" }}
  >
    <span className="text-white font-semibold" style={{ fontSize: "24px" }}>Jewel-e</span>
    <div className="flex items-center gap-4 flex-1 justify-center flex-wrap">
      <p className="text-white font-medium" style={{ fontSize: "20px" }}>SIGN UP FOR OUR NEWSLETTER</p>
      <div className="flex gap-0">
        <input
          type="email"
          placeholder="Enter your email"
          className="outline-none text-[#333333]"
          style={{ width: "280px", padding: "12px 16px", fontSize: "14px", borderRadius: "6px 0 0 6px" }}
        />
        <button
          type="button"
          className="text-white font-medium"
          style={{ backgroundColor: "#8C309B", padding: "12px 24px", fontSize: "14px", borderRadius: "0 6px 6px 0" }}
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <>
    <footer className="bg-[#F5F0F8] pt-[60px] pb-[60px] px-[40px]" style={{ marginTop: "0" }}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-5 gap-12">
        <div>
          <p className="font-semibold text-[#1F1F1F] mb-4" style={{ fontSize: "18px" }}>Jewel-e</p>
          <p className="text-[#333333] mb-2" style={{ fontSize: "14px", lineHeight: 1.6 }}>123 Jewellery Lane, City</p>
          <p className="text-[#333333] mb-2" style={{ fontSize: "14px" }}>Phone: +91 98765 43210</p>
          <p className="text-[#333333]" style={{ fontSize: "14px" }}>Email: hello@jewele.com</p>
        </div>
        <div>
          <p className="font-bold text-[#1F1F1F] mb-4" style={{ fontSize: "16px" }}>QUICK LINKS</p>
          <ul className="space-y-2">
            {["Shop", "New Arrivals", "Best Sellers", "Offers"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="text-[#333333] hover:text-[#4E0756]" style={{ fontSize: "14px" }}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-[#1F1F1F] mb-4" style={{ fontSize: "16px" }}>POLICIES</p>
          <ul className="space-y-2">
            {["Shipping", "Returns", "Privacy", "Terms"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="text-[#333333] hover:text-[#4E0756]" style={{ fontSize: "14px" }}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-[#1F1F1F] mb-4" style={{ fontSize: "16px" }}>SUPPORT</p>
          <ul className="space-y-2">
            {["FAQ", "Contact Us", "Size Guide"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="text-[#333333] hover:text-[#4E0756]" style={{ fontSize: "14px" }}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-bold text-[#1F1F1F] mb-4" style={{ fontSize: "16px" }}>DOWNLOAD OUR APP</p>
          <div className="flex gap-2 mb-4">
            <div className="w-32 h-10 rounded bg-[#333333] flex items-center justify-center text-white text-xs">Google Play</div>
            <div className="w-32 h-10 rounded bg-[#333333] flex items-center justify-center text-white text-xs">App Store</div>
          </div>
          <div className="flex gap-3">
            <SocialIcons className="text-[#333333] [&_a]:text-[#333333]" />
          </div>
        </div>
      </div>
    </footer>
    <div className="flex items-center justify-between py-[24px] px-[40px] bg-white border-t border-[#F5F0F8]" style={{ fontSize: "13px", color: "#333333" }}>
      <span>© 2026 JEWEL-E. All Rights Reserved.</span>
      <div className="flex gap-4 items-center">
        <span className="text-xs text-[#666]">Visa</span>
        <span className="text-xs text-[#666]">Mastercard</span>
        <span className="text-xs text-[#666]">RuPay</span>
      </div>
    </div>
  </>
);

const LegalFinePrint = () => (
  <div className="bg-white py-[40px] px-[40px]" style={{ fontSize: "12px", lineHeight: 1.6, color: "#333333" }}>
    <div className="max-w-[900px] mx-auto space-y-4">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. All gold and silver jewellery weights are approximate. Images are for representation only. Actual product may vary.
      </p>
    </div>
  </div>
);

const StickySideNav = () => (
  <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 py-2 pr-2">
    <a href="#whatsapp" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 shadow-lg" aria-label="WhatsApp"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /></svg></a>
    <a href="tel:+919876543210" className="w-10 h-10 rounded-full bg-[#4E0756] flex items-center justify-center text-white hover:opacity-90 shadow-lg" aria-label="Phone"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg></a>
    <a href="#" className="w-10 h-10 rounded-full bg-[#4E0756] flex items-center justify-center text-white hover:opacity-90 shadow-lg" aria-label="Back to top"><ArrowUpIcon /></a>
  </div>
);

const Home = () => (
  <div className="min-h-screen bg-white text-[#333333]" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
    <TopBar />
    <Header />
    <main>
      <Hero />
      <TrendingSection />
      <GuayaSection />
      <CategoryRow />
      <GiftEmeraldSection />
      <BestSellersSection />
      <ThreeBannersRow />
      <JourneySection />
      <GradientBannersRow />
      <InstagramSection />
      <NewsletterSection />
      <Footer />
      <LegalFinePrint />
    </main>
    <StickySideNav />
  </div>
);

export default Home;
