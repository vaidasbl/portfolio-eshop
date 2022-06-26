import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function ShopNav() {
  const location = useLocation();
  const { user, dispatch, handleAlert } = useContext(UserContext);
  const [active, setActive] = useState({
    home: true,
    items: false,
    cart: false,
    login: false,
    admin: false,
  });

  const setBorder = () => {
    if (location.pathname === "/eshop") {
      setActive({ home: true });
    } else if (
      location.pathname === "/eshop/items" ||
      location.pathname.includes("items/")
    ) {
      setActive({ items: true });
    } else if (location.pathname === "/eshop/cart") {
      setActive({ cart: true });
    } else if (location.pathname === "/eshop/login") {
      setActive({ login: true });
    } else if (location.pathname.includes("admin")) {
      setActive({ admin: true });
    }
  };

  useEffect(() => {
    setBorder();
  }, [location.pathname]);

  const navigate = useNavigate();
  const navPush = (e) => {
    let id = e.target.id;

    switch (id) {
      case "shopnavhome":
        navigate("/eshop");
        break;
      case "shopnavitems":
        navigate("/eshop/items");
        break;
      case "shopnavadmin":
        navigate("/eshop/admin");
        break;
      case "shopnavcart":
        navigate("/eshop/cart");
        break;
      case "shopnavlogin":
        navigate("/eshop/login");
        break;
      default:
        navigate("/eshop");
    }
  };

  const handleLogout = async () => {
    await dispatch({ type: "LOGOUT" });
    handleAlert("info", "Sucessfully logged out", 1500);
  };

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
              onClick={(e) => navPush(e)}
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
              onClick={(e) => navPush(e)}
            >
              ITEMS
            </div>
            {user.role === "ADMIN" ? (
              <div
                className={
                  active.admin
                    ? "col-sm-3 shopnav-item-active"
                    : "col-sm-3 shopnav-item"
                }
                id="shopnavadmin"
                onClick={(e) => navPush(e)}
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
                onClick={(e) => navPush(e)}
              >
                CART
              </div>
            )}
          </div>
        </div>

        {!user.isAuthenticated ? (
          <div className="col-sm-4 justify-end">
            <div
              className={
                active.login
                  ? "col-sm-3 shopnav-item-active"
                  : "col-sm-3 shopnav-item"
              }
              id="shopnavlogin"
              onClick={(e) => navPush(e)}
            >
              Login
            </div>
          </div>
        ) : (
          <div className="col-sm-8 ">
            <div className="row flex-end">
              <div className="col-sm-3 pointercursor highlight ">
                Logged in as: {user.username}
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
