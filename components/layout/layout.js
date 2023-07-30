import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div className="inner padding">{children}</div>
    </div>
  );
};

export default Layout;
