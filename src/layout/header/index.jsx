import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { PiStorefront } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";
import avatar from "../../assets/images/avatar.png";
import useAuth from "../../hooks/useAuth";
import { useCartCount } from "../../context/CartCountContext";

const ring = "https://images.unsplash.com/photo-1628926379972-9843ad139a8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const ChevronDownIcon = () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M19 9l-7 7-7-7" />
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
    { label: "Message Bands", image: ring },
    { label: "Postcards", image: ring },
];

const JewelleryLink = ({ to, children }) => (
    <Link to={to} className="block text-lg font-inter-regular text-[#4b5563] hover:text-[#3E006A] transition-colors duration-200">{children}</Link>
);

const MegaMenu = ({ isOpen, onClose, onEnterPanel, navigate }) => {
    const panelRef = useRef(null);

    const handleMouseLeave = useCallback(() => {
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="absolute left-0 right-0 z-40 bg-white shadow-lg"
            style={{ top: "100%" }}
            ref={panelRef}
            onMouseEnter={onEnterPanel}
            onMouseLeave={handleMouseLeave}
        >
            <div className="pt-7">
                <div className="flex gap-10 mx-22">
                    {/* Four columns */}
                    <div className="flex justify-between w-[50%]">
                        <div>
                            <h3 className="text-lg font-inter-semibold text-[var(--primary-color-b)] mb-4">Featured</h3>
                            <ul className="space-y-2.5">
                                {MEGA_FEATURED.map((item) => (
                                    <li key={item}>
                                        <JewelleryLink to="/jewellery">
                                            {item}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-inter-semibold text-[var(--primary-color-b)] mb-4">By Style</h3>
                            <ul className="space-y-2.5 no-scrollbar">
                                {MEGA_BY_STYLE.map((item, i) => (
                                    <li key={item}>
                                        <JewelleryLink to="/jewellery">
                                            {item}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-inter-semibold text-[var(--primary-color-b)] mb-4">By Metal & Stone</h3>
                            <ul className="space-y-2.5">
                                {MEGA_METAL_STONE.map(({ label, color }) => (
                                    <li key={label} className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} aria-hidden />
                                        <JewelleryLink to="/jewellery">
                                            {label}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-inter-semibold text-[var(--primary-color-b)] mb-4">By Price</h3>
                            <ul className="space-y-2.5">
                                {MEGA_BY_PRICE.map((item) => (
                                    <li key={item}>
                                        <JewelleryLink to="/jewellery">
                                            {item}
                                        </JewelleryLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Two image cards */}
                    <div className="flex gap-4 justify-end w-[50%] py-4">
                        {MEGA_CARDS.map(({ label, image }) => (
                            <Link
                                key={label}
                                to="/jewellery"
                                className="flex flex-col w-[22rem] bg-[#e5ddff] rounded-[12px]"
                            >
                                <img
                                    src={image}
                                    alt={label}
                                    className="w-full h-[25rem] object-contain"
                                />
                                <p className="text-center text-sm font-inter-semibold text-[#4b5563] py-3 bg-[#e5ddff]">
                                    {label}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
                {/* Bottom tabs */}
                <div className="flex border-t justify-start border-[#e5e7eb] mt-6 py-4 mx-6">
                    {MEGA_TABS.map((tab, i) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => navigate(`/jewellery?tab=${tab}`)}
                            className="py-2 px-4 text-lg font-inter-regular transition-colors duration-200 border-l border-[#e5e7eb] first:border-l-0 text-[#4b5563] hover:text-[var(--primary-color-a)] hover:font-inter-semibold"
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
    const navigate = useNavigate();
    const { isLoggedIn, userData } = useAuth();
    const { cartCount } = useCartCount();
    const [activeNavItem, setActiveNavItem] = useState(null);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const navTimeoutRef = useRef(null);
    const accountDropdownRef = useRef(null);
    const servicesTimeoutRef = useRef(null);

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
        <header className="w-full shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-b-2 border-[#e5e7eb] overflow-visible">
            {/* Top Light Header */}
            <div
                className="flex items-center justify-between h-[70px] px-[2.52rem] w-full"
                style={{ backgroundColor: "#FFFFFF" }}
            >
                {/* Left */}
                <div className="flex items-center gap-5 min-w-0 w-[72%]">
                    <button
                        onClick={() => navigate("/")}
                        type="button"
                        aria-label="Account"
                        className="w-8 h-8 rounded-full flex items-center bg-[var(--color-pink)] justify-center shadow-sm"
                    >
                        <figure className="w-7 h-7 rounded-full overflow-hidden object-cover bg-[#ffdee4]">
                            <img src={avatar} alt="avatar" />
                        </figure>
                    </button>
                    <form className="flex items-center h-[40px] flex-1" role="search">
                        <div className="flex w-full h-full rounded-[11px] bg-white overflow-hidden">
                            <input
                                type="search"
                                placeholder="Search"
                                className="flex-1 min-w-0 pl-5 pr-3 rounded-[11px_0_0_11px] border border-[#e56eeb] text-sm text-[#333] placeholder-[#9ca3af] outline-none bg-transparent"
                                style={{ padding: "0 15px 0 26px" }}
                                aria-label="Search"
                            />
                            <button
                                type="submit"
                                className="w-12 flex-shrink-0 flex items-center justify-center text-white transition-colors duration-200 hover:opacity-90"
                                style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
                                aria-label="Submit search"
                            >
                                <IoIosSearch />
                            </button>
                        </div>
                    </form>
                    {/* Center action buttons - hidden on small */}
                    <div className="hidden md:flex items-center gap-5 flex-shrink-0">
                        <Link to={'/treasure'}>
                            <button
                                type="button"
                                className="css-1fs27mr border border-solid border-[#DE57E5] bg-[#F8EBFB]"
                            >
                                <span className="relative flex items-center gap-3">
                                    <figure className="w-5 h-5">
                                        <img src={"https://cdn.caratlane.com/media/static/images/web/Treasure-Chest-1-26-may-25.png"} alt="Treasure Chest" className="w-4 h-4" />
                                    </figure>
                                    <span className="text-sm font-inter-semibold text-[#4F3267]">Treasure Chest</span>
                                </span>
                                <span className="badge">
                                    NEW
                                </span>
                            </button>
                        </Link>
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
                                <span className="relative flex items-center bg-[#fff] p-[8px_12px] rounded-[12px] gap-1">
                                    <PiStorefront className="text-[#FF5B6C]" size={24} />
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
                                    <figure className="w-14">
                                        <img src={"https://cdn.caratlane.com/media/static/images/discovery/responsive-hamburger-menu/egold-1x.png"} alt="Gold" className="w-4 h-4" />
                                    </figure>
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center flex-shrink-0">
                    <div className="hidden lg:block text-left mr-4">
                        <p className="text-xs font-inter-semibold text-[var(--primary-color-c)]">Delivery & Stores</p>
                        <p className="text-xs font-inter-semibold text-[var(--color-pink)]">
                            Enter Pincode
                        </p>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-2.5 px-2 py-3 rounded-full bg-[#f6f3f9] text-sm text-[#333] transition-colors duration-200"
                    >
                        <span className="css-mu2fqx" aria-hidden />
                        <span className="font-inter-semibold pr-1">ENG</span>
                        <ChevronDownIcon />
                    </button>
                    <div className="flex items-center gap-6 ml-0.5">
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
                                    {isLoggedIn ?
                                        <>
                                            <div className="mb-4">
                                                <h1 className="text-lg font-inter-semibold text-[var(--primary-color-a)] leading-tight">
                                                    {userData?.name || "Unknown Name"}
                                                </h1>
                                                <p className="text-sm text-[var(--primary-color-c)] mt-0.5">
                                                    {userData?.email || "Unknown Email"}
                                                </p>
                                                <div className="mt-4 h-[1px] w-full bg-[#a855f7] rounded-full" />
                                            </div>
                                            <ul className="space-y-2 text-sm font-inter-regular tracking-wide">
                                                <li>
                                                    <Link
                                                        to="/orders"
                                                        className="block py-0.5 text-[rgb(35, 21, 53)] uppercase hover:text-[var(--primary-color-a)]"
                                                    >
                                                        MY ACCOUNTS
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/our-story"
                                                        className="block py-0.5 text-[rgb(35, 21, 53)] uppercase hover:text-[var(--primary-color-a)]"
                                                    >
                                                        OUR STORY
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/logout"
                                                        className="block py-0.5 text-[rgb(35, 21, 53)] uppercase hover:text-[var(--primary-color-a)]"
                                                    >
                                                        LOGOUT
                                                    </Link>
                                                </li>
                                            </ul>
                                        </>
                                        :
                                        <>
                                            <h1 className="text-[1.6rem] font-inter-semibold font-semibold text-[#1f2937] mb-1">Your Account</h1>
                                            <p className="text-sm text-[#6b7280] mb-5">Access account & manage your orders.</p>
                                            <div className="flex gap-[18px]">
                                                <Link
                                                    to="/signup"
                                                    className="block rounded-[6px] text-[0.875rem] text-center font-inter-semibold text-[#fff] w-[100px] h-[36px] leading-[36px]"
                                                    style={{ background: "linear-gradient(to right, #e56eeb, #8863fb)" }}
                                                >
                                                    Sign Up
                                                </Link>
                                                <Link
                                                    to="/login"
                                                    className="block border border-[#de57e5] text-[0.875rem] rounded-[6px] text-center font-inter-semibold text-[#231535] w-[100px] h-[36px] leading-[36px] mr-[18px]">
                                                    Log In
                                                </Link>
                                            </div>
                                        </>
                                    }
                                </div>
                            )}
                        </div>
                        <button onClick={() => navigate("/wishlist")} type="button" className="p-1 text-[#5b2c6f] transition-colors duration-200 hover:opacity-70" aria-label="Wishlist">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" style={{ fill: "#4f3267" }}>
                                <path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5"></path>
                            </svg>
                        </button>
                        <button onClick={() => navigate("/cart/shopping-cart")} className="links css-dpoqzr" aria-labelledby="takestocart" name="cartlink">
                            <span className="css-133bxhf">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F3267" viewBox="0 -960 960 960" style={{ color: "#4f3267" }}>
                                    <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47 113 47 47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80zm160-640h160q0-33-23.5-56.5T480-800t-56.5 23.5T400-720m200 200q17 0 28.5-11.5T640-560v-80h-80v80q0 17 11.5 28.5T600-520m-240 0q17 0 28.5-11.5T400-560v-80h-80v80q0 17 11.5 28.5T360-520"></path>
                                </svg>
                                <span className="css-16zwby6" aria-label={`${cartCount} items in cart`}>
                                    {cartCount > 0 ? cartCount : "+"}
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar + Mega Menu */}
            <nav
                className="relative flex items-center h-11.5 px-8 overflow-visible"
                style={{ backgroundColor: "#5b2c6f" }}
                aria-label="Main navigation"
                onMouseLeave={closeMega}
            >
                <div className="w-full mx-auto flex items-center justify-between py-5">
                    <div className="flex items-center gap-6 overflow-x-auto min-h-[50px] no-scrollbar min-w-0 flex-1" onMouseEnter={cancelClose}>
                        {NAV_ITEMS.map((label) => (
                            <span
                                key={label}
                                className="relative flex-shrink-0 flex items-center"
                                onMouseEnter={() => openMega(label)}
                                onMouseLeave={closeMega}
                            >
                                <Link
                                    to="/jewellery"
                                    className={`text-base font-inter-regular whitespace-nowrap transition-colors duration-200 !text-white mb-0 hover:!text-[var(--color-pink)] hover:font-inter-semibold ${activeNavItem === label
                                        ? "border-[var(--color-pink)]"
                                        : "border-transparent"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </span>
                        ))}
                    </div>
                    <div
                        className="relative flex-shrink-0 overflow-visible"
                        onMouseEnter={() => {
                            if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
                            setServicesDropdownOpen(true);
                        }}
                        onMouseLeave={() => {
                            servicesTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 150);
                        }}
                    >
                        <button
                            type="button"
                            className="flex items-center justify-center
                                        rounded-xl border border-gray-300
                                        bg-[#6b4887] 
                                        text-white text-base font-inter-regular
                                        px-4 py-1
                                        cursor-pointer gap-1"
                        >
                            <span>Services</span>
                            <ChevronDownIcon />
                        </button>
                        {servicesDropdownOpen && (
                            <div
                                className="absolute right-0 top-full pt-1 min-w-[280px] bg-white rounded-xl shadow-lg py-2 z-50 overflow-hidden"
                                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflow: "hidden" }}
                                onMouseEnter={() => { if (servicesTimeoutRef.current) { clearTimeout(servicesTimeoutRef.current); servicesTimeoutRef.current = null; } }}
                                onMouseLeave={() => {
                                    servicesTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 150);
                                }}
                            >
                                <Link
                                    to="/try-at-home"
                                    className="services-dropdown-link block px-4 py-2.5 text-lg text-[#4F3267] hover:bg-[#f6f3f9] transition-colors"
                                >
                                    Try at Home
                                </Link>
                                <Link
                                    to="/call-live"
                                    className="services-dropdown-link block px-4 py-2.5 text-lg text-[#4F3267] hover:bg-[#f6f3f9] transition-colors"
                                >
                                    Video Call
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
                <MegaMenu isOpen={megaMenuOpen} onClose={closeMega} onEnterPanel={cancelClose} navigate={navigate} />
            </nav>
        </header >
    );
};

export default Header;
