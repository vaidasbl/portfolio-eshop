import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alert } from "../08 Reducers/alert";

type CartItem = {
  itemId?: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  quantity: number;
  imagePath: string;
};

function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const user = useSelector((state: any) => state.user.value);

  const getCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/shop/carts/get/${user._id}`
      );
      setCartItems(response.data.items);
    } catch (err) {
      alert("ERROR");
    }
  };

  const handleIncrement = async (i: CartItem) => {
    try {
      await axios.put(
        `http://localhost:3001/api/shop/items/${i.itemId}/addtouser/${user._id}`
      );
      dispatch(alert({ type: "success", text: "Item added", time: 750 }));
      getCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (i: CartItem) => {
    try {
      await axios.put(
        `http://localhost:3001/api/shop/items/${i.itemId}/removefromuser/${user._id}`
      );
      dispatch(alert({ type: "success", text: "Item removed", time: 750 }));
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
      <div className="row mt-4 ms-4 mb-4 ">
        <div className="col-lg-6 col-md-8 col-12">
          {cartItems?.map((i) => (
            <div key={i.itemId} className="row mt-4">
              <div className="col-3">{i.itemName}</div>
              <div className="col-3">x {i.quantity}</div>
              <div className="col-3">$ {i.itemPrice * i.quantity}</div>
              <div className="col-3">
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

              <div className="row ">
                <div className="col-3">TOTAL</div>
                <div className="col-3"></div>
                <div className="col-3">
                  ${" "}
                  {cartItems.reduce(
                    (initValue, item) =>
                      initValue + item.itemPrice * item.quantity,
                    0
                  )}
                </div>
                <div className="col-3">
                  <button className="myBtn4">Checkout</button>
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
