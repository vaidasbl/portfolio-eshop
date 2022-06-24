import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import ShopNav from "./ShopNav";
import { UserContext } from "./UserContext";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  const getCartItems = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/shop/carts/get/${user._id}`
    );
    setCartItems(response.data.items);
    console.log(response.data.items);
  };

  const handleIncrement = async (i) => {
    try {
      const result = await axios.put(
        `http://localhost:3001/api/shop/items/${i.itemId}/addtouser/${user._id}`
      );
      getCartItems();

      console.log(i.itemId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (i) => {
    try {
      const result = await axios.put(
        `http://localhost:3001/api/shop/items/${i.itemId}/removefromuser/${user._id}`
      );
      getCartItems();

      console.log(i.itemId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      <ShopNav />

      <div className="black-container-home items-list-container">
        <div className="ouritems">{user.username.toUpperCase()} ITEMS</div>
        {cartItems?.map((i) => (
          <div key={i.itemId} className="row mt-4 ms-4 mb-4">
            <div className="col-sm-3">{i.itemName}</div>
            <div className="col-sm-3">{i.quantity}</div>

            <div className="col-sm-3">
              <button
                onClick={() => handleIncrement(i)}
                className="myBtn3 me-2"
              >
                +
              </button>

              <button onClick={() => handleDecrement(i)} className="myBtn3">
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
