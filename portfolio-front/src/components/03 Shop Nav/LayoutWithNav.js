import React from "react";
import { Outlet } from "react-router-dom";
import AnonNav from "./AnonNav";

const LayoutWithNav = () => {
  return (
    <div>
      <AnonNav />
      <Outlet />
    </div>
  );
};

export default LayoutWithNav;
