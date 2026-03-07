import React, { memo, useMemo, useState, useCallback } from "react";
import Header from "./header";
import Footer from "./footer";
import MobileHeader from "./header/mobileHeader";
import MobileBNavigation from "./footer/mobileBNavigation";

const AppLayout = (props) => {
  const {
    children,
    isBottomNav = true,
    isHeader = true,
    deviceType = "desktop",
  } = props;

  const isMobile = useMemo(() => deviceType === "mobile", [deviceType]);


  return (
    <section>
      {isHeader && (isMobile ? <MobileHeader /> : <Header />)}
      <div className="pt-[120px]">
        {children}
      </div>
      {isBottomNav && <Footer />}
      {isMobile && <MobileBNavigation />}
    </section>
  );
};

export default memo(AppLayout);
