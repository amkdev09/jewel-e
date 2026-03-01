import React, { memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layout";
import { commonRouters, protectedRouters } from "./router.config";

const AppRouter = () => {

  return (
    <div className="min-h-screen h-full relative overflow-hidden ">
      <Routes>
        {commonRouters.map(({ path, component, isHeader }) => (
          <Route
            key={path}
            path={path}
            element={
              <AppLayout isHeader={isHeader}>
                {component ? React.createElement(component) : <Navigate to="/" replace />}
              </AppLayout>
            }
          />
        ))}
        {protectedRouters.map(({ path, component, isBottomNav }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <AppLayout isBottomNav={isBottomNav}>
                  {component ? React.createElement(component) : <Navigate to="/" replace />}
                </AppLayout>
              </ProtectedRoute>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default memo(AppRouter);
