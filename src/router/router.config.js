import asyncComponent from "../utils/asyncComponent.jsx";

export const commonRouters = [
  {
    path: "/",
    component: asyncComponent(() => import("../pages/main/home.jsx")),
    isHeader: true,
  },
  {
    path: "/jewellery",
    component: asyncComponent(() => import("../pages/main/jewellery.jsx")),
    isHeader: false,
  }
];

export const protectedRouters = [
];

export const routers = [...commonRouters, ...protectedRouters];
