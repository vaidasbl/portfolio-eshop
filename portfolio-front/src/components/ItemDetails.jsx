import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

import ShopNav from "./ShopNav";

export default function ItemDetails({ items }) {
  const { id } = useParams();

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
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
