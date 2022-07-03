import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../05 Shop Item/ItemCard";
import ItemSearch from "../07 Common Components/ItemSearch";

type Item = {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  stock: number;
  imagePath: string;
};

type Props = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  fetchItems: () => Promise<void>;
};

const ShopItems: FC<Props> = ({ items, setItems, fetchItems }) => {
  const navigate = useNavigate();
  const navToDetails = (id: string) => {
    navigate(`/eshop/items/${id}`);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (items !== undefined || items !== null) {
    return (
      <div className="black-container">
        <div className="ouritems">OUR ITEMS</div>
        <div className="row ">
          <div className="ps-4">
            <ItemSearch setItems={setItems} />
            <hr />
          </div>
          {items.map((i: Item) => (
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
    );
  } else {
    return <div className="black-container">NO ITEMS</div>;
  }
};
export default ShopItems;
