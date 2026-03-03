import React, { useState } from "react";

/* ---------------- ICON HELPER ---------------- */

const ICON = ({ d, className = "w-4 h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d={d} />
    </svg>
);

/* ---------------- TRUST BADGE ---------------- */

const TrustBadge = ({ text }) => (
    <span className="bg-white px-4 py-2 rounded-full shadow text-sm">
        ✔ {text}
    </span>
);

/* ---------------- PLAN CARD ---------------- */

const PlanCard = ({
    title,
    icon,
    highlight,
    features,
    popular,
    bg,
    border,
    accent,
    textColor,
}) => (
    <div
        className="relative rounded-2xl p-6 md:p-8 shadow-md flex flex-col justify-between"
        style={{ background: bg, border: `1px solid ${border}` }}
    >
        {popular && (
            <span className="absolute top-4 right-4 bg-[#6B4B2A] text-white text-xs px-3 py-1 rounded-full font-medium">
                MOST POPULAR
            </span>
        )}

        <div>
            <h3
                className="flex items-center gap-2 text-xl font-semibold mb-4"
                style={{ color: textColor }}
            >
                {icon} {title}
            </h3>

            <div
                className="inline-block px-4 py-2 rounded-lg text-sm font-semibold mb-5 text-black"
                style={{ background: accent }}
            >
                {highlight}
            </div>

            <ul className="space-y-3 text-sm text-[#333]">
                {features.map((f, i) => (
                    <li key={i} className="flex gap-2 items-start">
                        <span className="text-green-600 mt-[2px]">✔</span>
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
        </div>

        <button className="mt-8 w-full bg-white hover:bg-gray-50 transition rounded-lg py-3 font-semibold border text-[#333]">
            START PLAN →
        </button>
    </div>
);

/* ---------------- HERO / HEADER ---------------- */

const TreasureHero = () => (
    <section className="text-center py-16 px-4 bg-gradient-to-b from-[#f3eaff] to-[#fff6e6] rounded-[24px]">
        <p className="text-xl md:text-2xl font-semibold text-[#5B2C6F]">
            Pay 9 Instalments
        </p>
        <p className="text-lg md:text-xl text-[#7D3C98]">
            Get the 10th Month Free!
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
            <TrustBadge text="Trust of TATA" />
            <TrustBadge text="Assured Bonus" />
            <TrustBadge text="Flexible Redemption" />
        </div>
    </section>
);

/* ---------------- PLAN SECTION ---------------- */

const TreasurePlans = () => (
    <section className="py-12 px-4 md:px-10">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

            <PlanCard
                title="EDGE"
                icon="👑"
                highlight="10th Month Free + Gold Value"
                features={[
                    "Pay 9 instalments & get the 10th free",
                    "Instalment value converted as per gold rate",
                    "Buy any jewellery after 10th month",
                ]}
                popular
                bg="#F7E7B7"
                border="#E4D08F"
                accent="#D4AF37"
                textColor="#7A5C00"
            />

            <PlanCard
                title="ICON"
                icon="💎"
                highlight="10th Month Free"
                features={[
                    "Pay 9 instalments & get the 10th free",
                    "Buy any jewellery after 10th month",
                ]}
                bg="#EDE3FF"
                border="#D7C9FF"
                accent="#9B6BFF"
                textColor="#6A3EC7"
            />

        </div>
    </section>
);

const TreasureCalculator = () => {
  const [amount, setAmount] = useState(5000);
  const [percent, setPercent] = useState(5);

  const goldRate = 17145;

  const totalPaid = amount * 9;
  const bonus = amount;
  const goldReturn = Math.round((totalPaid * percent) / 100);
  const edgeValue = totalPaid + goldReturn + bonus;
  const iconValue = totalPaid + bonus;

  const increase = () => setAmount((a) => a + 500);
  const decrease = () => setAmount((a) => Math.max(500, a - 500));

  return (
    <section className="py-16 px-4 md:px-10">
      <h2 className="text-center text-2xl font-semibold text-[#4E0756] mb-8">
        Calculate & Compare Plans
      </h2>

      {/* Installment Selector */}
      <div className="max-w-xl mx-auto border rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm text-gray-500">Your Monthly Instalment</p>
          <p className="text-2xl font-semibold text-[#4E0756]">
            ₹{amount.toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={decrease}
            className="w-10 h-10 rounded-full border text-xl text-[#6A3EC7]"
          >
            −
          </button>
          <button
            onClick={increase}
            className="w-10 h-10 rounded-full border text-xl text-[#6A3EC7]"
          >
            +
          </button>
        </div>
      </div>

      {/* Gold Rate */}
      <p className="text-center text-sm mt-4 text-gray-600">
        <span className="text-red-400 mr-2">●</span>
        Current 24KT Gold Rate: <strong>₹{goldRate}</strong>
      </p>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="bg-[#f3eef9] text-left p-4">Benefits</th>
              <th className="bg-[#8B5E2A] text-white p-4">👑 EDGE</th>
              <th className="bg-[#7A3FB5] text-white p-4">💎 ICON</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4 bg-[#f9f7fc]">You Pay 9 Instalments</td>
              <td className="p-4 text-center bg-[#f6edd8] font-medium">
                ₹{totalPaid.toLocaleString()}
              </td>
              <td className="p-4 text-center bg-[#f1ebfb] font-medium">
                ₹{totalPaid.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4 bg-[#f9f7fc]">
                Gold Value Returns*
                <div className="text-xs text-gray-500">
                  Adjust slider to see approx returns
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="w-full mt-3 accent-yellow-500"
                />
                <div className="text-center text-xs mt-1">{percent}%</div>
              </td>

              <td className="p-4 text-center bg-[#f6edd8] font-medium">
                ₹{goldReturn.toLocaleString()}*
              </td>

              <td className="p-4 text-center bg-[#f1ebfb]">
                Not Available
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4 bg-[#f9f7fc]">
                CaratLane Discount (10th Month)
              </td>
              <td className="p-4 text-center bg-[#f6edd8] font-medium">
                ₹{bonus.toLocaleString()}
              </td>
              <td className="p-4 text-center bg-[#f1ebfb] font-medium">
                ₹{bonus.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4 bg-[#f9f7fc] font-medium">
                Buy Jewellery Worth
              </td>
              <td className="p-4 text-center bg-[#f1e3b6] font-semibold">
                ₹{edgeValue.toLocaleString()}*
              </td>
              <td className="p-4 text-center bg-[#e7dcfb] font-semibold">
                ₹{iconValue.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-center text-[#6A3EC7] mt-4 max-w-3xl mx-auto">
        *This example reflects potential benefits if gold prices increase.
        In case of a drop in gold rates, the difference will be borne by the
        customer.
      </p>
    </section>
  );
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="text-[#4E0756]">{question}</span>
        <span className="text-xl">{open ? "−" : "⌄"}</span>
      </button>

      {open && (
        <p className="pb-4 text-sm text-gray-600">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQGroup = ({ title, items }) => (
  <div className="bg-white rounded-2xl border p-6">
    <h3 className="font-semibold text-[#4E0756] mb-4">{title}</h3>

    {items.map((item, i) => (
      <FAQItem key={i} {...item} />
    ))}
  </div>
);

const TreasureFAQSection = () => {
  const [tab, setTab] = useState("faq");

  const edgeFAQs = [
    { question: "What is CaratLane Treasure Chest Edge Scheme?", answer: "It allows you to pay for 9 months and receive benefits on redemption." },
    { question: "What are the benefits of the scheme?", answer: "You receive the 10th installment benefit plus gold value advantage." },
    { question: "Can I switch schemes during the term?", answer: "Switching is not permitted once enrolled." },
    { question: "Can I cancel the scheme?", answer: "Cancellation rules depend on tenure completed." },
    { question: "Which products are eligible?", answer: "Most jewellery except coins and select categories." },
    { question: "Can I redeem for gold coins?", answer: "Coins and some categories may be excluded." },
  ];

  const cancellationFAQs = [
    {
      question: "Can I cancel my Treasure plan anytime?",
      answer: "Yes, but benefits may vary based on payment completion."
    }
  ];

  return (
    <section className="py-16 px-4 md:px-10 bg-[#faf8fc]">
      {/* Toggle Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-[#e9e1f5] rounded-full p-1">
          <button
            onClick={() => setTab("faq")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              tab === "faq" ? "bg-white shadow" : ""
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setTab("terms")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              tab === "terms" ? "bg-white shadow" : ""
            }`}
          >
            Terms & Conditions
          </button>
        </div>
      </div>

      {tab === "faq" ? (
        <div className="max-w-4xl mx-auto space-y-6">
          <FAQGroup title="Cancellation/Refund" items={cancellationFAQs} />
          <FAQGroup title="CaratLane Treasure Chest Edge" items={edgeFAQs} />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-sm text-gray-600 bg-white p-6 rounded-2xl border">
          Terms & conditions content goes here. You can add redemption rules,
          eligibility, and plan policies.
        </div>
      )}
    </section>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const Treasure = () => {
    return (
        <div className="min-h-screen bg-white text-[#333]">
            <main className="px-5 space-y-8">

                <TreasureHero />

                <TreasurePlans />

                <TreasureCalculator />

                <TreasureFAQSection />

            </main>
        </div>
    );
};

export default Treasure;