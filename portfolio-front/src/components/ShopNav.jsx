import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShopNav() {
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
            <div
              className="col-sm-3 shopnav-item"
              id="shopnavadmin"
              onClick={(e) => navPush(e)}
            >
              ADMIN
            </div>
            <div
              className="col-sm-3 shopnav-item"
              id="shopnavcart"
              onClick={(e) => navPush(e)}
            >
              CART
            </div>
          </div>
        </div>
        <div className="col-sm-4 justify-end">
          <div
            className="col-sm-2 pointercursor highlight "
            id="shopnavlogin"
            onClick={(e) => navPush(e)}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}
