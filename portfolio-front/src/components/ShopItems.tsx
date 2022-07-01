import axios from "axios";
import React, { useEffect, FC } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import ItemSearch from "./ItemSearch";

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
};

const ShopItems: FC<Props> = ({ items, setItems }) => {
  const navigate = useNavigate();
  const navToDetails = (id: string) => {
    navigate(`/eshop/items/${id}`);
  };

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/shop/items");
    setItems(response.data);
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
