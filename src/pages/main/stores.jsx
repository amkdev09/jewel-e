import React, { useState } from "react";

/* ─── CITY ICONS (inline SVG landmarks) ──────────────────────────────────── */
const cityIcons = {
  Mumbai: (
    <svg viewBox="0 0 80 60" fill="none" stroke="#4E0756" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="54">
      <rect x="6" y="30" width="10" height="22" /><rect x="18" y="22" width="10" height="30" />
      <rect x="30" y="26" width="10" height="26" /><rect x="42" y="18" width="10" height="34" />
      <rect x="54" y="28" width="10" height="24" /><rect x="64" y="32" width="10" height="20" />
      <line x1="2" y1="52" x2="78" y2="52" /><line x1="2" y1="52" x2="2" y2="56" />
      <line x1="78" y1="52" x2="78" y2="56" />
      {/* Gateway arch */}
      <path d="M28 30 Q33 20 38 30" /><line x1="28" y1="30" x2="28" y2="52" /><line x1="38" y1="30" x2="38" y2="52" />
    </svg>
  ),
  Delhi: (
    <svg viewBox="0 0 80 60" fill="none" stroke="#4E0756" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="54">
      {/* India Gate */}
      <rect x="30" y="28" width="20" height="24" />
      <path d="M26 28 Q40 10 54 28" />
      <rect x="22" y="28" width="8" height="24" /><rect x="50" y="28" width="8" height="24" />
      <line x1="10" y1="52" x2="70" y2="52" />
      <rect x="36" y="36" width="8" height="16" />
      <line x1="22" y1="36" x2="58" y2="36" />
    </svg>
  ),
  Bangalore: (
    <svg viewBox="0 0 80 60" fill="none" stroke="#4E0756" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="54">
      {/* Vidhana Soudha */}
      <rect x="10" y="34" width="60" height="18" />
      <rect x="18" y="26" width="44" height="8" />
      <rect x="26" y="18" width="28" height="8" />
      <path d="M34 18 Q40 8 46 18" />
      <rect x="20" y="34" width="8" height="18" /><rect x="52" y="34" width="8" height="18" />
      <rect x="34" y="38" width="12" height="14" />
      <line x1="8" y1="52" x2="72" y2="52" />
    </svg>
  ),
  Pune: (
    <svg viewBox="0 0 80 60" fill="none" stroke="#4E0756" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="54">
      {/* Shaniwar Wada */}
      <rect x="12" y="24" width="56" height="28" />
      <polygon points="12,24 40,8 68,24" />
      <rect x="34" y="36" width="12" height="16" />
      <rect x="14" y="26" width="8" height="10" /><rect x="58" y="26" width="8" height="10" />
      <line x1="8" y1="52" x2="72" y2="52" />
      <line x1="12" y1="24" x2="12" y2="52" /><line x1="68" y1="24" x2="68" y2="52" />
    </svg>
  ),
  Kolkata: (
    <svg viewBox="0 0 80 60" fill="none" stroke="#4E0756" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="54">
      {/* Victoria Memorial */}
      <rect x="14" y="34" width="52" height="18" />
      <path d="M36 34 Q40 22 44 34" /><circle cx="40" cy="20" r="3" />
      <rect x="14" y="30" width="52" height="4" />
      <rect x="18" y="34" width="8" height="18" /><rect x="54" y="34" width="8" height="18" />
      <path d="M26 34 Q29 28 32 34" /><path d="M48 34 Q51 28 54 34" />
      <line x1="8" y1="52" x2="72" y2="52" />
    </svg>
  ),
  Chennai: (
    <svg viewBox="0 0 80 60" fill="none" stroke="#4E0756" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="54">
      {/* Kapaleeshwarar */}
      <rect x="16" y="30" width="48" height="22" />
      <polygon points="16,30 40,6 64,30" />
      <rect x="36" y="38" width="8" height="14" />
      <rect x="18" y="32" width="8" height="10" /><rect x="54" y="32" width="8" height="10" />
      <line x1="30" y1="30" x2="30" y2="52" /><line x1="50" y1="30" x2="50" y2="52" />
      <line x1="8" y1="52" x2="72" y2="52" />
    </svg>
  ),
  Ahmedabad: (
    <svg viewBox="0 0 80 60" fill="none" stroke="#4E0756" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="72" height="54">
      {/* Sabarmati / Minaret */}
      <rect x="20" y="16" width="10" height="36" /><rect x="50" y="16" width="10" height="36" />
      <path d="M20 16 Q25 8 30 16" /><path d="M50 16 Q55 8 60 16" />
      <rect x="30" y="30" width="20" height="22" />
      <path d="M30 30 Q40 22 50 30" />
      <rect x="34" y="38" width="12" height="14" />
      <line x1="8" y1="52" x2="72" y2="52" />
    </svg>
  ),
};

/* ─── STORE HERO ──────────────────────────────────────────────────────────── */
const StoreHero = () => (
  <section
    style={{
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      margin: "16px 0",
    }}
  >
    {/* map background */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: "url(https://api.mapbox.com/styles/v1/mapbox/light-v10/static/72.8777,19.0760,10,0/1400x400?access_token=pk.placeholder)",
      backgroundSize: "cover", backgroundPosition: "center",
      backgroundColor: "#c8d6c8",
    }} />
    {/* actual map-like pattern overlay */}
    <div style={{
      position: "absolute", inset: 0,
      background: `
        repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(255,255,255,0.15) 40px),
        repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(255,255,255,0.15) 40px)
      `,
      backgroundColor: "#3d5a47",
    }} />
    {/* dark tint */}
    <div style={{ position: "absolute", inset: 0, background: "rgba(40,58,46,0.78)" }} />

    <div style={{
      position: "relative", zIndex: 1,
      textAlign: "center",
      padding: "52px 24px 48px",
      color: "#fff",
    }}>
      <h1 style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 600, margin: "0 0 10px" }}>
        Find a store near you
      </h1>
      <p style={{ fontSize: "clamp(0.85rem,2vw,1rem)", color: "rgba(255,255,255,0.85)", margin: "0 0 24px", maxWidth: "480px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
        Find a CaratLane store in your locality, the CaratLane family is growing everyday
      </p>

      {/* search */}
      <div style={{
        maxWidth: "520px", margin: "0 auto",
        background: "#fff", borderRadius: "10px",
        display: "flex", alignItems: "center",
        padding: "10px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
      }}>
        <span style={{ color: "#4E0756", fontSize: "1.1rem", marginRight: "10px", flexShrink: 0 }}>⊙</span>
        <input
          type="text"
          placeholder="Enter Pincode or City"
          style={{ flex: 1, border: "none", outline: "none", fontSize: "0.9rem", color: "#333", background: "transparent" }}
        />
        <button style={{ color: "#9B30C8", fontWeight: 600, fontSize: "0.88rem", border: "none", background: "none", cursor: "pointer", flexShrink: 0 }}>
          Locate Me
        </button>
      </div>
    </div>
  </section>
);

/* ─── POPULAR CITIES ──────────────────────────────────────────────────────── */
const StoreCities = () => {
  const cities = [
    { name: "Mumbai",    stores: "26 Stores" },
    { name: "Delhi",     stores: "25 Stores" },
    { name: "Bangalore", stores: "30 Stores" },
    { name: "Pune",      stores: "11 Stores" },
    { name: "Kolkata",   stores: "17 Stores" },
    { name: "Chennai",   stores: "14 Stores" },
    { name: "Ahmedabad", stores: "7 Stores"  },
  ];

  return (
    <section style={{ padding: "8px 0 16px" }}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "12px",
      }}>
        {cities.map((city) => (
          <div
            key={city.name}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "14px 16px",
              textAlign: "center",
              cursor: "pointer",
              width: "120px",
              transition: "box-shadow 0.18s",
              background: "#fff",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
              {cityIcons[city.name]}
            </div>
            <p style={{ fontWeight: 600, fontSize: "0.82rem", margin: "0 0 2px", color: "#222" }}>{city.name}</p>
            <p style={{ fontSize: "0.7rem", color: "#9ca3af", margin: 0 }}>{city.stores}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── IN-STORE SERVICES ───────────────────────────────────────────────────── */
const StoreServices = () => {
  const services = [
    {
      title: "Old Gold Exchange",
      desc: "It can be any gold jewellery",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    },
    {
      title: "Buy Online, Pick-up in Store",
      desc: "Save time, pickup and go",
      img: "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=800&q=80",
    },
    {
      title: "In-Store Customization",
      desc: "Made-to-order and personalised for you",
      img: "https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=800&q=80",
    },
  ];

  return (
    <section style={{ padding: "8px 0 24px" }}>
      <h2 style={{
        textAlign: "center",
        fontSize: "clamp(1.1rem,3vw,1.6rem)",
        fontWeight: 700,
        color: "#3a005a",
        margin: "0 0 20px",
      }}>
        CaratLane Special In-Store Services
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: "16px",
      }}>
        {services.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <img
              src={s.img}
              alt={s.title}
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                borderRadius: "12px",
                display: "block",
              }}
            />
            <h4 style={{ margin: "10px 0 3px", fontWeight: 600, fontSize: "0.9rem", color: "#222" }}>{s.title}</h4>
            <p style={{ fontSize: "0.78rem", color: "#9ca3af", margin: "0 0 10px" }}>{s.desc}</p>
            <button style={{
              padding: "7px 22px",
              borderRadius: "999px",
              background: "#4E0756",
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}>
              Find Store
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── QUESTIONS / FAQ ─────────────────────────────────────────────────────── */
const StoreQuestions = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    "Is there any difference in prices online and in store?",
    "How will I know if the designs I like are available in a store near me?",
    "Can I exchange my gold jewellery at any CaratLane store?",
    "Is CaratLane jewellery made of real gold and diamonds?",
  ];

  return (
    <section style={{
      background: "#f3f0f7",
      padding: "36px 28px",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
        gap: "40px",
        alignItems: "start",
      }}>

        {/* LEFT */}
        <div>
          <h2 style={{ fontSize: "clamp(1.4rem,4vw,2rem)", fontWeight: 700, color: "#111", margin: "0 0 20px", lineHeight: 1.2 }}>
            Have some Questions?
          </h2>
          <div style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "14px 18px",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}>
            <span style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "#f0e8ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", flexShrink: 0,
            }}>📞</span>
            <div>
              <p style={{ fontSize: "0.78rem", color: "#555", margin: "0 0 2px" }}>Just give us a call at</p>
              <p style={{ fontSize: "0.88rem", color: "#6A3EC7", fontWeight: 600, margin: 0 }}>+91-44-42935000</p>
            </div>
          </div>
        </div>

        {/* RIGHT FAQ */}
        <div style={{ borderTop: "1px solid #d1d5db" }}>
          {faqs.map((q, i) => (
            <div key={i} style={{ borderBottom: "1px solid #d1d5db" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "14px 0",
                  background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "#222" }}>{q}</span>
                <span style={{
                  fontSize: "1.2rem", color: "#6A3EC7", flexShrink: 0, marginLeft: "12px",
                  fontWeight: 300, lineHeight: 1,
                }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <p style={{ fontSize: "0.78rem", color: "#6b7280", margin: "0 0 12px", paddingRight: "24px" }}>
                  Answer content goes here.
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
const Stores = () => (
  <div style={{ minHeight: "100vh", background: "#fff", color: "#333", fontFamily: "inherit" }}>
    <main style={{ padding: "0 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <StoreHero />
      <StoreCities />
      <StoreServices />
    </main>
    {/* Full-width section — outside the constrained container */}
    <div style={{ padding: "0 0px" }}>
      <StoreQuestions />
    </div>
  </div>
);

export default Stores;

// import React from "react";

// /* ================= STORE HERO ================= */

// const StoreHero = () => {
//   return (
//     <section className="relative overflow-hidden rounded-[16px] my-8">

//       {/* background map */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url(https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png)",
//         }}
//       />

//       {/* dark overlay */}
//       <div className="absolute inset-0 bg-[#2f3e46]/80" />

//       <div className="relative z-10 text-center px-6 py-20 text-white">
//         <h1 className="text-3xl md:text-4xl font-semibold mb-4">
//           Find a store near you
//         </h1>

//         <p className="text-lg md:text-xl text-gray-200 mb-10">
//           Find a CaratLane store in your locality, the CaratLane family is growing everyday
//         </p>

//         {/* search box */}
//         <div className="max-w-xl mx-auto bg-white rounded-xl flex items-center px-4 py-3 shadow-lg">

//           <span className="text-[#6A3EC7] mr-3 text-xl">📍</span>

//           <input
//             type="text"
//             placeholder="Enter Pincode or City"
//             className="flex-1 outline-none text-[#333]"
//           />

//           <button className="text-[#C04DD9] font-semibold">
//             Locate Me
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* ================= POPULAR CITIES ================= */

// const StoreCities = () => {
//   const cities = [
//     { name: "Mumbai", stores: "26 Stores" },
//     { name: "Delhi", stores: "25 Stores" },
//     { name: "Bangalore", stores: "30 Stores" },
//     { name: "Pune", stores: "11 Stores" },
//     { name: "Kolkata", stores: "17 Stores" },
//     { name: "Chennai", stores: "14 Stores" },
//     { name: "Ahmedabad", stores: "7 Stores" },
//   ];

//   return (
//     <section className="py-6">
//       <div className="flex flex-wrap justify-center gap-4">
//         {cities.map((city, i) => (
//           <div
//             key={i}
//             className="border rounded-xl px-6 py-4 text-center hover:shadow-md transition cursor-pointer"
//           >
//             <div className="text-2xl mb-2">🏛️</div>
//             <p className="font-medium text-sm">{city.name}</p>
//             <p className="text-xs text-gray-500">{city.stores}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// /* ================= STORE SERVICES ================= */

// const StoreServices = () => {
//   const services = [
//     {
//       title: "Old Gold Exchange",
//       desc: "It can be any gold jewellery",
//       img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
//     },
//     {
//       title: "Buy Online, Pick-up in Store",
//       desc: "Save time, pickup and go",
//       img: "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=600",
//     },
//     {
//       title: "In-Store Customization",
//       desc: "Made-to-order and personalised for you",
//       img: "https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=600",
//     },
//   ];

//   return (
//     <section className="py-12">
//       <h2 className="text-center text-2xl font-semibold text-[#4E0756] mb-10">
//         CaratLane Special In-Store Services
//       </h2>

//       <div className="grid md:grid-cols-3 gap-6">
//         {services.map((s, i) => (
//           <div key={i} className="text-center">
//             <img
//               src={s.img}
//               alt={s.title}
//               className="rounded-xl h-64 w-full object-cover"
//             />
//             <h4 className="mt-4 font-semibold">{s.title}</h4>
//             <p className="text-sm text-gray-500">{s.desc}</p>
//             <button className="mt-2 px-5 py-2 rounded-full bg-[#6A3EC7] text-white text-sm">
//               Find Store
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// /* ================= STORE QUESTIONS ================= */

// const StoreQuestions = () => {
//   const faqs = [
//     "Is there any difference in prices online and in store?",
//     "How will I know if the design I like is available near me?",
//     "Can I exchange my gold jewellery at any CaratLane store?",
//     "Is CaratLane jewellery made of real gold and diamonds?",
//   ];

//   return (
//     <section className="bg-[#faf8fc] py-14 px-6 rounded-xl">
//       <div className="grid md:grid-cols-2 gap-10">

//         {/* LEFT CONTACT */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-6">
//             Have some Questions?
//           </h2>

//           <div className="bg-white p-4 rounded-lg shadow-sm inline-flex items-center gap-3">
//             <span className="text-xl text-[#6A3EC7]">📞</span>
//             <div>
//               <p className="text-sm">Just give us a call at</p>
//               <p className="text-[#6A3EC7] font-medium">
//                 +91-44-42935000
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT FAQ */}
//         <div className="divide-y">
//           {faqs.map((q, i) => (
//             <details key={i} className="py-3 group">
//               <summary className="flex justify-between cursor-pointer text-sm">
//                 {q}
//                 <span className="group-open:rotate-45 transition">+</span>
//               </summary>
//               <p className="text-sm text-gray-600 mt-2">
//                 Answer content goes here.
//               </p>
//             </details>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// /* ================= STORE PAGE ================= */

// const Stores = () => {
//   return (
//     <div className="min-h-screen bg-white text-[#333]">
//       <main className="px-5 space-y-8">

//         <StoreHero />

//         <StoreCities />

//         <StoreServices />

//         <StoreQuestions />

//       </main>
//     </div>
//   );
// };

// export default Stores;
