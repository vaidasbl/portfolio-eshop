import React from "react";
import { Outlet } from "react-router-dom";
import AnonNav from "./AnonNav";

const LayoutWithAnonNav = () => {
  return (
    <div>
      <AnonNav />
      <Outlet />
    </div>
  );
};

export default LayoutWithAnonNav;
