import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wishlistService from "../../../services/wishlistService";
import useSnackbar from "../../../hooks/useSnackbar";

const WishList = () => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const loadWishlist = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await wishlistService.getWishlist();
                if (res?.success === false) {
                    throw new Error(res?.message || "Failed to load wishlist");
                }
                setWishlist(res?.data ?? null);
            } catch (err) {
                setError(err?.message || "Failed to load wishlist");
                setWishlist(null);
            } finally {
                setLoading(false);
            }
        };
        loadWishlist();
    }, []);

    const items = Array.isArray(wishlist?.products) ? wishlist.products : [];
    const isEmpty = !loading && items.length === 0;

    if (loading) {
        return (
            <div className="w-full max-w-[640px] mx-auto text-center pt-[11%] px-[10px] pb-[10px]">
                <p className="font-inter-regular text-[#6b7280] text-base">Loading your wishlist…</p>
            </div>
        );
    }

    if (isEmpty || error) {
        return (
            <div
                className="w-full max-w-[640px] mx-auto text-center pt-[11%] px-[10px] pb-[10px]"
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
                {error ? "We couldn't load your wishlist." : "Your Wishlist Seems to be Empty!"}
            </p>

            {/* Start Shopping button */}
            <Link
                to="/jewellery"
                className="font-inter-semibold h-[42px] text-lg text-white text-center rounded-[8px] py-2 w-full max-w-[350px] transition-opacity hover:opacity-95 inline-block"
                style={{
                    background: "linear-gradient(to right, rgb(222, 87, 229), rgb(136, 99, 251))",
                }}
            >
                Start Shopping
            </Link>
        </div>
        );
    }

    return (
        <div className="w-full max-w-[960px] mx-auto pt-[6%] px-[10px] pb-[40px]">
            <h1 className="font-inter-semibold text-[#1f2937] text-left text-xl mb-4">
                My Wishlist ({items.length})
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((p) => {
                    const name = p.name || "Product";
                    const image =
                        (Array.isArray(p.images) && p.images[0]) || "";
                    const price = p.basePrice ?? p.price?.basePrice ?? 0;
                    const isInStock = p.inventory?.isInStock ?? true;
                    return (
                        <Link
                            key={p._id || p.id}
                            to={`/product/${p._id || p.id}`}
                            className={`bg-white rounded-lg border border-[#E5E7EB] overflow-hidden text-left hover:border-[var(--primary-color-a)] transition-colors block ${!isInStock ? "opacity-75" : ""}`}
                        >
                            <div className="relative aspect-square bg-[#F5F5F5]">
                                {image && (
                                    <img
                                        src={image}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <span
                                    className={`absolute top-2 left-2 rounded px-2 py-0.5 text-[10px] font-inter-semibold uppercase ${
                                        isInStock
                                            ? "bg-emerald-500 text-white"
                                            : "bg-red-500 text-white"
                                    }`}
                                >
                                    {isInStock ? "In stock" : "Out of stock"}
                                </span>
                            </div>
                            <div className="p-3">
                                <p className="font-inter-semibold text-[#111827] text-sm truncate mb-1">
                                    {name}
                                </p>
                                <p className="font-inter-semibold text-[#4B5563] text-sm">
                                    ₹{Number(price).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default WishList;
