import React from "react";

/* ================= STORE HERO ================= */

const StoreHero = () => {
  return (
    <section className="relative overflow-hidden rounded-[16px] my-8">

      {/* background map */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png)",
        }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-[#2f3e46]/80" />

      <div className="relative z-10 text-center px-6 py-20 text-white">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Find a store near you
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10">
          Find a CaratLane store in your locality, the CaratLane family is growing everyday
        </p>

        {/* search box */}
        <div className="max-w-xl mx-auto bg-white rounded-xl flex items-center px-4 py-3 shadow-lg">

          <span className="text-[#6A3EC7] mr-3 text-xl">📍</span>

          <input
            type="text"
            placeholder="Enter Pincode or City"
            className="flex-1 outline-none text-[#333]"
          />

          <button className="text-[#C04DD9] font-semibold">
            Locate Me
          </button>
        </div>
      </div>
    </section>
  );
};

/* ================= POPULAR CITIES ================= */

const StoreCities = () => {
  const cities = [
    { name: "Mumbai", stores: "26 Stores" },
    { name: "Delhi", stores: "25 Stores" },
    { name: "Bangalore", stores: "30 Stores" },
    { name: "Pune", stores: "11 Stores" },
    { name: "Kolkata", stores: "17 Stores" },
    { name: "Chennai", stores: "14 Stores" },
    { name: "Ahmedabad", stores: "7 Stores" },
  ];

  return (
    <section className="py-6">
      <div className="flex flex-wrap justify-center gap-4">
        {cities.map((city, i) => (
          <div
            key={i}
            className="border rounded-xl px-6 py-4 text-center hover:shadow-md transition cursor-pointer"
          >
            <div className="text-2xl mb-2">🏛️</div>
            <p className="font-medium text-sm">{city.name}</p>
            <p className="text-xs text-gray-500">{city.stores}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ================= STORE SERVICES ================= */

const StoreServices = () => {
  const services = [
    {
      title: "Old Gold Exchange",
      desc: "It can be any gold jewellery",
      img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
    },
    {
      title: "Buy Online, Pick-up in Store",
      desc: "Save time, pickup and go",
      img: "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=600",
    },
    {
      title: "In-Store Customization",
      desc: "Made-to-order and personalised for you",
      img: "https://images.unsplash.com/photo-1596944925780-2e1d969b2a8c?w=600",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-semibold text-[#4E0756] mb-10">
        CaratLane Special In-Store Services
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={i} className="text-center">
            <img
              src={s.img}
              alt={s.title}
              className="rounded-xl h-64 w-full object-cover"
            />
            <h4 className="mt-4 font-semibold">{s.title}</h4>
            <p className="text-sm text-gray-500">{s.desc}</p>
            <button className="mt-2 px-5 py-2 rounded-full bg-[#6A3EC7] text-white text-sm">
              Find Store
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ================= STORE QUESTIONS ================= */

const StoreQuestions = () => {
  const faqs = [
    "Is there any difference in prices online and in store?",
    "How will I know if the design I like is available near me?",
    "Can I exchange my gold jewellery at any CaratLane store?",
    "Is CaratLane jewellery made of real gold and diamonds?",
  ];

  return (
    <section className="bg-[#faf8fc] py-14 px-6 rounded-xl">
      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT CONTACT */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Have some Questions?
          </h2>

          <div className="bg-white p-4 rounded-lg shadow-sm inline-flex items-center gap-3">
            <span className="text-xl text-[#6A3EC7]">📞</span>
            <div>
              <p className="text-sm">Just give us a call at</p>
              <p className="text-[#6A3EC7] font-medium">
                +91-44-42935000
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FAQ */}
        <div className="divide-y">
          {faqs.map((q, i) => (
            <details key={i} className="py-3 group">
              <summary className="flex justify-between cursor-pointer text-sm">
                {q}
                <span className="group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-2">
                Answer content goes here.
              </p>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ================= STORE PAGE ================= */

const Stores = () => {
  return (
    <div className="min-h-screen bg-white text-[#333]">
      <main className="px-5 space-y-8">

        <StoreHero />

        <StoreCities />

        <StoreServices />

        <StoreQuestions />

      </main>
    </div>
  );
};

export default Stores;