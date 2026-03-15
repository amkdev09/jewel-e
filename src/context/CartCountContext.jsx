import React, { createContext, useState, useCallback, useEffect, useRef } from "react";
import cartService from "../services/cartService";
import useAuth from "../hooks/useAuth";

const CartCountContext = createContext(null);

function getTotalCountFromCart(res) {
  const data = res?.data ?? res;
  const items = data?.items ?? [];
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
}

export function CartCountProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const initialFetchedRef = useRef(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      initialFetchedRef.current = false;
      queueMicrotask(() => setCartCount(0));
      return;
    }
    if (initialFetchedRef.current) return;
    initialFetchedRef.current = true;
    let cancelled = false;
    cartService
      .getCart()
      .then((res) => {
        if (!cancelled) setCartCount(getTotalCountFromCart(res));
      })
      .catch(() => {
        if (!cancelled) setCartCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

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
