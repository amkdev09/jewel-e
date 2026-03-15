import React, { createContext, useState, useCallback, useEffect } from "react";
import cartService from "../services/cartService";

const CartCountContext = createContext(null);

function getTotalCountFromCart(res) {
  const data = res?.data ?? res;
  const items = data?.items ?? [];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
}

export function CartCountProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [initialFetched, setInitialFetched] = useState(false);

  const fetchCartCountOnce = useCallback(async () => {
    if (initialFetched) return;
    setInitialFetched(true);
    try {
      const res = await cartService.getCart();
      const count = getTotalCountFromCart(res);
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  }, [initialFetched]);

  useEffect(() => {
    fetchCartCountOnce();
  }, [fetchCartCountOnce]);

  const incrementCartCount = useCallback((delta = 1) => {
    setCartCount((prev) => Math.max(0, prev + delta));
  }, []);

  const decrementCartCount = useCallback((delta = 1) => {
    setCartCount((prev) => Math.max(0, prev - delta));
  }, []);

  const setCartCountFromCart = useCallback((cartRes) => {
    const count = getTotalCountFromCart(cartRes);
    setCartCount(count);
  }, []);

  return (
    <CartCountContext.Provider
      value={{
        cartCount,
        setCartCount,
        incrementCartCount,
        decrementCartCount,
        setCartCountFromCart,
      }}
    >
      {children}
    </CartCountContext.Provider>
  );
}

export function useCartCount() {
  const ctx = React.useContext(CartCountContext);
  if (!ctx) {
    throw new Error("useCartCount must be used within CartCountProvider");
  }
  return ctx;
}

export default CartCountContext;
