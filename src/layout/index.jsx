import React from "react";
import Header from "./header";
import Footer from "./footer";

const AppLayout = (props) => {
  const { children, isBottomNav = false, isHeader = false } = props;

  return (
    <section className="mb-32">
      {isHeader && <Header />}
      <div className="pt-[120px]">
        {children}
      </div>
      <Footer />
    </section>
  )
};

export default AppLayout;
