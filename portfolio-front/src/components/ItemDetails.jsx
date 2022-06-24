import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

import ShopNav from "./ShopNav";
import { UserContext } from "./UserContext";

export default function ItemDetails({ items }) {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const handleAddToCart = async (i) => {
    const result = await axios.put(
      `http://localhost:3001/api/shop/items/${i._id}/addtouser/${user._id}`
    );
    console.log(result);
  };

  return (
    <div>
      <ShopNav />

      <div className="black-container-home items-list-container">
        <div className="row mt-4">
          <div className="col-lg-4">
            {items
              .filter((item) => item._id === id)
              .map((i) => (
                <div>
                  <ItemCard
                    name={i.itemName}
                    price={i.itemPrice}
                    image={i.imagePath}
                  />
                  <button onClick={() => handleAddToCart(i)} className="myBtn">
                    add to cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
