import React, { useState, useEffect, useRef } from "react";

/* ─── TRUST BADGE ─────────────────────────────────────────────── */
const TrustBadge = ({ icon, text }) => (
  <span style={{
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(8px)",
    padding: "6px 14px",
    borderRadius: "999px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
    fontSize: "0.78rem",
    fontWeight: 500,
    color: "#4E0756",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  }}>
    <span>{icon}</span>{text}
  </span>
);

/* ─── PLAN CARD ───────────────────────────────────────────────── */
const PlanCard = ({ title, icon, highlight, features, popular, bg, border, accent, textColor, highlightText }) => (
  <div style={{
    position: "relative",
    borderRadius: "16px",
    padding: "20px 22px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: bg,
    border: `1.5px solid ${border}`,
  }}>
    {popular && (
      <span style={{
        position: "absolute", top: "-11px", right: "16px",
        background: "#6B4B2A", color: "#fff",
        fontSize: "0.65rem", padding: "3px 12px",
        borderRadius: "999px", fontWeight: 700, letterSpacing: "0.05em",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}>MOST POPULAR</span>
    )}

    <div>
      <h3 style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "1.05rem", fontWeight: 700, color: textColor, margin: "0 0 12px" }}>
        <span>{icon}</span>{title}
      </h3>
      <div style={{
        display: "inline-block", padding: "5px 14px",
        borderRadius: "8px", fontSize: "0.78rem",
        fontWeight: 600, marginBottom: "14px",
        background: accent, color: highlightText || "#fff",
      }}>{highlight}</div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: "flex", gap: "7px", fontSize: "0.78rem", color: "#444", alignItems: "flex-start" }}>
            <span style={{ color: textColor, fontWeight: 700, marginTop: "1px" }}>✔</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <button style={{
      marginTop: "18px", width: "100%",
      background: "#fff", border: `1px solid ${border}`,
      borderRadius: "10px", padding: "10px",
      fontWeight: 700, fontSize: "0.82rem", color: "#333",
      cursor: "pointer", display: "flex", alignItems: "center",
      justifyContent: "center", gap: "6px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}>
      START PLAN <span style={{ fontSize: "1rem" }}>›</span>
    </button>
  </div>
);

/* ─── FAQ ITEM ────────────────────────────────────────────────── */
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div style={{ borderTop: "1px solid #e5e7eb" }}>
    <button onClick={onToggle} style={{
      width: "100%", display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "12px 0",
      background: "none", border: "none", cursor: "pointer", textAlign: "left",
    }}>
      <span style={{ color: "#4E0756", fontSize: "0.82rem" }}>{question}</span>
      <span style={{ fontSize: "1rem", color: "#9ca3af", flexShrink: 0, marginLeft: "8px" }}>{isOpen ? "−" : "⌄"}</span>
    </button>
    {isOpen && <p style={{ paddingBottom: "12px", fontSize: "0.78rem", color: "#6b7280", margin: 0 }}>{answer}</p>}
  </div>
);

/* ─── MAIN ────────────────────────────────────────────────────── */
const Treasure = () => {
  const heroRef  = useRef(null);
  const sheetRef = useRef(null);

  /* calculator */
  const [amount,  setAmount]  = useState(5000);
  const [percent, setPercent] = useState(5);
  const goldRate   = 17145;
  const totalPaid  = amount * 9;
  const bonus      = amount;
  const goldReturn = Math.round((totalPaid * percent) / 100);
  const edgeValue  = totalPaid + goldReturn + bonus;
  const iconValue  = totalPaid + bonus;

  /* faq */
  const [faqTab,  setFaqTab]  = useState("faq");
  const [openFaq, setOpenFaq] = useState(null);

  /* ── scroll overlap ──
     Strategy that works in ANY environment (window scroll OR div scroll):
     1. Hero is normal flow (not sticky) — it just sits at top.
     2. Sheet starts with a large negative margin-top so it visually overlaps
        the bottom of the hero even before scrolling.
     3. On scroll, we read how much the user has scrolled past the hero's top,
        clamp it to [0, heroHeight - peekHeight], and apply a translateY that
        pushes the sheet further UP — covering more of the hero over time.
     4. We listen on BOTH window and the nearest overflow-scroll parent so
        it works regardless of which element is actually scrolling.
  */
  useEffect(() => {
    const hero  = heroRef.current;
    const sheet = sheetRef.current;
    if (!hero || !sheet) return;

    const getScrollTop = () => {
      // Walk up DOM to find the scrolling ancestor
      let el = hero.parentElement;
      while (el && el !== document.body && el !== document.documentElement) {
        const { overflow, overflowY } = window.getComputedStyle(el);
        if (/(auto|scroll)/.test(overflow + overflowY)) return el.scrollTop;
        el = el.parentElement;
      }
      return window.scrollY || document.documentElement.scrollTop;
    };

    const update = () => {
      const scrollTop = getScrollTop();
      const heroH     = hero.offsetHeight;
      // Push sheet up by exactly how much user has scrolled,
      // but cap it so sheet never goes above the top of the hero
      const push = Math.min(Math.max(scrollTop, 0), heroH);
      sheet.style.transform = `translateY(-${push}px)`;
    };

    // Listen on window AND walk up to find scroll parent and attach there too
    const listeners = [];
    const attach = (target) => {
      target.addEventListener("scroll", update, { passive: true });
      listeners.push(target);
    };

    attach(window);
    let el = hero.parentElement;
    while (el && el !== document.body && el !== document.documentElement) {
      const { overflow, overflowY } = window.getComputedStyle(el);
      if (/(auto|scroll)/.test(overflow + overflowY)) { attach(el); break; }
      el = el.parentElement;
    }

    update(); // set initial position
    window.addEventListener("resize", update, { passive: true });

    return () => {
      listeners.forEach(t => t.removeEventListener("scroll", update));
      window.removeEventListener("resize", update);
    };
  }, []);

  const edgeFAQs = [
    { q: "What is CaratLane Treasure Chest Edge Scheme?",  a: "It allows you to pay for 9 months and receive benefits on redemption." },
    { q: "What are the benefits of the scheme?",           a: "You receive the 10th installment benefit plus gold value advantage." },
    { q: "Can I switch schemes during the term?",          a: "Switching is not permitted once enrolled." },
    { q: "Can I cancel the scheme?",                       a: "Cancellation rules depend on tenure completed." },
    { q: "Which products are eligible?",                   a: "Most jewellery except coins and select categories." },
    { q: "Can I redeem for gold coins?",                   a: "Coins and some categories may be excluded." },
  ];
  const cancelFAQs = [
    { q: "Can I cancel my Treasure plan anytime?", a: "Yes, but benefits may vary based on payment completion." },
  ];

  return (
    <div style={{ minHeight: "100vh", color: "#333", fontFamily: "inherit" }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        style={{
          background: "linear-gradient(155deg,#e6d8ff 0%,#eddeff 18%,#f5e8ff 40%,#fdeedd 72%,#fef8ec 100%)",
          /* enough bottom padding so cards are FULLY visible + ~20px breathing room */
          padding: "36px 20px 48px",
        }}
      >
        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#4E0756", margin: "0 0 3px" }}>
            Pay 9 Instalments
          </p>
          <p style={{ fontSize: "1rem", fontWeight: 600, color: "#7D3C98", margin: 0 }}>
            Get the 10th Month Free!
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px", marginTop: "14px" }}>
            <TrustBadge icon="🛡️" text="Trust of TATA" />
            <TrustBadge icon="👥" text="Assured Bonus" />
            <TrustBadge icon="🏠" text="Flexible Redemption" />
          </div>
        </div>

        {/* Plan cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "16px",
          maxWidth: "860px",
          margin: "0 auto",
        }}>
          <PlanCard
            title="EDGE" icon="👑"
            highlight="10th Month Free + Gold Value" highlightText="#5a3e00"
            features={["Pay 9 instalments & get the 10th free","Instalment value converted as per gold rate","Buy any jewellery after 10th month"]}
            popular bg="rgba(247,231,183,0.97)" border="#E4D08F" accent="#D4AF37" textColor="#7A5C00"
          />
          <PlanCard
            title="ICON" icon="💎"
            highlight="10th Month Free" highlightText="#fff"
            features={["Pay 9 instalments & get the 10th free","Buy any jewellery after 10th month"]}
            bg="rgba(237,227,255,0.97)" border="#C9B8F5" accent="#8B5CF6" textColor="#6A3EC7"
          />
        </div>
      </div>

      {/* ══ SHEET (slides OVER hero as user scrolls down) ═════════ */}
      <div
        ref={sheetRef}
        style={{
          position: "relative",
          zIndex: 10,
          /* NO negative margin — sheet starts fully below the hero */
          marginTop: "0px",
          transform: "translateY(0px)",
          willChange: "transform",
          borderRadius: "32px 32px 0 0",
          background: "#ffffff",
          boxShadow: "0 -10px 40px rgba(90,0,140,0.10)",
          overflow: "hidden",
        }}
      >
        {/* Wave tint strip */}
        <div style={{ height: "6px", background: "linear-gradient(180deg,rgba(210,185,255,0.25) 0%,transparent 100%)" }} />

        {/* ── CALCULATOR ──────────────────────────────────────── */}
        <section style={{ padding: "28px 20px 32px" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.1rem", fontWeight: 600, color: "#4E0756", margin: "0 0 20px" }}>
            Calculate &amp; Compare Plans
          </h2>

          {/* Instalment selector */}
          <div style={{
            maxWidth: "480px", margin: "0 auto",
            border: "1px solid #e5e7eb", borderRadius: "12px",
            padding: "14px 18px", display: "flex",
            alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}>
            <div>
              <p style={{ fontSize: "0.72rem", color: "#9ca3af", margin: "0 0 2px" }}>Your Monthly Instalment</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 600, color: "#4E0756", margin: 0 }}>₹{amount.toLocaleString()}</p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[["−", () => setAmount(a => Math.max(500, a - 500))],["+", () => setAmount(a => a + 500)]].map(([lbl,fn]) => (
                <button key={lbl} onClick={fn} style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  border: "1px solid #d1d5db", fontSize: "1.1rem",
                  color: "#6A3EC7", background: "#fff", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{lbl}</button>
              ))}
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#6b7280", margin: "10px 0 0" }}>
            <span style={{ color: "#f87171", marginRight: "5px" }}>●</span>
            Current 24KT Gold Rate: <strong>₹{goldRate}</strong>
          </p>

          {/* Table */}
          <div style={{ maxWidth: "820px", margin: "22px auto 0", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <table style={{ width: "100%", fontSize: "0.78rem", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ background: "#f3eef9", textAlign: "left", padding: "11px 14px", fontWeight: 600 }}>Benefits</th>
                  <th style={{ background: "#8B5E2A", color: "#fff", padding: "11px 14px", fontWeight: 600 }}>👑 EDGE</th>
                  <th style={{ background: "#7A3FB5", color: "#fff", padding: "11px 14px", fontWeight: 600 }}>💎 ICON</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["You Pay 9 Instalments", `₹${totalPaid.toLocaleString()}`, `₹${totalPaid.toLocaleString()}`, false],
                  ["caratlane_discount", `₹${bonus.toLocaleString()}`, `₹${bonus.toLocaleString()}`, false],
                  ["buy_jewellery", `₹${edgeValue.toLocaleString()}*`, `₹${iconValue.toLocaleString()}`, true],
                ].map((row, i) => {
                  if (i === 0) return (
                    <tr key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "11px 14px", background: "#f9f7fc" }}>You Pay 9 Instalments</td>
                      <td style={{ padding: "11px 14px", textAlign: "center", background: "#f6edd8", fontWeight: 500 }}>₹{totalPaid.toLocaleString()}</td>
                      <td style={{ padding: "11px 14px", textAlign: "center", background: "#f1ebfb", fontWeight: 500 }}>₹{totalPaid.toLocaleString()}</td>
                    </tr>
                  );
                  return null;
                })}
                <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "11px 14px", background: "#f9f7fc" }}>
                    Gold Value Returns*
                    <div style={{ fontSize: "0.65rem", color: "#9ca3af", marginTop: "3px" }}>Adjust slider to see approx returns</div>
                    <input type="range" min="0" max="10" value={percent}
                      onChange={e => setPercent(+e.target.value)}
                      style={{ width: "100%", marginTop: "8px", accentColor: "#eab308" }} />
                    <div style={{ textAlign: "center", fontSize: "0.65rem", marginTop: "3px" }}>{percent}%</div>
                  </td>
                  <td style={{ padding: "11px 14px", textAlign: "center", background: "#f6edd8", fontWeight: 500 }}>₹{goldReturn.toLocaleString()}*</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", background: "#f1ebfb", color: "#9ca3af" }}>Not Available</td>
                </tr>
                <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "11px 14px", background: "#f9f7fc" }}>CaratLane Discount (10th Month)</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", background: "#f6edd8", fontWeight: 500 }}>₹{bonus.toLocaleString()}</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", background: "#f1ebfb", fontWeight: 500 }}>₹{bonus.toLocaleString()}</td>
                </tr>
                <tr style={{ borderTop: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "11px 14px", background: "#f9f7fc", fontWeight: 600 }}>Buy Jewellery Worth</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", background: "#f1e3b6", fontWeight: 700 }}>₹{edgeValue.toLocaleString()}*</td>
                  <td style={{ padding: "11px 14px", textAlign: "center", background: "#e7dcfb", fontWeight: 700 }}>₹{iconValue.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: "0.65rem", textAlign: "center", color: "#6A3EC7", marginTop: "10px", maxWidth: "640px", margin: "10px auto 0" }}>
            *This example reflects potential benefits if gold prices increase. In case of a drop in gold rates, the difference will be borne by the customer.
          </p>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section style={{ background: "#faf8fc", padding: "28px 20px 48px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ display: "flex", background: "#e9e1f5", borderRadius: "999px", padding: "3px" }}>
              {[{ k: "faq", l: "FAQs" }, { k: "terms", l: "Terms & Conditions" }].map(({ k, l }) => (
                <button key={k} onClick={() => setFaqTab(k)} style={{
                  padding: "6px 18px", borderRadius: "999px",
                  fontSize: "0.78rem", fontWeight: 500, border: "none",
                  cursor: "pointer", transition: "all 0.18s",
                  background: faqTab === k ? "#fff" : "transparent",
                  boxShadow: faqTab === k ? "0 1px 4px rgba(0,0,0,0.09)" : "none",
                  color: "#333",
                }}>{l}</button>
              ))}
            </div>
          </div>

          {faqTab === "faq" ? (
            <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
              {[{ title: "Cancellation/Refund", items: cancelFAQs }, { title: "CaratLane Treasure Chest Edge", items: edgeFAQs }].map(group => (
                <div key={group.title} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "16px 18px" }}>
                  <h3 style={{ fontWeight: 600, color: "#4E0756", margin: "0 0 8px", fontSize: "0.85rem" }}>{group.title}</h3>
                  {group.items.map((item, i) => {
                    const key = `${group.title}-${i}`;
                    return (
                      <FAQItem
                        key={key}
                        question={item.q}
                        answer={item.a}
                        isOpen={openFaq === key}
                        onToggle={() => setOpenFaq(openFaq === key ? null : key)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ maxWidth: "640px", margin: "0 auto", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "18px", fontSize: "0.78rem", color: "#6b7280" }}>
              Terms &amp; conditions content goes here. You can add redemption rules, eligibility, and plan policies.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Treasure;

// import React, { useState } from "react";

// /* ---------------- ICON HELPER ---------------- */

// const ICON = ({ d, className = "w-4 h-4" }) => (
//     <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d={d} />
//     </svg>
// );

// /* ---------------- TRUST BADGE ---------------- */

// const TrustBadge = ({ text }) => (
//     <span className="bg-white px-4 py-2 rounded-full shadow text-sm">
//         ✔ {text}
//     </span>
// );

// /* ---------------- PLAN CARD ---------------- */

// const PlanCard = ({
//     title,
//     icon,
//     highlight,
//     features,
//     popular,
//     bg,
//     border,
//     accent,
//     textColor,
// }) => (
//     <div
//         className="relative rounded-2xl p-6 md:p-8 shadow-md flex flex-col justify-between"
//         style={{ background: bg, border: `1px solid ${border}` }}
//     >
//         {popular && (
//             <span className="absolute top-4 right-4 bg-[#6B4B2A] text-white text-xs px-3 py-1 rounded-full font-medium">
//                 MOST POPULAR
//             </span>
//         )}

//         <div>
//             <h3
//                 className="flex items-center gap-2 text-xl font-semibold mb-4"
//                 style={{ color: textColor }}
//             >
//                 {icon} {title}
//             </h3>

//             <div
//                 className="inline-block px-4 py-2 rounded-lg text-sm font-semibold mb-5 text-black"
//                 style={{ background: accent }}
//             >
//                 {highlight}
//             </div>

//             <ul className="space-y-3 text-sm text-[#333]">
//                 {features.map((f, i) => (
//                     <li key={i} className="flex gap-2 items-start">
//                         <span className="text-green-600 mt-[2px]">✔</span>
//                         <span>{f}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>

//         <button className="mt-8 w-full bg-white hover:bg-gray-50 transition rounded-lg py-3 font-semibold border text-[#333]">
//             START PLAN →
//         </button>
//     </div>
// );

// /* ---------------- HERO / HEADER ---------------- */

// const TreasureHero = () => (
//     <section className="text-center py-16 px-4 bg-gradient-to-b from-[#f3eaff] to-[#fff6e6] rounded-[24px]">
//         <p className="text-xl md:text-2xl font-semibold text-[#5B2C6F]">
//             Pay 9 Instalments
//         </p>
//         <p className="text-lg md:text-xl text-[#7D3C98]">
//             Get the 10th Month Free!
//         </p>

//         <div className="flex flex-wrap justify-center gap-3 mt-6">
//             <TrustBadge text="Trust of TATA" />
//             <TrustBadge text="Assured Bonus" />
//             <TrustBadge text="Flexible Redemption" />
//         </div>
//     </section>
// );

// /* ---------------- PLAN SECTION ---------------- */

// const TreasurePlans = () => (
//     <section className="py-12 px-4 md:px-10">
//         <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

//             <PlanCard
//                 title="EDGE"
//                 icon="👑"
//                 highlight="10th Month Free + Gold Value"
//                 features={[
//                     "Pay 9 instalments & get the 10th free",
//                     "Instalment value converted as per gold rate",
//                     "Buy any jewellery after 10th month",
//                 ]}
//                 popular
//                 bg="#F7E7B7"
//                 border="#E4D08F"
//                 accent="#D4AF37"
//                 textColor="#7A5C00"
//             />

//             <PlanCard
//                 title="ICON"
//                 icon="💎"
//                 highlight="10th Month Free"
//                 features={[
//                     "Pay 9 instalments & get the 10th free",
//                     "Buy any jewellery after 10th month",
//                 ]}
//                 bg="#EDE3FF"
//                 border="#D7C9FF"
//                 accent="#9B6BFF"
//                 textColor="#6A3EC7"
//             />

//         </div>
//     </section>
// );

// const TreasureCalculator = () => {
//   const [amount, setAmount] = useState(5000);
//   const [percent, setPercent] = useState(5);

//   const goldRate = 17145;

//   const totalPaid = amount * 9;
//   const bonus = amount;
//   const goldReturn = Math.round((totalPaid * percent) / 100);
//   const edgeValue = totalPaid + goldReturn + bonus;
//   const iconValue = totalPaid + bonus;

//   const increase = () => setAmount((a) => a + 500);
//   const decrease = () => setAmount((a) => Math.max(500, a - 500));

//   return (
//     <section className="py-16 px-4 md:px-10">
//       <h2 className="text-center text-2xl font-semibold text-[#4E0756] mb-8">
//         Calculate & Compare Plans
//       </h2>

//       {/* Installment Selector */}
//       <div className="max-w-xl mx-auto border rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm">
//         <div>
//           <p className="text-sm text-gray-500">Your Monthly Instalment</p>
//           <p className="text-2xl font-semibold text-[#4E0756]">
//             ₹{amount.toLocaleString()}
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={decrease}
//             className="w-10 h-10 rounded-full border text-xl text-[#6A3EC7]"
//           >
//             −
//           </button>
//           <button
//             onClick={increase}
//             className="w-10 h-10 rounded-full border text-xl text-[#6A3EC7]"
//           >
//             +
//           </button>
//         </div>
//       </div>

//       {/* Gold Rate */}
//       <p className="text-center text-sm mt-4 text-gray-600">
//         <span className="text-red-400 mr-2">●</span>
//         Current 24KT Gold Rate: <strong>₹{goldRate}</strong>
//       </p>

//       {/* Comparison Table */}
//       <div className="max-w-4xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-sm">
//         <table className="w-full text-sm">
//           <thead>
//             <tr>
//               <th className="bg-[#f3eef9] text-left p-4">Benefits</th>
//               <th className="bg-[#8B5E2A] text-white p-4">👑 EDGE</th>
//               <th className="bg-[#7A3FB5] text-white p-4">💎 ICON</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr className="border-t">
//               <td className="p-4 bg-[#f9f7fc]">You Pay 9 Instalments</td>
//               <td className="p-4 text-center bg-[#f6edd8] font-medium">
//                 ₹{totalPaid.toLocaleString()}
//               </td>
//               <td className="p-4 text-center bg-[#f1ebfb] font-medium">
//                 ₹{totalPaid.toLocaleString()}
//               </td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-4 bg-[#f9f7fc]">
//                 Gold Value Returns*
//                 <div className="text-xs text-gray-500">
//                   Adjust slider to see approx returns
//                 </div>

//                 <input
//                   type="range"
//                   min="0"
//                   max="10"
//                   value={percent}
//                   onChange={(e) => setPercent(e.target.value)}
//                   className="w-full mt-3 accent-yellow-500"
//                 />
//                 <div className="text-center text-xs mt-1">{percent}%</div>
//               </td>

//               <td className="p-4 text-center bg-[#f6edd8] font-medium">
//                 ₹{goldReturn.toLocaleString()}*
//               </td>

//               <td className="p-4 text-center bg-[#f1ebfb]">
//                 Not Available
//               </td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-4 bg-[#f9f7fc]">
//                 CaratLane Discount (10th Month)
//               </td>
//               <td className="p-4 text-center bg-[#f6edd8] font-medium">
//                 ₹{bonus.toLocaleString()}
//               </td>
//               <td className="p-4 text-center bg-[#f1ebfb] font-medium">
//                 ₹{bonus.toLocaleString()}
//               </td>
//             </tr>

//             <tr className="border-t">
//               <td className="p-4 bg-[#f9f7fc] font-medium">
//                 Buy Jewellery Worth
//               </td>
//               <td className="p-4 text-center bg-[#f1e3b6] font-semibold">
//                 ₹{edgeValue.toLocaleString()}*
//               </td>
//               <td className="p-4 text-center bg-[#e7dcfb] font-semibold">
//                 ₹{iconValue.toLocaleString()}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <p className="text-xs text-center text-[#6A3EC7] mt-4 max-w-3xl mx-auto">
//         *This example reflects potential benefits if gold prices increase.
//         In case of a drop in gold rates, the difference will be borne by the
//         customer.
//       </p>
//     </section>
//   );
// };

// const FAQItem = ({ question, answer }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-t">
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex justify-between items-center py-4 text-left"
//       >
//         <span className="text-[#4E0756]">{question}</span>
//         <span className="text-xl">{open ? "−" : "⌄"}</span>
//       </button>

//       {open && (
//         <p className="pb-4 text-sm text-gray-600">
//           {answer}
//         </p>
//       )}
//     </div>
//   );
// };

// const FAQGroup = ({ title, items }) => (
//   <div className="bg-white rounded-2xl border p-6">
//     <h3 className="font-semibold text-[#4E0756] mb-4">{title}</h3>

//     {items.map((item, i) => (
//       <FAQItem key={i} {...item} />
//     ))}
//   </div>
// );

// const TreasureFAQSection = () => {
//   const [tab, setTab] = useState("faq");

//   const edgeFAQs = [
//     { question: "What is CaratLane Treasure Chest Edge Scheme?", answer: "It allows you to pay for 9 months and receive benefits on redemption." },
//     { question: "What are the benefits of the scheme?", answer: "You receive the 10th installment benefit plus gold value advantage." },
//     { question: "Can I switch schemes during the term?", answer: "Switching is not permitted once enrolled." },
//     { question: "Can I cancel the scheme?", answer: "Cancellation rules depend on tenure completed." },
//     { question: "Which products are eligible?", answer: "Most jewellery except coins and select categories." },
//     { question: "Can I redeem for gold coins?", answer: "Coins and some categories may be excluded." },
//   ];

//   const cancellationFAQs = [
//     {
//       question: "Can I cancel my Treasure plan anytime?",
//       answer: "Yes, but benefits may vary based on payment completion."
//     }
//   ];

//   return (
//     <section className="py-16 px-4 md:px-10 bg-[#faf8fc]">
//       {/* Toggle Tabs */}
//       <div className="flex justify-center mb-10">
//         <div className="flex bg-[#e9e1f5] rounded-full p-1">
//           <button
//             onClick={() => setTab("faq")}
//             className={`px-6 py-2 rounded-full text-sm font-medium ${
//               tab === "faq" ? "bg-white shadow" : ""
//             }`}
//           >
//             FAQs
//           </button>
//           <button
//             onClick={() => setTab("terms")}
//             className={`px-6 py-2 rounded-full text-sm font-medium ${
//               tab === "terms" ? "bg-white shadow" : ""
//             }`}
//           >
//             Terms & Conditions
//           </button>
//         </div>
//       </div>

//       {tab === "faq" ? (
//         <div className="max-w-4xl mx-auto space-y-6">
//           <FAQGroup title="Cancellation/Refund" items={cancellationFAQs} />
//           <FAQGroup title="CaratLane Treasure Chest Edge" items={edgeFAQs} />
//         </div>
//       ) : (
//         <div className="max-w-3xl mx-auto text-sm text-gray-600 bg-white p-6 rounded-2xl border">
//           Terms & conditions content goes here. You can add redemption rules,
//           eligibility, and plan policies.
//         </div>
//       )}
//     </section>
//   );
// };

// /* ---------------- MAIN PAGE ---------------- */

// const Treasure = () => {
//     return (
//         <div className="min-h-screen bg-white text-[#333]">
//             <main className="px-5 space-y-8">

//                 <TreasureHero />

//                 <TreasurePlans />

//                 <TreasureCalculator />

//                 <TreasureFAQSection />

//             </main>
//         </div>
//     );
// };

// export default Treasure;
