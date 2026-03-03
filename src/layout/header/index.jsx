import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import { PiStorefront } from "react-icons/pi";

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const GoldIcon = ({ className }) => (
    <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 24 24">
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

const MEGA_FEATURED = ["Latest Designs", "Bestsellers", "Fast Delivery", "Special Deals"];
const MEGA_BY_STYLE = ["All Rings", "Engagement", "Dailywear", "Infinity", "Cocktail", "Solitaire", "Couple Rings", "Bands", "Promise Rings", "Silver By Shaya"];
const MEGA_METAL_STONE = [
    { label: "Diamond", color: "#e5e7eb" },
    { label: "Pearl", color: "#f3e8ff" },
    { label: "Navratna", color: "#e5e7eb" },
    { label: "Gemstone", color: "#e5e7eb" },
    { label: "Platinum", color: "#9ca3af" },
    { label: "Gold", color: "#fbbf24" },
    { label: "Rose Gold", color: "#f9a8d4" },
    { label: "Yellow Gold", color: "#fbbf24" },
    { label: "White Gold", color: "#e5e7eb" },
    { label: "22KT Gold", color: "#fbbf24" },
];
const MEGA_BY_PRICE = ["Under ₹ 10k", "₹ 10k - ₹ 20k", "₹ 20k - ₹ 30k", "₹ 30k - ₹ 50k", "₹ 40k - ₹ 50k", "₹ 50k - ₹ 75k", "₹ 75k & Above"];
const MEGA_TABS = ["For Women", "For Men", "For Kids"];
const MEGA_CARDS = [
    { label: "Message Bands", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80" },
    { label: "Postcards", image: "https://images.unsplash.com/photo-1515562141207-7a888e73e82f?w=400&q=80" },
];

const JewelleryLink = ({ to, children, className = "" }) => (
    <Link to={to} className={className}>{children}</Link>
);

const MegaMenu = ({ isOpen, onClose, onEnterPanel }) => {
    const [activeTab, setActiveTab] = useState("For Women");
    const panelRef = useRef(null);

    const handleMouseLeave = useCallback(() => {
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="absolute left-0 right-0 z-40 bg-white shadow-lg"
            style={{ top: "100%", boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
            ref={panelRef}
            onMouseEnter={onEnterPanel}
            onMouseLeave={handleMouseLeave}
        >
            <div className="px-6 py-8">
                <div className="flex gap-10">
                    {/* Four columns */}
                    <div className="flex gap-10 flex-1 min-w-0">
                        <div>
                            <h3 className="text-sm font-bold text-[#3E006A] mb-4">Featured</h3>
                            <ul className="space-y-2.5">
                                {MEGA_FEATURED.map((item) => (
                                    <li key={item}>
                                        <JewelleryLink to="/jewellery" className="block text-sm text-[#4b5563] hover:text-[#3E006A] transition-colors duration-200">
                                            {item}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#3E006A] mb-4">By Style</h3>
                            <ul className="space-y-2.5">
                                {MEGA_BY_STYLE.map((item, i) => (
                                    <li key={item}>
                                        <JewelleryLink
                                            to="/jewellery"
                                            className={`block text-sm text-[#4b5563] hover:text-[#3E006A] transition-colors duration-200 ${i === 0 ? "font-bold text-[#1f2937]" : ""}`}
                                        >
                                            {item}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#3E006A] mb-4">By Metal & Stone</h3>
                            <ul className="space-y-2.5">
                                {MEGA_METAL_STONE.map(({ label, color }) => (
                                    <li key={label} className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} aria-hidden />
                                        <JewelleryLink to="/jewellery" className="text-sm text-[#4b5563] hover:text-[#3E006A] transition-colors duration-200">
                                            {label}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-[#3E006A] mb-4">By Price</h3>
                            <ul className="space-y-2.5">
                                {MEGA_BY_PRICE.map((item) => (
                                    <li key={item}>
                                        <JewelleryLink to="/jewellery" className="block text-sm text-[#4b5563] hover:text-[#3E006A] transition-colors duration-200">
                                            {item}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Two image cards */}
                    <div className="flex gap-4 flex-shrink-0">
                        {MEGA_CARDS.map(({ label, image }) => (
                            <JewelleryLink key={label} to="/jewellery" className="block w-[200px] rounded-xl overflow-hidden bg-[#f6f3f9] transition-opacity duration-200 hover:opacity-90">
                                <div className="aspect-[4/5] bg-[#f6f3f9]">
                                    <img src={image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-center text-sm text-[#4b5563] py-3 font-medium">{label}</p>
                            </JewelleryLink>
                        ))}
                    </div>
                </div>
                {/* Bottom tabs */}
                <div className="flex border-t border-[#e5e7eb] mt-6 pt-4 -mx-1">
                    {MEGA_TABS.map((tab, i) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-200 border-l border-[#e5e7eb] first:border-l-0 ${activeTab === tab
                                ? "bg-[#EBE6F3] text-[#3E006A]"
                                : "text-[#3E006A] hover:bg-[#f9fafb] bg-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    const [activeNavItem, setActiveNavItem] = useState(null);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const navTimeoutRef = useRef(null);
    const accountDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountDropdownRef.current && !accountDropdownRef.current.contains(e.target)) {
                setAccountDropdownOpen(false);
            }
        };
        if (accountDropdownOpen) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => document.removeEventListener("click", handleClickOutside);
    }, [accountDropdownOpen]);

    const openMega = (label) => {
        if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
        setActiveNavItem(label);
        setMegaMenuOpen(true);
    };

    const closeMega = useCallback(() => {
        navTimeoutRef.current = setTimeout(() => {
            setActiveNavItem(null);
            setMegaMenuOpen(false);
        }, 100);
    }, []);

    const cancelClose = () => {
        if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };

    return (
        <header className="w-full shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-b-2 border-[#e5e7eb]">
            {/* Top Light Header */}
            <div
                className="flex items-center justify-between h-[70px] px-[2.725rem] w-full"
                style={{ backgroundColor: "#FFFFFF" }}
            >
                {/* Left */}
                <div className="flex items-center gap-4 min-w-0 w-[70%]">
                    <div
                        className="w-8 h-8 rounded-full flex-shrink-0 bg-[#5b2c6f] overflow-hidden"
                        aria-hidden
                    />
                    <form className="flex items-center h-[40px] flex-1" role="search">
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
                        <Link to={'/treasure'}>
                        <button
                            type="button"
                            className="css-1fs27mr border border-solid border-[#DE57E5] bg-[#F8EBFB]"
                        >
                            <span className="relative flex items-center">
                                <svg className="w-5 h-5" fill="#4F3267" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2zm4 14H6v-2h12v2zm0-4H6v-2h12v2z" />
                                </svg>
                                <span className="text-sm font-inter-semibold text-[#4F3267]">Treasure Chest</span>
                            </span>
                            <span className="badge">
                                NEW
                            </span>
                        </button>
                        </Link>'
                        <Link to={'/stores'}>
                        <button
                            type="button"
                            className="rounded-[12px]"
                            style={{
                                background: "linear-gradient(90deg, #FD8B64 0%, #FF5B6C 100%)",
                                border: "1px solid transparent",
                                cursor: "pointer",
                                position: "relative",
                            }}
                        >
                            <span className="relative flex items-center bg-[#fff] p-[8px_12px] rounded-[12px]">
                                <PiStorefront className="text-[#FF5B6C]" size={22} />
                                <span className="text-sm font-inter-semibold text-[#FF5B6C]">Stores</span>
                            </span>
                        </button>
                        </Link>
                        <Link to={"/gold"}>
                        <button
                            type="button"
                            className="css-1fs27mr border border-solid border-[#B08700] bg-[#FFF6D8]"
                        >
                            <span className="relative flex items-center">
                                <GoldIcon className="text-[#B08700]" />
                                <span className="text-sm font-inter-semibold text-[#B08700]">Gold</span>
                            </span>
                        </button>
                        </Link>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="hidden lg:block text-right">
                        <p className="text-xs font-inter-semibold text-[#6b7280] leading-[1]">Delivery & Stores</p>
                        <button type="button" className="text-xs font-inter-semibold leading-[0.8] transition-colors duration-200 hover:opacity-80" style={{ color: "#a855f7" }}>
                            Enter Pincode
                        </button>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6f3f9] text-sm text-[#333] transition-colors duration-200"
                    >
                        <span className="text-base" aria-hidden>🇮🇳</span>
                        <span className="font-inter-semibold font-semibold">ENG</span>
                        <ChevronDownIcon />
                    </button>
                    <div className="relative" ref={accountDropdownRef}>
                        <button
                            type="button"
                            className="p-1 text-[#5b2c6f] transition-colors duration-200 hover:opacity-70"
                            aria-label="Account"
                            aria-expanded={accountDropdownOpen}
                            aria-haspopup="true"
                            onClick={(e) => {
                                e.stopPropagation();
                                setAccountDropdownOpen((v) => !v);
                            }}
                        >
                            <span style={{ color: "#4f3267" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" style={{ fill: "#4f3267" }}>
                                    <path d="M234-276q51-39 114-61.5T480-360t132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800t-226.5 93.5T160-480q0 59 19.5 111t54.5 93m246-164q-59 0-99.5-40.5T340-580t40.5-99.5T480-720t99.5 40.5T620-580t-40.5 99.5T480-440m0 360q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80"></path>
                                </svg>
                            </span>
                        </button>
                        {accountDropdownOpen && (
                            <div
                                className="absolute right-0 top-full z-50 mt-6 min-w-[340px] bg-white py-[16px] px-[32px] shadow-lg"
                                style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h1 className="text-[1.6rem] font-inter-semibold font-semibold text-[#1f2937] mb-1">Your Account</h1>
                                <p className="text-sm text-[#6b7280] mb-5">Access account & manage your orders.</p>
                                <div className="flex gap-[18px]">
                                    <Link
                                        to="/signup"
                                        className="block rounded-[6px] text-[0.875rem] text-center text-[#231535] w-[100px] h-[36px] leading-[36px]"
                                        style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="block border border-[#de57e5] text-[0.875rem] rounded-[6px] text-center text-[#231535] w-[100px] h-[36px] leading-[36px] mr-[18px]">
                                        Log In
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
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

            {/* Bottom Navigation Bar + Mega Menu */}
            <nav
                className="relative flex items-center h-12 px-5"
                style={{ backgroundColor: "#5b2c6f" }}
                aria-label="Main navigation"
                onMouseLeave={closeMega}
            >
                <div className="w-full mx-auto flex items-center justify-between gap-4 overflow-hidden">
                    <div className="flex items-center gap-8 overflow-x-auto min-h-[48px] py-2" onMouseEnter={cancelClose}>
                        {NAV_ITEMS.map((label) => (
                            <span
                                key={label}
                                className="relative flex-shrink-0 flex items-center"
                                onMouseEnter={() => openMega(label)}
                                onMouseLeave={closeMega}
                            >
                                <Link
                                    to="/jewellery"
                                    className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 py-2 border-b-2 transition-colors ${activeNavItem === label
                                        ? "text-white border-[#e56eeb]"
                                        : "text-white border-transparent hover:text-white/90 hover:underline"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </span>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="flex items-center justify-center
                                    rounded-xl border border-gray-300
                                    bg-[#6b4887] text-white
                                    px-4 py-1
                                    text-[0.875rem] tracking-wide
                                    cursor-pointer gap-1"
                    >
                        <span>Services</span>
                        <ChevronDownIcon />
                    </button>
                </div>
                <MegaMenu isOpen={megaMenuOpen} onClose={closeMega} onEnterPanel={cancelClose} />
            </nav>
        </header>
    );
};

export default Header;
