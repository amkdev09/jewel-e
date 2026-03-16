import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import avatar from "../../assets/images/avatar.png";
import { CgMenuLeftAlt } from "react-icons/cg";
import gsap from "gsap";
import Sidebar from "../sidebar";
import { useCartCount } from "../../context/CartCountContext";

const MobileHeader = () => {
  const headerBarRef = useRef(null);
  const lastScrollY = useRef(0);
  const isCollapsed = useRef(false);
  const navigate = useNavigate();
  const { cartCount } = useCartCount();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    const headerBar = headerBarRef.current;
    if (!headerBar) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY > lastScrollY.current && scrollY > 80) {
        if (!isCollapsed.current) {
          isCollapsed.current = true;
          gsap.to(headerBar, {
            maxHeight: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginBottom: 0,
            overflow: "hidden",
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      } else if (scrollY < lastScrollY.current || scrollY <= 80) {
        if (isCollapsed.current) {
          isCollapsed.current = false;
          gsap.to(headerBar, {
            maxHeight: 80,
            opacity: 1,
            paddingTop: 12,
            paddingBottom: 0,
            overflow: "visible",
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      }

      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div ref={headerBarRef} className="flex items-center justify-between px-4 pt-3 overflow-hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex flex-col justify-center gap-[3px]"
            onClick={() => setDrawerOpen(prev => !prev)}
          >
            <CgMenuLeftAlt style={{ color: "var(--primary-color-a)", fontSize: 24, }} />
          </button>

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
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/stores"
            className="inline-flex items-center gap-2"
          >
            <span className="css-qu12nd text-sm">Stores</span>
            <div className="stores-lic" />
          </Link>

          <button onClick={() => navigate("/wishlist")} type="button" className="p-0 text-[#5b2c6f] transition-colors duration-200 hover:opacity-70" aria-label="Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" style={{ fill: "#4f3267" }}>
              <path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5"></path>
            </svg>
          </button>
          <button onClick={() => navigate("/cart/shopping-cart")} className="links css-dpoqzr" aria-labelledby="takestocart" name="cartlink" aria-label={`${cartCount} items in cart`}>
            <span className="css-133bxhf">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F3267" viewBox="0 -960 960 960" style={{ color: "#4f3267" }}>
                <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47 113 47 47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80zm160-640h160q0-33-23.5-56.5T480-800t-56.5 23.5T400-720m200 200q17 0 28.5-11.5T640-560v-80h-80v80q0 17 11.5 28.5T600-520m-240 0q17 0 28.5-11.5T400-560v-80h-80v80q0 17 11.5 28.5T360-520"></path>
              </svg>
              <span className="css-16zwby6">{cartCount > 0 ? cartCount : "+"}</span>
            </span>
          </button>
        </div>
      </div>
      <Sidebar isOpen={drawerOpen} onClose={closeDrawer} />
      {/* Search bar */}
      <div className="px-4 py-2">
        <form className="flex items-center h-[40px] flex-1 justify-center" role="search">
          <div className="flex items-center gap-2 w-full h-full rounded-[11px] bg-white overflow-hidden border-1 border-[#e56eeb] px-3">
            <IoMdSearch style={{ color: "var(--primary-color-a)", fontSize: 24, strokeWidth: 4 }} />
            <input
              type="search"
              placeholder="Search"
              className="flex-1 text-sm text-[#333] placeholder-[var(--primary-color-a)] font-inter-semibold outline-none bg-transparent"
              aria-label="Search"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default MobileHeader;