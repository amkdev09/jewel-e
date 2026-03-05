import React, { useState } from "react";

/* ─── BENEFIT ICONS (inline SVG) ─────────────────────────────── */
const IconClock = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect width="56" height="56" rx="28" fill="#f3eeff"/>
    <rect x="16" y="14" width="18" height="14" rx="2" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <line x1="20" y1="14" x2="20" y2="12" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="30" y1="14" x2="30" y2="12" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="16" y1="19" x2="34" y2="19" stroke="#7C3AED" strokeWidth="1.5"/>
    <circle cx="38" cy="36" r="8" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <line x1="38" y1="32" x2="38" y2="36" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="38" y1="36" x2="41" y2="38" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="34" x2="20" y2="34" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="37" x2="18" y2="37" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="40" x2="22" y2="40" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconGold = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect width="56" height="56" rx="28" fill="#f3eeff"/>
    <path d="M22 36 Q28 26 34 36" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <ellipse cx="28" cy="30" rx="6" ry="4" fill="#FFD700" opacity="0.8"/>
    <path d="M16 38 Q28 44 40 38" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <line x1="28" y1="20" x2="28" y2="16" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="22" y1="22" x2="19" y2="19" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="34" y1="22" x2="37" y2="19" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconGift = () => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect width="56" height="56" rx="28" fill="#f3eeff"/>
    <rect x="17" y="26" width="22" height="16" rx="1" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <rect x="15" y="22" width="26" height="4" rx="1" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <line x1="28" y1="22" x2="28" y2="42" stroke="#7C3AED" strokeWidth="1.5"/>
    <path d="M28 22 Q24 18 22 20 Q20 22 24 22" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M28 22 Q32 18 34 20 Q36 22 32 22" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <circle cx="38" cy="18" r="4" stroke="#7C3AED" strokeWidth="1.2" fill="none"/>
    <line x1="36" y1="18" x2="40" y2="18" stroke="#7C3AED" strokeWidth="1.2"/>
    <line x1="38" y1="16" x2="38" y2="20" stroke="#7C3AED" strokeWidth="1.2"/>
  </svg>
);

/* Redemption step icons */
const IconJewellery = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" stroke="#C4B0E8" strokeWidth="1.5" fill="none" strokeDasharray="4 3"/>
    <rect x="20" y="22" width="24" height="18" rx="2" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <line x1="20" y1="28" x2="44" y2="28" stroke="#7C3AED" strokeWidth="1.2"/>
    <rect x="26" y="32" width="12" height="8" rx="1" stroke="#7C3AED" strokeWidth="1.2" fill="none"/>
    <line x1="27" y1="22" x2="27" y2="19" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="37" y1="22" x2="37" y2="19" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="14" y1="36" x2="18" y2="36" stroke="#C4B0E8" strokeWidth="1" strokeLinecap="round"/>
    <line x1="46" y1="28" x2="50" y2="28" stroke="#C4B0E8" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const IconHandGold = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <ellipse cx="28" cy="26" rx="10" ry="7" fill="#FFD700" opacity="0.7"/>
    <ellipse cx="28" cy="26" rx="10" ry="7" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <path d="M16 38 Q20 32 28 32 Q36 32 44 38" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M16 38 L18 44 L44 44 L46 38" stroke="#7C3AED" strokeWidth="1.2" fill="none"/>
    <line x1="18" y1="24" x2="14" y2="22" stroke="#C4B0E8" strokeWidth="1" strokeLinecap="round"/>
    <line x1="16" y1="28" x2="12" y2="28" stroke="#C4B0E8" strokeWidth="1" strokeLinecap="round"/>
    <line x1="38" y1="22" x2="42" y2="20" stroke="#C4B0E8" strokeWidth="1" strokeLinecap="round"/>
    <line x1="40" y1="26" x2="44" y2="26" stroke="#C4B0E8" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const IconDelivery = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="28" r="16" stroke="#C4B0E8" strokeWidth="1.5" fill="none"/>
    <path d="M24 28 L28 32 L40 20" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="38" width="22" height="12" rx="2" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <rect x="36" y="42" width="14" height="8" rx="1" stroke="#7C3AED" strokeWidth="1.5" fill="none"/>
    <line x1="36" y1="42" x2="36" y2="50" stroke="#7C3AED" strokeWidth="1.2"/>
    <circle cx="20" cy="52" r="3" stroke="#7C3AED" strokeWidth="1.2" fill="none"/>
    <circle cx="42" cy="52" r="3" stroke="#7C3AED" strokeWidth="1.2" fill="none"/>
    <line x1="14" y1="44" x2="36" y2="44" stroke="#7C3AED" strokeWidth="1" opacity="0.4"/>
  </svg>
);

const IconVault = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="#888" strokeWidth="1.5" fill="#f5f5f5"/>
    <circle cx="20" cy="20" r="10" stroke="#888" strokeWidth="1.2" fill="none"/>
    <circle cx="20" cy="20" r="4" fill="#aaa"/>
    <line x1="20" y1="10" x2="20" y2="14" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="20" y1="26" x2="20" y2="30" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="10" y1="20" x2="14" y2="20" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="26" y1="20" x2="30" y2="20" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconPhone = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <path d="M18 14 Q16 14 15 16 L13 20 Q12 23 16 28 Q20 33 24 36 Q29 40 32 39 L36 37 Q38 36 38 34 L37 30 Q36 28 34 29 L31 30 Q30 31 29 30 Q26 28 24 25 Q22 23 23 22 L24 19 Q25 17 23 16 Z" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
    <path d="M32 14 L40 14" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M28 18 L40 18" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="36" y1="14" x2="32" y2="18" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="40" y1="14" x2="40" y2="18" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

/* ─── HERO ────────────────────────────────────────────────────── */
const GoldHero = () => (
  <section style={{
    position: "relative",
    background: "#050505",
    width: "100%",
    overflow: "hidden",
  }}>
    {/* subtle dark reflection floor */}
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
      background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
      zIndex: 0,
    }} />

    <div style={{
      position: "relative", zIndex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "56px 60px 56px 60px",
      gap: "0",
    }}>
      {/* LEFT text — fixed width column */}
      <div style={{ color: "#fff", width: "300px", flexShrink: 0 }}>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          CaratLane Digital Gold
        </h1>
        <p style={{ color: "#bbb", fontSize: "0.88rem", margin: "0 0 28px", lineHeight: 1.6 }}>
          Invest in Pure 24K Gold Online - 100% Safe &amp; Trustworthy
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button style={{
            padding: "11px 36px", borderRadius: "6px",
            background: "linear-gradient(90deg,#C04DD9,#7B5BFF)",
            color: "#fff", fontWeight: 700, fontSize: "0.95rem",
            border: "none", cursor: "pointer",
          }}>Buy Now</button>
          <button style={{
            background: "none", border: "none", color: "#fff",
            fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            Learn more <span>⌄</span>
          </button>
        </div>
      </div>

      {/* CENTER — jewellery images, large, centered */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "48px",
        padding: "0 40px",
      }}>
        <img
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80"
          alt="rings"
          style={{
            height: "220px",
            objectFit: "contain",
            filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.8))",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=400&q=80"
          alt="earrings"
          style={{
            height: "160px",
            objectFit: "contain",
            filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.8))",
          }}
        />
      </div>

      {/* RIGHT — eGold card */}
      <div style={{
        width: "200px",
        flexShrink: 0,
        background: "linear-gradient(145deg,#1e1230,#3d2060,#2a1545)",
        borderRadius: "10px",
        padding: "28px 22px 22px",
        boxShadow: "0 12px 48px rgba(0,0,0,0.6)",
        alignSelf: "center",
      }}>
        {/* geometric pattern lines */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.3, borderRadius: "10px" }} viewBox="0 0 200 260" preserveAspectRatio="none">
          <line x1="100" y1="0" x2="0"   y2="130" stroke="#9B6BFF" strokeWidth="0.8"/>
          <line x1="100" y1="0" x2="200" y2="130" stroke="#9B6BFF" strokeWidth="0.8"/>
          <line x1="100" y1="0" x2="50"  y2="260" stroke="#9B6BFF" strokeWidth="0.8"/>
          <line x1="100" y1="0" x2="150" y2="260" stroke="#9B6BFF" strokeWidth="0.8"/>
          <line x1="0"   y1="80" x2="200" y2="80"  stroke="#9B6BFF" strokeWidth="0.5"/>
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* logo circle */}
          <div style={{
            width: "42px", height: "42px", borderRadius: "50%",
            background: "linear-gradient(135deg,#FFD700,#C8A400)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "60px", boxShadow: "0 4px 12px rgba(255,200,0,0.4)",
          }}>
            <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#3d2060" }}>C</span>
          </div>
          <div style={{ color: "#FFD36B", fontWeight: 700, fontSize: "1rem", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontStyle: "italic", fontSize: "0.9rem" }}>e</span> Gold
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.68rem" }}>| Digital Gold by CaratLane</div>
        </div>
      </div>
    </div>
  </section>
);

/* ─── BENEFITS ────────────────────────────────────────────────── */
const GoldBenefits = () => {
  const items = [
    {
      icon: <IconClock />,
      title: "Unparalleled convenience",
      desc: "Buy in-store or online 24×7. Purchase gold online or offline through one of our jewellery stores.",
    },
    {
      icon: <IconGold />,
      title: "What you buy is what you get",
      desc: "No carrying cost or hidden charges. Every gram of CaratLane eGold you buy online is backed by real gold deposits worth the same.",
    },
    {
      icon: <IconGift />,
      title: "100% guaranteed buyback",
      desc: "Redeem your CaratLane eGold balance across our 330+ online stores and physical outlets.",
    },
  ];

  return (
    <section style={{ padding: "32px 0" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "40px",
        alignItems: "start",
      }}>
        {/* LEFT */}
        <div>
          <p style={{ fontSize: "0.8rem", color: "#7C3AED", margin: "0 0 10px", fontWeight: 500 }}>Know More</p>
          <h2 style={{ fontSize: "clamp(1.2rem,3vw,1.7rem)", fontWeight: 700, lineHeight: 1.35, margin: "0 0 28px", color: "#111" }}>
            Invest in a high-payoff digital gold. Buy, sell, or redeem your CaratLane eGold in exchange for beautiful jewellery.
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <button style={{
              padding: "10px 24px", borderRadius: "8px",
              background: "linear-gradient(90deg,#C04DD9,#6F5BFF)",
              color: "#fff", fontWeight: 600, fontSize: "0.85rem",
              border: "none", cursor: "pointer",
            }}>Buy eGold Now</button>
            <button style={{
              background: "none", border: "none",
              color: "#4E0756", fontWeight: 600, fontSize: "0.85rem",
              cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
            }}>How to redeem? <span>⌄</span></button>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0 }}>{item.icon}</div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111", margin: "0 0 5px" }}>{item.title}</h4>
                <p style={{ fontSize: "0.78rem", color: "#666", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── REDEMPTION ──────────────────────────────────────────────── */
const GoldRedemption = () => {
  const steps = [
    { icon: <IconJewellery />, text: "Choose your favorite jewellery from CaratLane" },
    { icon: <IconHandGold />,  text: "Redeem your Caratlane eGold at checkout" },
    { icon: <IconDelivery />,  text: "Get your jewellery delivered for free at your doorstep" },
  ];

  return (
    <section style={{ background: "#f5f3f8", padding: "36px 28px", borderRadius: "12px" }}>
      <p style={{ fontSize: "0.78rem", color: "#7C3AED", margin: "0 0 6px", fontWeight: 500 }}>Redeem</p>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "40px", flexWrap: "wrap", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, color: "#111", margin: 0, flex: "0 0 auto" }}>
          eGold to jewellery, in a blink!
        </h2>
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "10px",
          background: "rgba(124,58,237,0.06)", borderRadius: "8px",
          padding: "10px 14px", maxWidth: "320px",
        }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }}>🛡️</span>
          <p style={{ fontSize: "0.75rem", color: "#555", margin: 0, lineHeight: 1.5 }}>
            You can redeem CaratLane eGold online or offline through one of our many jewellery stores across India.
          </p>
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center",
        gap: "0", flexWrap: "wrap",
      }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div style={{ textAlign: "center", minWidth: "120px", flex: "1 1 120px" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>{step.icon}</div>
              <p style={{ fontSize: "0.75rem", color: "#555", margin: 0, lineHeight: 1.4 }}>{step.text}</p>
            </div>
            {i < steps.length - 1 && (
              <div style={{ padding: "0 8px", flexShrink: 0, marginBottom: "24px" }}>
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                  <line x1="0" y1="8" x2="34" y2="8" stroke="#7C3AED" strokeWidth="1.5"/>
                  <path d="M30 4 L38 8 L30 12" stroke="#7C3AED" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Vault card */}
        <div style={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "18px 20px",
          background: "#fff",
          minWidth: "160px",
          flex: "0 0 auto",
          marginLeft: "16px",
        }}>
          <div style={{ marginBottom: "10px" }}><IconVault /></div>
          <h4 style={{ color: "#7C3AED", fontWeight: 700, fontSize: "0.9rem", margin: "0 0 4px" }}>Visit Vault</h4>
          <p style={{ fontSize: "0.72rem", color: "#888", margin: "0 0 10px" }}>Check your gold Balance</p>
          <button style={{
            background: "none", border: "none", color: "#7C3AED",
            fontWeight: 600, fontSize: "0.78rem", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "5px", padding: 0,
          }}>Login to view →</button>
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─────────────────────────────────────────────────────── */
const GoldFAQ = () => {
  const [open, setOpen] = useState({});
  const toggle = (s, i) => setOpen(prev => ({ ...prev, [`${s}-${i}`]: !prev[`${s}-${i}`] }));

  const faqSections = [
    {
      title: "General",
      items: [
        "What is digital gold?","What is CaratLane Digital Gold?","Why should I buy CaratLane Digital Gold?",
        "How to buy CaratLane Digital Gold?","Where will the Digital Gold be stored after I buy it?",
        "What is the purity of gold bought under CaratLane Digital Gold?",
        "Why are the CaratLane Digital Gold rates different from jewellery gold rates?",
        "Who can I contact for account queries?","Is my CaratLane Digital Gold kept in safe custody?",
        "Is the Physical Vault insured?","What is the role of the external administrator?",
        "What happens if CaratLane goes into liquidation?","Is there an automatic saving plan?",
        "What happens in the unlikely event of my death?",
        "Will my digital gold balance be affected by rate fluctuations?",
      ],
    },
    {
      title: "Buy",
      items: [
        "How do I buy CaratLane Digital Gold?",
        "What is the minimum and maximum gold amount I can purchase?",
        "Where is the gold stored post buying?",
        "What is the purity of gold bought under CaratLane Digital Gold?",
        "Does the price include GST?","Why are Digital Gold rates different from jewellery gold rates?",
        "Where can I find my gold balance and purchase details?",
        "Where can I find invoices of my past purchases?",
        "What are the KYC requirements for Digital Gold?",
      ],
    },
    {
      title: "Sell",
      items: [
        "How do I sell my gold?","Is there any lock-in period to sell gold?",
        "How long will it take to receive money in my bank account?",
        "Why is buy and sell price different on the same day?",
      ],
    },
    {
      title: "Exchange",
      items: [
        "How can I exchange my Digital Gold for physical jewellery?",
        "Why am I not able to match gram-to-gram for the jewellery I am exchanging?",
        "Why do I have to pay GST when buying jewellery after purchasing Digital Gold?",
        "Is there any lock-in period to exchange Digital Gold for jewellery?",
        "What is the minimum gold amount required to exchange for jewellery?",
      ],
    },
  ];

  return (
    <section style={{ padding: "32px 0" }}>
      {/* Callback */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: "40px", alignItems: "start",
        marginBottom: "48px",
      }}>
        <div>
          <p style={{ fontSize: "0.78rem", color: "#7C3AED", margin: "0 0 10px", fontWeight: 500 }}>
            Got questions? We have all the answers!
          </p>
          <h2 style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 700, color: "#111", margin: 0, lineHeight: 1.4 }}>
            Have questions about CaratLane eGold? Share your number and we will call you back!
          </h2>
        </div>

        <div style={{ background: "#fff" }}>
          <div style={{ marginBottom: "8px" }}><IconPhone /></div>
          <p style={{ fontSize: "0.82rem", color: "#555", margin: "0 0 14px", fontWeight: 500 }}>At Your Service. Always.</p>
          <label style={{ fontSize: "0.72rem", color: "#888", display: "block", marginBottom: "5px" }}>Mobile Number</label>
          <input
            type="text"
            style={{
              width: "100%", border: "1.5px solid #d1d5db",
              borderRadius: "6px", padding: "10px 14px",
              fontSize: "0.85rem", outline: "none",
              boxSizing: "border-box", marginBottom: "12px",
            }}
          />
          <button style={{
            width: "100%", padding: "11px",
            borderRadius: "6px", border: "none",
            background: "linear-gradient(90deg,#C04DD9,#6F5BFF)",
            color: "#fff", fontWeight: 600, fontSize: "0.85rem",
            cursor: "pointer",
          }}>Request Call Back</button>
        </div>
      </div>

      {/* FAQ sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {faqSections.map((section, s) => (
          <div key={s}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111", margin: "0 0 16px" }}>{section.title}</h3>
            <div>
              {section.items.map((q, i) => (
                <div key={i} style={{ borderTop: "1px solid #e5e7eb" }}>
                  <button
                    onClick={() => toggle(s, i)}
                    style={{
                      width: "100%", display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "16px 0",
                      background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "0.88rem", color: "#222" }}>{q}</span>
                    <span style={{ fontSize: "1.1rem", color: "#555", flexShrink: 0, marginLeft: "16px", fontWeight: 300 }}>
                      {open[`${s}-${i}`] ? "−" : "+"}
                    </span>
                  </button>
                  {open[`${s}-${i}`] && (
                    <div style={{ paddingBottom: "14px", fontSize: "0.82rem", color: "#666", lineHeight: 1.6 }}>
                      Answer content goes here.
                    </div>
                  )}
                </div>
              ))}
              {/* bottom border on last item */}
              <div style={{ borderTop: "1px solid #e5e7eb" }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── PAGE ────────────────────────────────────────────────────── */
const Gold = () => (
  <div style={{ padding: "0 40px", minHeight: "100vh", background: "#fff", color: "#333", fontFamily: "inherit" }}>
    {/* Hero is full-width, outside the constrained container */}
    <GoldHero />
    <main style={{ padding: "0 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <GoldBenefits />
      <GoldRedemption />
      <GoldFAQ />
    </main>
  </div>
);

export default Gold;

// import React from "react";

// /* ================= HERO SECTION ================= */

// const GoldHero = () => {
//   return (
//     <section className="relative overflow-hidden rounded-[16px] my-8 bg-black">
      
//       {/* luxury gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

//       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">

//         {/* LEFT CONTENT */}
//         <div className="text-white max-w-xl text-center md:text-left">
//           <h1 className="text-3xl md:text-4xl font-semibold mb-4">
//             CaratLane Digital Gold
//           </h1>

//           <p className="text-gray-300 mb-8">
//             Invest in Pure 24K Gold Online - 100% Safe & Trustworthy
//           </p>

//           <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
//             <button className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#C04DD9] to-[#6F5BFF] hover:opacity-90 transition">
//               Buy Now
//             </button>

//             <button className="text-white flex items-center gap-2 hover:opacity-80">
//               Learn more
//               <span className="text-lg">⌄</span>
//             </button>
//           </div>
//         </div>

//         {/* RIGHT VISUAL AREA */}
//         <div className="mt-10 md:mt-0 flex items-end gap-6">

//           {/* rings */}
//           <img
//             src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80"
//             alt="rings"
//             className="h-40 object-contain"
//           />

//           {/* earrings */}
//           <img
//             src="https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=400&q=80"
//             alt="earrings"
//             className="h-32 object-contain"
//           />

//           {/* digital gold card */}
//           <div className="hidden md:block bg-gradient-to-br from-[#2c2038] to-[#6f4c8b] p-6 rounded-xl shadow-2xl">
//             <div className="text-[#FFD36B] font-semibold mb-2">
//               e Gold
//             </div>
//             <div className="text-gray-300 text-sm">
//               Digital Gold by CaratLane
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// /* ================= GOLD BENEFITS ================= */

// const GoldBenefits = () => {
//   const items = [
//     {
//       title: "Unparalleled convenience",
//       desc: "Buy in-store or online 24x7. Purchase gold online or offline through one of our jewellery stores.",
//     },
//     {
//       title: "What you buy is what you get",
//       desc: "No carrying cost or hidden charges. Every gram of CaratLane eGold you buy online is backed by real gold deposits.",
//     },
//     {
//       title: "100% guaranteed buyback",
//       desc: "Redeem your CaratLane eGold balance across our 300+ online stores and physical outlets.",
//     },
//   ];

//   return (
//     <section className="py-16 px-4 md:px-16">
//       <div className="grid md:grid-cols-2 gap-12 items-center">

//         {/* LEFT TEXT */}
//         <div>
//           <p className="text-sm text-purple-500 mb-3">Know More</p>

//           <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">
//             Invest in a high-payoff digital gold. Buy, sell, or redeem your
//             CaratLane eGold in exchange for beautiful jewellery.
//           </h2>

//           <div className="flex items-center gap-6">
//             <button className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#C04DD9] to-[#6F5BFF] hover:opacity-90">
//               Buy eGold Now
//             </button>

//             <button className="flex items-center gap-2 text-[#4E0756] font-medium">
//               How to redeem?
//               <span>⌄</span>
//             </button>
//           </div>
//         </div>

//         {/* RIGHT FEATURES */}
//         <div className="space-y-8">
//           {items.map((item, i) => (
//             <div key={i} className="flex gap-4">
//               <div className="text-2xl">✨</div>
//               <div>
//                 <h4 className="font-semibold text-[#4E0756]">
//                   {item.title}
//                 </h4>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {item.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// /* ================= REDEMPTION SECTION ================= */

// const GoldRedemption = () => {
//   const steps = [
//     "Choose your favorite jewellery from CaratLane",
//     "Redeem your CaratLane eGold at checkout",
//     "Get your jewellery delivered for free at your doorstep",
//   ];

//   return (
//     <section className="bg-[#faf8fc] py-16 px-4 md:px-16">
//       <div className="max-w-6xl mx-auto">

//         <p className="text-sm text-purple-500 mb-2">Redeem</p>

//         <h2 className="text-2xl md:text-3xl font-semibold mb-10">
//           eGold to jewellery, in a blink!
//         </h2>

//         <div className="grid md:grid-cols-4 gap-8 items-center">

//           {/* STEPS */}
//           {steps.map((step, i) => (
//             <div key={i} className="text-center">
//               <div className="text-3xl mb-3">💎</div>
//               <p className="text-sm text-gray-600">{step}</p>
//             </div>
//           ))}

//           {/* VAULT CARD */}
//           <div className="bg-white p-6 rounded-xl shadow-sm border">
//             <div className="text-3xl mb-2">🔒</div>
//             <h4 className="font-semibold text-[#4E0756] mb-1">
//               Visit Vault
//             </h4>
//             <p className="text-sm text-gray-600 mb-3">
//               Check your gold balance
//             </p>
//             <button className="text-purple-600 font-medium text-sm">
//               Login to view →
//             </button>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// /* ================= GOLD FAQ & CALLBACK ================= */

// /* ================= GOLD FAQ & CALLBACK ================= */

// const GoldFAQ = () => {
//   const faqSections = [
//     {
//       title: "General",
//       items: [
//         "What is digital gold?",
//         "What is CaratLane Digital Gold?",
//         "Why should I buy CaratLane Digital Gold?",
//         "How to buy CaratLane Digital Gold?",
//         "Where will the Digital Gold be stored after I buy it?",
//         "What is the purity of gold bought under CaratLane Digital Gold?",
//         "Why are the CaratLane Digital Gold rates different from jewellery gold rates?",
//         "Who can I contact for account queries?",
//         "Is my CaratLane Digital Gold kept in safe custody?",
//         "Is the Physical Vault insured?",
//         "What is the role of the external administrator?",
//         "What happens if CaratLane goes into liquidation?",
//         "Is there an automatic saving plan?",
//         "What happens in the unlikely event of my death?",
//         "Will my digital gold balance be affected by rate fluctuations?",
//       ],
//     },

//     {
//       title: "Buy",
//       items: [
//         "How do I buy CaratLane Digital Gold?",
//         "What is the minimum and maximum gold amount I can purchase?",
//         "Where is the gold stored post buying?",
//         "What is the purity of gold bought under CaratLane Digital Gold?",
//         "Does the price include GST?",
//         "Why are Digital Gold rates different from jewellery gold rates?",
//         "Where can I find my gold balance and purchase details?",
//         "Where can I find invoices of my past purchases?",
//         "What are the KYC requirements for Digital Gold?",
//       ],
//     },

//     {
//       title: "Sell",
//       items: [
//         "How do I sell my gold?",
//         "Is there any lock-in period to sell gold?",
//         "How long will it take to receive money in my bank account?",
//         "Why is buy and sell price different on the same day?",
//       ],
//     },

//     {
//       title: "Exchange",
//       items: [
//         "How can I exchange my Digital Gold for physical jewellery?",
//         "Why am I not able to match gram-to-gram for the jewellery I am exchanging?",
//         "Why do I have to pay GST when buying jewellery after purchasing Digital Gold?",
//         "Is there any lock-in period to exchange Digital Gold for jewellery?",
//         "What is the minimum gold amount required to exchange for jewellery?",
//       ],
//     },
//   ];

//   return (
//     <section className="py-16 px-4 md:px-16">

//       {/* CALLBACK SECTION */}
//       <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

//         <div>
//           <p className="text-sm text-purple-500 mb-3">
//             Got questions? We have all the answers!
//           </p>

//           <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
//             Have questions about CaratLane eGold?
//             Share your number and we will call you back!
//           </h2>
//         </div>

//         <div className="bg-[#faf8fc] p-8 rounded-xl">
//           <div className="text-3xl mb-3">📞</div>
//           <p className="text-sm text-gray-600 mb-3">
//             At Your Service. Always.
//           </p>

//           <input
//             type="text"
//             placeholder="Mobile Number"
//             className="w-full border rounded-md px-4 py-3 mb-4 outline-none focus:border-purple-400"
//           />

//           <button className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-[#C04DD9] to-[#6F5BFF] hover:opacity-90">
//             Request Call Back
//           </button>
//         </div>
//       </div>

//       {/* FAQ SECTIONS */}
//       <div className="space-y-10">
//         {faqSections.map((section, i) => (
//           <div key={i}>
//             <h3 className="font-semibold text-lg mb-4">{section.title}</h3>

//             <div className="divide-y border rounded-lg">
//               {section.items.map((q, index) => (
//                 <details key={index} className="group">
//                   <summary className="cursor-pointer list-none flex justify-between items-center p-4 text-sm">
//                     {q}
//                     <span className="transition group-open:rotate-45 text-lg">+</span>
//                   </summary>

//                   <div className="px-4 pb-4 text-sm text-gray-600">
//                     Answer content goes here.
//                   </div>
//                 </details>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//     </section>
//   );
// };

// /* ================= MAIN PAGE ================= */

// const Gold = () => {
//   return (
//     <div className="min-h-screen bg-white text-[#333]">
//       <main className="px-5 space-y-8">

//         <GoldHero />

//         <GoldBenefits />

//         <GoldRedemption />

//         <GoldFAQ />

//       </main>
//     </div>
//   );
// };

// export default Gold;