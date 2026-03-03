import React from "react";

/* ================= HERO SECTION ================= */

const GoldHero = () => {
  return (
    <section className="relative overflow-hidden rounded-[16px] my-8 bg-black">
      
      {/* luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">

        {/* LEFT CONTENT */}
        <div className="text-white max-w-xl text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            CaratLane Digital Gold
          </h1>

          <p className="text-gray-300 mb-8">
            Invest in Pure 24K Gold Online - 100% Safe & Trustworthy
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#C04DD9] to-[#6F5BFF] hover:opacity-90 transition">
              Buy Now
            </button>

            <button className="text-white flex items-center gap-2 hover:opacity-80">
              Learn more
              <span className="text-lg">⌄</span>
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL AREA */}
        <div className="mt-10 md:mt-0 flex items-end gap-6">

          {/* rings */}
          <img
            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80"
            alt="rings"
            className="h-40 object-contain"
          />

          {/* earrings */}
          <img
            src="https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=400&q=80"
            alt="earrings"
            className="h-32 object-contain"
          />

          {/* digital gold card */}
          <div className="hidden md:block bg-gradient-to-br from-[#2c2038] to-[#6f4c8b] p-6 rounded-xl shadow-2xl">
            <div className="text-[#FFD36B] font-semibold mb-2">
              e Gold
            </div>
            <div className="text-gray-300 text-sm">
              Digital Gold by CaratLane
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ================= GOLD BENEFITS ================= */

const GoldBenefits = () => {
  const items = [
    {
      title: "Unparalleled convenience",
      desc: "Buy in-store or online 24x7. Purchase gold online or offline through one of our jewellery stores.",
    },
    {
      title: "What you buy is what you get",
      desc: "No carrying cost or hidden charges. Every gram of CaratLane eGold you buy online is backed by real gold deposits.",
    },
    {
      title: "100% guaranteed buyback",
      desc: "Redeem your CaratLane eGold balance across our 300+ online stores and physical outlets.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div>
          <p className="text-sm text-purple-500 mb-3">Know More</p>

          <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">
            Invest in a high-payoff digital gold. Buy, sell, or redeem your
            CaratLane eGold in exchange for beautiful jewellery.
          </h2>

          <div className="flex items-center gap-6">
            <button className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#C04DD9] to-[#6F5BFF] hover:opacity-90">
              Buy eGold Now
            </button>

            <button className="flex items-center gap-2 text-[#4E0756] font-medium">
              How to redeem?
              <span>⌄</span>
            </button>
          </div>
        </div>

        {/* RIGHT FEATURES */}
        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-2xl">✨</div>
              <div>
                <h4 className="font-semibold text-[#4E0756]">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ================= REDEMPTION SECTION ================= */

const GoldRedemption = () => {
  const steps = [
    "Choose your favorite jewellery from CaratLane",
    "Redeem your CaratLane eGold at checkout",
    "Get your jewellery delivered for free at your doorstep",
  ];

  return (
    <section className="bg-[#faf8fc] py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">

        <p className="text-sm text-purple-500 mb-2">Redeem</p>

        <h2 className="text-2xl md:text-3xl font-semibold mb-10">
          eGold to jewellery, in a blink!
        </h2>

        <div className="grid md:grid-cols-4 gap-8 items-center">

          {/* STEPS */}
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-3">💎</div>
              <p className="text-sm text-gray-600">{step}</p>
            </div>
          ))}

          {/* VAULT CARD */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold text-[#4E0756] mb-1">
              Visit Vault
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Check your gold balance
            </p>
            <button className="text-purple-600 font-medium text-sm">
              Login to view →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ================= GOLD FAQ & CALLBACK ================= */

/* ================= GOLD FAQ & CALLBACK ================= */

const GoldFAQ = () => {
  const faqSections = [
    {
      title: "General",
      items: [
        "What is digital gold?",
        "What is CaratLane Digital Gold?",
        "Why should I buy CaratLane Digital Gold?",
        "How to buy CaratLane Digital Gold?",
        "Where will the Digital Gold be stored after I buy it?",
        "What is the purity of gold bought under CaratLane Digital Gold?",
        "Why are the CaratLane Digital Gold rates different from jewellery gold rates?",
        "Who can I contact for account queries?",
        "Is my CaratLane Digital Gold kept in safe custody?",
        "Is the Physical Vault insured?",
        "What is the role of the external administrator?",
        "What happens if CaratLane goes into liquidation?",
        "Is there an automatic saving plan?",
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
        "Does the price include GST?",
        "Why are Digital Gold rates different from jewellery gold rates?",
        "Where can I find my gold balance and purchase details?",
        "Where can I find invoices of my past purchases?",
        "What are the KYC requirements for Digital Gold?",
      ],
    },

    {
      title: "Sell",
      items: [
        "How do I sell my gold?",
        "Is there any lock-in period to sell gold?",
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
    <section className="py-16 px-4 md:px-16">

      {/* CALLBACK SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

        <div>
          <p className="text-sm text-purple-500 mb-3">
            Got questions? We have all the answers!
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
            Have questions about CaratLane eGold?
            Share your number and we will call you back!
          </h2>
        </div>

        <div className="bg-[#faf8fc] p-8 rounded-xl">
          <div className="text-3xl mb-3">📞</div>
          <p className="text-sm text-gray-600 mb-3">
            At Your Service. Always.
          </p>

          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full border rounded-md px-4 py-3 mb-4 outline-none focus:border-purple-400"
          />

          <button className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-[#C04DD9] to-[#6F5BFF] hover:opacity-90">
            Request Call Back
          </button>
        </div>
      </div>

      {/* FAQ SECTIONS */}
      <div className="space-y-10">
        {faqSections.map((section, i) => (
          <div key={i}>
            <h3 className="font-semibold text-lg mb-4">{section.title}</h3>

            <div className="divide-y border rounded-lg">
              {section.items.map((q, index) => (
                <details key={index} className="group">
                  <summary className="cursor-pointer list-none flex justify-between items-center p-4 text-sm">
                    {q}
                    <span className="transition group-open:rotate-45 text-lg">+</span>
                  </summary>

                  <div className="px-4 pb-4 text-sm text-gray-600">
                    Answer content goes here.
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

/* ================= MAIN PAGE ================= */

const Gold = () => {
  return (
    <div className="min-h-screen bg-white text-[#333]">
      <main className="px-5 space-y-8">

        <GoldHero />

        <GoldBenefits />

        <GoldRedemption />

        <GoldFAQ />

      </main>
    </div>
  );
};

export default Gold;