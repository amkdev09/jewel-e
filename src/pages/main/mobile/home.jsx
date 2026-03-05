import React from "react";

const HomeMobile = () => {
  return (
    <main className="pt-[80px] pb-[72px] px-4">
      <section className="mb-6">
        <h1 className="text-xl font-semibold text-[#4f3267] mb-1">
          Discover jewellery you&apos;ll love
        </h1>
        <p className="text-sm text-gray-600">
          Curated designs, made for mobile browsing.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <article className="rounded-xl bg-gradient-to-br from-[#f8ebfb] to-[#e5ddff] p-3">
          <p className="text-xs font-medium text-[#4f3267] mb-1">
            For everyday
          </p>
          <p className="text-sm font-semibold text-[#231535]">New arrivals</p>
        </article>
        <article className="rounded-xl bg-gradient-to-br from-[#fff6d8] to-[#ffe4c4] p-3">
          <p className="text-xs font-medium text-[#4f3267] mb-1">
            Occasions
          </p>
          <p className="text-sm font-semibold text-[#231535]">Wedding picks</p>
        </article>
      </section>
    </main>
  );
};

export default HomeMobile;