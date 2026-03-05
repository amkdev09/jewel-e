import React, { memo, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layout";
import { commonRouters, protectedRouters } from "./router.config";

const AppRouter = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const deviceType = useMemo(() => {
    if (isMobile) return "mobile";
    return "desktop";
  }, [isMobile]);

  const resolveElement = (routeConfig) => {
    const { component, mobileComponent } = routeConfig;

    if (deviceType === "mobile" && mobileComponent) {
      return React.createElement(mobileComponent);
    }

    if (component) {
      return React.createElement(component);
    }

    return <Navigate to="/" replace />;
  };

  return (
    <div className="min-h-screen h-full relative overflow-hidden ">
      <Routes>
        {commonRouters.map((routeConfig) => {
          const { path, isHeader, isBottomNav } = routeConfig;

          return (
            <Route
              key={path}
              path={path}
              element={
                <AppLayout
                  deviceType={deviceType}
                  isHeader={isHeader}
                  isBottomNav={isBottomNav}
                >
                  {resolveElement(routeConfig)}
                </AppLayout>
              }
            />
          );
        })}
        {protectedRouters.map((routeConfig) => {
          const { path, isBottomNav } = routeConfig;

          return (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <AppLayout deviceType={deviceType} isBottomNav={isBottomNav}>
                    {resolveElement(routeConfig)}
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default memo(AppRouter);
