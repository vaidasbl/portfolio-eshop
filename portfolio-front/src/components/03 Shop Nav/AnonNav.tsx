import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MyAlert from "../07 Common Components/MyAlert";
import SetBorder from "../07 Common Components/SetBorder";

type Navbar = {
  home: boolean;
  items: boolean;
  cart: boolean;
  login: boolean;
  admin: boolean;
};

export default function AnonNav() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [active, setActive] = useState<Navbar>({
    home: true,
    items: false,
    cart: false,
    login: false,
    admin: false,
  });

  useEffect(() => {
    SetBorder(location, active, setActive);
  }, [location]);

  if (location !== "/") {
    return (
      <div className="shopheader sticky">
        <div className="row shopnav">
          <div className="col-4">
            <div className="row">
              <div
                className={
                  active.home
                    ? "col-6 col-lg-3 shopnav-item-active "
                    : "col-6 col-lg-3 shopnav-item"
                }
                id="shopnavhome"
                onClick={() => navigate("/eshop")}
              >
                HOME
              </div>

              <div
                className={
                  active.login
                    ? "col-6 col-lg-3 shopnav-item-active "
                    : "col-6 col-lg-3 shopnav-item"
                }
                id="shopnavlogin"
                onClick={() => navigate("/eshop/login")}
              >
                LOGIN
              </div>
            </div>
          </div>
        </div>
        <MyAlert />
      </div>
    );
  } else {
    return <></>;
  }
}
