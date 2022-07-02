import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../07 Common Components/UserContext";
import SetBorder from "../07 Common Components/SetBorder";

type Navbar = {
  home: boolean;
  items: boolean;
  cart: boolean;
  login: boolean;
  admin: boolean;
};

export default function ShopNav() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const user = context?.user;
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

  const handleLogout = async () => {
    if (context !== null) {
      const { dispatch, handleAlert } = context;

      await dispatch({ type: "LOGOUT" });
      handleAlert("info", "Sucessfully logged out", 1500);
    } else {
      alert("context is null");
    }
  };

  // (e: React.MouseEvent<HTMLElement>) => {
  // id = (e.target as HTMLInputElement).id;

  return (
    <div className="shopheader sticky">
      <div className="row m-0 shopnav">
        <div className="col-sm-4">
          <div className="row">
            <div
              className={
                active.home
                  ? "col-sm-3 shopnav-item-active"
                  : "col-sm-3 shopnav-item"
              }
              id="shopnavhome"
              onClick={() => navigate("/eshop")}
            >
              HOME
            </div>
            <div
              className={
                active.items
                  ? "col-sm-3 shopnav-item-active"
                  : "col-sm-3 shopnav-item"
              }
              id="shopnavitems"
              onClick={() => navigate("/eshop/items")}
            >
              ITEMS
            </div>
            {user?.role === "ADMIN" ? (
              <div
                className={
                  active.admin
                    ? "col-sm-3 shopnav-item-active"
                    : "col-sm-3 shopnav-item"
                }
                id="shopnavadmin"
                onClick={() => navigate("/eshop/admin")}
              >
                ADMIN
              </div>
            ) : (
              <div
                className={
                  active.cart
                    ? "col-sm-3 shopnav-item-active"
                    : "col-sm-3 shopnav-item"
                }
                id="shopnavcart"
                onClick={() => navigate("/eshop/cart")}
              >
                CART
              </div>
            )}
          </div>
        </div>

        {user?.isAuthenticated === false ? (
          <div className="col-sm-4 justify-end">
            <div
              className={
                active.login
                  ? "col-sm-3 shopnav-item-active"
                  : "col-sm-3 shopnav-item"
              }
              id="shopnavlogin"
              onClick={() => navigate("/eshop/login")}
            >
              Login
            </div>
          </div>
        ) : (
          <div className="col-sm-8 ">
            <div className="row flex-end">
              <div className="col-sm-3 pointercursor highlight ">
                Logged in as: {user?.username}
              </div>
              <div
                onClick={handleLogout}
                className="col-sm-2 pointercursor highlight "
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
