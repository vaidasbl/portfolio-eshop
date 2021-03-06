import React from "react";

type Props = {
  image: string;
  name: string;
  price: number;
};

function ItemCard({ image, name, price }: Props) {
  return (
    <div className="item-card-container ">
      <div className="item-card-image-container">
        <img src={image} alt={name} className="itemimg"></img>
      </div>
      <div className="container">
        <hr />
        <div className="row item-card-title ">
          <div className="col-9 card-name">{name}</div>
          <div className="col-3 card-price">${price}</div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
