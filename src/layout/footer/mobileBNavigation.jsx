import React from "react";
import { Link } from "react-router-dom";

const MobileBNavigation = () => {
  return (
    <nav className="w-full bg-[#4f3267] fixed bottom-0 left-0 right-0 z-50">
      <div className="m-bnavigation flex items-center justify-around px-2 py-4 text-white font-inter-semibold text-xs">
        <Link
          to="/jewellery"
        >
          <span >CATEGORY</span>
        </Link>
        <Link
          to="/jewellery?filter=new"
        >
          <span >NEW ARRIVALS</span>
        </Link>
        <Link
          to="/jewellery?filter=bestseller"
        >
          <span >BESTSELLERS</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileBNavigation;