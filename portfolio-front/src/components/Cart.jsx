import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "./UserContext";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  const getCartItems = async () => {
    const response = await axios.get(
      `http://localhost:3001/api/shop/carts/get/${user._id}`
    );
    setCartItems(response.data.items);
  };

  const handleIncrement = async (i) => {
    try {
      await axios.put(
        `http://localhost:3001/api/shop/items/${i.itemId}/addtouser/${user._id}`
      );
      getCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (i) => {
    try {
      await axios.put(
        `http://localhost:3001/api/shop/items/${i.itemId}/removefromuser/${user._id}`
      );
      getCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="black-container">
      <div className="ouritems">{user.username.toUpperCase()} CART</div>
      <div className="row">
        <div className="col-sm-6 ">
          {cartItems?.map((i) => (
            <div key={i.itemId} className="row mt-4 ms-4 mb-4 ">
              <div className="col-sm-3">{i.itemName}</div>
              <div className="col-sm-3">x {i.quantity}</div>
              <div className="col-sm-3">$ {i.itemPrice * i.quantity}</div>

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
          {cartItems.length > 0 ? (
            <div>
              <hr className="mt-2" />
              <div className="ms-4">
                <div className="row">
                  <div className="col-sm-6 ">TOTAL</div>
                  <div className="col-sm-3">
                    ${" "}
                    {cartItems.reduce(
                      (initValue, item) =>
                        initValue + item.itemPrice * item.quantity,
                      0
                    )}
                  </div>
                  <div className="col-sm-3">
                    <button className="myBtn4">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="fsize20 ps-4">The cart is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
