import asyncComponent from "../utils/asyncComponent.jsx";

export const commonRouters = [
  {
    path: "/",
    component: asyncComponent(() => import("../pages/main/home.jsx")),
  },
  {
    path: "/signup",
    component: asyncComponent(() => import("../pages/auth/signup.jsx")),
  },
  {
    path: "/login",
    component: asyncComponent(() => import("../pages/auth/login.jsx")),
    isBottomNav: false,
  },
  {
    path: "/jewellery",
    component: asyncComponent(() => import("../pages/main/product/jewellery.jsx")),
  },
  {
    path: "/treasure",
    component: asyncComponent(() => import("../pages/main/treasurePage.jsx")),
  },
  {
    path: "/gold",
    component: asyncComponent(() => import("../pages/main/gold.jsx")),
  },
  {
    path: "/stores",
    component: asyncComponent(() => import("../pages/main/stores.jsx")),
  },
  {
    path: "/try-at-home",
    component: asyncComponent(() => import("../pages/main/tryAtHome/index.jsx")),
  },
  {
    path: "/call-live",
    component: asyncComponent(() => import("../pages/main/callLive/index.jsx")),
  },
  {
    path: "/wishlist",
    component: asyncComponent(() => import("../pages/main/wishlist/index.jsx")),
    isBottomNav: false,
  },
  {
    path: "/cart/shopping-cart",
    component: asyncComponent(() => import("../pages/main/cart/shoppingCart.jsx")),
    disableLayout: true,
  },
  {
    path: "/checkout/address",
    component: asyncComponent(() => import("../pages/main/cart/checkoutAddress.jsx")),
    disableLayout: true,
  },
  {
    path: "/checkout/gifting",
    component: asyncComponent(() => import("../pages/main/cart/checkoutGifting.jsx")),
    disableLayout: true,
  },
  {
    path: "/checkout/payment",
    component: asyncComponent(() => import("../pages/main/cart/checkoutPayment.jsx")),
    disableLayout: true,
  },
  {
    path: "/product/:id",
    component: asyncComponent(() => import("../pages/main/product/productReview.jsx")),
  },
];

export const protectedRouters = [
];

export const routers = [...commonRouters, ...protectedRouters];
