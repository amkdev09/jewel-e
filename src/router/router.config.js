import asyncComponent from "../utils/asyncComponent.jsx";

export const commonRouters = [
  {
    path: "/",
    component: asyncComponent(() => import("../pages/main/home.jsx")),
    isHeader: true,
  },
  {
    path: "/signup",
    component: asyncComponent(() => import("../pages/auth/signup.jsx")),
    isHeader: true,
  },
  {
    path: "/login",
    component: asyncComponent(() => import("../pages/auth/login.jsx")),
    isHeader: true,
  },
  {
    path: "/jewellery",
    component: asyncComponent(() => import("../pages/main/jewellery.jsx")),
    isHeader: true,
  },
  {
    path: "/treasure",
    component: asyncComponent(() => import("../pages/main/TreasurePage.jsx")),
    isHeader: true,
  },
  {
    path: "/gold",
    component: asyncComponent(() => import("../pages/main/Gold.jsx")),
    isHeader: true,
  },
  {
    path: "/stores",
    component: asyncComponent(() => import("../pages/main/Stores.jsx")),
    isHeader: true,
  },
];

export const protectedRouters = [
];

export const routers = [...commonRouters, ...protectedRouters];
