import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import ShopNav from "./ShopNav";

export default function ShopItems({ items }) {
  const navigate = useNavigate();

  const navToDetails = (id) => {
    navigate(`/eshop/items/${id}`);
  };

  return (
    <div>
      <ShopNav />

      <div className="black-container items-list-container">
        <div className="ouritems">OUR ITEMS</div>
        <div className="row">
          {items.map((i) => (
            <div
              key={i._id}
              className="col-lg-4"
              onClick={() => navToDetails(i._id)}
            >
              {
                <ItemCard
                  name={i.itemName}
                  price={i.itemPrice}
                  image={i.imagePath}
                />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
