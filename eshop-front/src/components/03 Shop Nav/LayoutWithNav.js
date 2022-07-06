import React from "react";
import { Outlet } from "react-router-dom";
import ShopNav from "./ShopNav";

const LayoutWithNav = () => {
  return (
    <div>
      <ShopNav />
      <Outlet />
    </div>
  );
};

export default LayoutWithNav;
