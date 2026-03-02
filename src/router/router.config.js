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
  }
];

export const protectedRouters = [
];

export const routers = [...commonRouters, ...protectedRouters];
