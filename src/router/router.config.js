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
];

export const protectedRouters = [
];

export const routers = [...commonRouters, ...protectedRouters];
