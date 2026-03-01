import React from "react";
import "./header.scss";

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const StoreIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const GoldIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" opacity="0.9" />
    </svg>
);

const NAV_ITEMS = [
    "Rings",
    "Earrings",
    "Bracelets & Bangles",
    "Solitaires",
    "Mangalsutras",
    "Necklaces & Pendants",
    "Silver by Shaya",
    "Gifting",
    "Collections",
    "More Jewellery",
    "Trending",
];

const Header = () => (
    <header className="w-full shadow-sm">
        {/* Top Light Header */}
        <div
            className="flex items-center justify-between h-[70px] px-6"
            style={{ backgroundColor: "#FFFFFF" }}
        >
            <div className="w-full mx-auto flex items-center justify-between gap-4">
                {/* Left */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div
                        className="w-8 h-8 rounded-full flex-shrink-0 bg-[#5b2c6f] overflow-hidden"
                        aria-hidden
                    />
                    <form className="flex items-center flex-1 h-[40px] max-w-[520px] min-w-0" role="search">
                        <div className="flex w-full h-full rounded-[13px] bg-white overflow-hidden">
                            <input
                                type="search"
                                placeholder="Search"
                                className="flex-1 min-w-0 pl-5 pr-3 rounded-[13px_0_0_13px] border border-[#e56eeb] text-sm text-[#333] placeholder-[#9ca3af] outline-none bg-transparent"
                                style={{ padding: "0 15px 0 26px" }}
                                aria-label="Search"
                            />
                            <button
                                type="submit"
                                className="w-12 flex-shrink-0 flex items-center justify-center text-white transition-colors duration-200 hover:opacity-90"
                                style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
                                aria-label="Submit search"
                            >
                                <SearchIcon />
                            </button>
                        </div>
                    </form>
                    {/* Center action buttons - hidden on small */}
                    <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                        <button
                            type="button"
                            className="css-1fs27mr"
                        >
                            <svg className="w-5 h-5" fill="#4F3267" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2zm4 14H6v-2h12v2zm0-4H6v-2h12v2z" />
                            </svg>
                            <span className="text-sm font-bold">Treasure Chest</span>
                            <span className="badge">
                                NEW
                            </span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-red-500 bg-white text-[#333] transition-colors duration-200 hover:bg-red-50"
                        >
                            <StoreIcon />
                            <span>Stores</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border border-amber-400 bg-[#fffbe6] text-[#333] transition-colors duration-200 hover:bg-amber-50"
                        >
                            <GoldIcon />
                            <span>Gold</span>
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="hidden lg:block text-right">
                        <p className="text-xs text-[#6b7280] leading-tight">Delivery & Stores</p>
                        <button type="button" className="text-sm font-medium transition-colors duration-200 hover:opacity-80" style={{ color: "#a855f7" }}>
                            Enter Pincode
                        </button>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6f3f9] text-sm text-[#333] transition-colors duration-200"
                    >
                        <span className="text-base" aria-hidden>🇮🇳</span>
                        <span>ENG</span>
                        <ChevronDownIcon />
                    </button>
                    <button type="button" className="p-1 text-[#5b2c6f] transition-colors duration-200 hover:opacity-70" aria-label="Account">
                        <span style={{ color: "#4f3267" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" style={{ fill: "#4f3267" }}>
                                <path d="M234-276q51-39 114-61.5T480-360t132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800t-226.5 93.5T160-480q0 59 19.5 111t54.5 93m246-164q-59 0-99.5-40.5T340-580t40.5-99.5T480-720t99.5 40.5T620-580t-40.5 99.5T480-440m0 360q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80"></path>
                            </svg>
                        </span>
                    </button>
                    <button type="button" className="p-1 text-[#5b2c6f] transition-colors duration-200 hover:opacity-70" aria-label="Wishlist">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" style={{ fill: "#4f3267" }}>
                            <path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5"></path>
                        </svg>
                    </button>
                    <button className="links css-dpoqzr" aria-labelledby="takestocart" name="cartlink">
                        <span className="css-133bxhf">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F3267" viewBox="0 -960 960 960" style={{ color: "#4f3267" }}>
                                <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47 113 47 47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80zm160-640h160q0-33-23.5-56.5T480-800t-56.5 23.5T400-720m200 200q17 0 28.5-11.5T640-560v-80h-80v80q0 17 11.5 28.5T600-520m-240 0q17 0 28.5-11.5T400-560v-80h-80v80q0 17 11.5 28.5T360-520"></path>
                            </svg>
                            <span className="css-16zwby6">+</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>

        {/* Bottom Navigation Bar */}
        <nav
            className="flex items-center h-12 px-6"
            style={{ backgroundColor: "#5b2c6f" }}
            aria-label="Main navigation"
        >
            <div className="w-full mx-auto flex items-center justify-between gap-4 overflow-hidden">
                <div className="flex items-center gap-8 overflow-x-auto min-h-[48px] py-2">
                    {NAV_ITEMS.map((label) => (
                        <a
                            key={label}
                            href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex-shrink-0 text-sm font-medium text-white whitespace-nowrap transition-colors duration-200 hover:text-white/90 hover:underline"
                        >
                            {label}
                        </a>
                    ))}
                </div>
                <button
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-1 rounded-full border border-white text-white text-sm font-medium flex-shrink-0 transition-colors duration-200 hover:bg-white/10"
                >
                    <span>Services</span>
                    <ChevronDownIcon />
                </button>
            </div>
        </nav>
    </header>
);

export default Header;
