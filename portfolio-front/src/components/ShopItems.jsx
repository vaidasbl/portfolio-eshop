import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import ItemSearch from "./ItemSearch";
import ShopNav from "./ShopNav";

export default function ShopItems({ items, setItems }) {
  const navigate = useNavigate();
  const navToDetails = (id) => {
    navigate(`/eshop/items/${id}`);
  };

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/shop/items");
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <ShopNav />

      <div className="black-container-home items-list-container">
        <div className="ouritems">OUR ITEMS</div>
        <div className="row ">
          <div className="ms-4 mb-4">
            <ItemSearch setItems={setItems} />
          </div>
          {items.map((i) => (
            <div
              key={i._id}
              className="col-lg-4 pointercursor cardContainer"
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
