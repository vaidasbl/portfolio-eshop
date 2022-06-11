import React from "react";
import { useState } from "react";
import ShopNav from "./ShopNav";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <ShopNav />

      <div className="black-container-home items-list-container"></div>
    </div>
  );
}

export default Cart;
