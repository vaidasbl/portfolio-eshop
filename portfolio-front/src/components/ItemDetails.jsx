import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

import ShopNav from "./ShopNav";
import { UserContext } from "./UserContext";

export default function ItemDetails({ items, fetchItems }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const handleAddToCart = async (i) => {
    try {
      await axios.put(
        `http://localhost:3001/api/shop/items/${i._id}/addtouser/${user._id}`
      );
      fetchItems();
      alert("added");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="black-container mt-10vh">
      {items
        .filter((item) => item._id === id)
        .map((i) => (
          <div key={i._id} className="row">
            <div className="col-sm-5">
              <ItemCard
                name={i.itemName}
                price={i.itemPrice}
                image={i.imagePath}
              />
            </div>
            <div className="col-sm-5 mt-3  centerVertical">
              <div>{i.itemDescription}</div>
              <div className=" mt-30vh">
                Items in warehouse: {i.stock ? i.stock : 0}
              </div>
            </div>
            <div className="col-sm-5 justify-between">
              <button
                onClick={() => handleAddToCart(i)}
                className="myBtn2 ms-3"
                disabled={i.stock > 0 ? false : true}
              >
                add to cart
              </button>
              <button onClick={() => navigate(-1)} className="myBtn2 me-3">
                go back
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
