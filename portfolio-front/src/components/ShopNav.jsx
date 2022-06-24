import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function ShopNav() {
  const { user, dispatch } = useContext(UserContext);
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
    alert("Successfully logged out");
  };

  return (
    <div className="shopheader">
      <div className="row shopnav">
        <div className="col-sm-4">
          <div className="row ">
            <div
              className="col-sm-3 shopnav-item"
              id="shopnavhome"
              onClick={(e) => navPush(e)}
            >
              HOME
            </div>
            <div
              className="col-sm-3 shopnav-item"
              id="shopnavitems"
              onClick={(e) => navPush(e)}
            >
              ITEMS
            </div>
            {user.role === "ADMIN" ? (
              <div
                className="col-sm-3 shopnav-item"
                id="shopnavadmin"
                onClick={(e) => navPush(e)}
              >
                ADMIN
              </div>
            ) : (
              <div
                className="col-sm-3 shopnav-item"
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
              className="col-sm-2 pointercursor highlight "
              id="shopnavlogin"
              onClick={(e) => navPush(e)}
            >
              Login
            </div>
          </div>
        ) : (
          <div className="col-sm-4 justify-end">
            <div className="row">
              <div className="col-sm-8 pointercursor highlight">
                Logged in as: {user.username}
              </div>
              <div
                onClick={handleLogout}
                className="col-sm-4 pointercursor highlight"
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
