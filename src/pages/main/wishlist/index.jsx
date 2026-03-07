import React from "react";
import { Link } from "react-router-dom";

const WishList = () => {
    return (
        <div
            className="w-full max-w-[640px] mx-auto text-center pt-[11%] px-[10px] pb-[10px] text-center"
        >
            {/* Heart icon block – layered glow */}
            <div className="inline-block cursor-pointer bg-[url('https://assets.cltstatic.com/images/responsive/lp-sprite.png?v2.1')] 
                        bg-[-393px_-354px] bg-[length:500px] bg-no-repeat w-[105px] h-[115px] mx-auto mb-[20px]">
            </div>

            {/* Heading */}
            <h2 className="font-inter-semibold text-[#1f2937] text-center text-lg">
                Uh Oh!
            </h2>

            {/* Subheading */}
            <p className="font-medium font-inter-semibold text-[#1f2937] text-center text-lg mb-4">
                Your Wishlist Seems to be Empty!
            </p>

            {/* Start Shopping button */}
            <Link
                to="/"
                className="font-inter-semibold h-[42px] text-lg text-white text-center rounded-[8px] py-2 w-full max-w-[350px] transition-opacity hover:opacity-95 inline-block"
                style={{
                    background: "linear-gradient(to right, rgb(222, 87, 229), rgb(136, 99, 251))",
                }}
            >
                Start Shopping
            </Link>
        </div>
    );
};

export default WishList;
