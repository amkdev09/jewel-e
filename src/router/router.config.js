import asyncComponent from "../utils/asyncComponent.jsx";

export const commonRouters = [
  {
    path: "/",
    component: asyncComponent(() => import("../pages/main/home.jsx")),
  },
  {
    path: "/signup",
    component: asyncComponent(() => import("../pages/auth/Signup.jsx")),
  },
  {
    path: "/login",
    component: asyncComponent(() => import("../pages/auth/Login.jsx")),
    isBottomNav: false,
  },
  {
    path: "/jewellery",
    component: asyncComponent(() => import("../pages/main/jewellery.jsx")),
  },
  {
    path: "/treasure",
    component: asyncComponent(() => import("../pages/main/TreasurePage.jsx")),
  },
  {
    path: "/gold",
    component: asyncComponent(() => import("../pages/main/Gold.jsx")),
  },
  {
    path: "/stores",
    component: asyncComponent(() => import("../pages/main/Stores.jsx")),
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
    path: "/product/:id",
    component: asyncComponent(() => import("../pages/main/cart/productReview.jsx")),
  },
];

export const protectedRouters = [
];

export const routers = [...commonRouters, ...protectedRouters];
