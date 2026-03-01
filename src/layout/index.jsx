import React from "react";
import Header from "./header";

const AppLayout = (props) => {
  const { children, isBottomNav = false, isHeader = false } = props;

  return (
    <section className="mb-32">
      {isHeader && <Header />}
      {children}
    </section>
  )
};

export default AppLayout;
