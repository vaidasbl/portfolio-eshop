import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SetBorder from "../07 Common Components/SetBorder";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../08 Reducers/user";
import { alert } from "../08 Reducers/alert";
import MyAlert from "../07 Common Components/MyAlert";

type Navbar = {
  home: boolean;
  items: boolean;
  cart: boolean;
  login: boolean;
  admin: boolean;
};

export default function ShopNav() {
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
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

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(
      alert({ type: "info", text: "Successfully logged out", time: 1500 })
    );
  };

  // (e: React.MouseEvent<HTMLElement>) => {
  // id = (e.target as HTMLInputElement).id;

  return (
    <div className="shopheader sticky">
      <div className="row m-0 shopnav">
        <div className="col-6">
          <div className="row">
            <div
              className={
                active.home
                  ? "col-3 col-lg-2 shopnav-item-active "
                  : "col-3 col-lg-2 shopnav-item"
              }
              id="shopnavhome"
              onClick={() => navigate("/eshop")}
            >
              HOME
            </div>
            <div
              className={
                active.items
                  ? "col-3 col-lg-2 shopnav-item-active "
                  : "col-3 col-lg-2 shopnav-item"
              }
              id="shopnavitems"
              onClick={() => navigate("/eshop/items")}
            >
              ITEMS
            </div>
            {user.role === "ADMIN" ? (
              <div
                className={
                  active.admin
                    ? "col-3 col-lg-2 shopnav-item-active "
                    : "col-3 col-lg-2 shopnav-item"
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
                    ? "col-3 col-lg-2 shopnav-item-active "
                    : "col-3 col-lg-2 shopnav-item"
                }
                id="shopnavcart"
                onClick={() => navigate("/eshop/cart")}
              >
                CART
              </div>
            )}
          </div>
        </div>

        {user.isAuthenticated === false ? (
          <div className="col-sm-6 ">
            <div className="row flex-end">
              <div className="col-sm-3 "></div>
              <div
                onClick={() => navigate("/eshop/login")}
                className={
                  active.login
                    ? "col-6 col-lg-3 shopnav-item-active "
                    : "col-6 col-lg-3 shopnav-item"
                }
              >
                Login
              </div>
            </div>
          </div>
        ) : (
          <div className="col-6 col-lg-3 ">
            <div className="row flex-end">
              <div className="col-8 pointercursor highlight ">
                Logged in as: {user.username}
              </div>
              <div onClick={handleLogout} className="col-4 shopnav-item ">
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
      <MyAlert />
    </div>
  );
}
