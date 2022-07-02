import axios from "axios";
import React from "react";
import { useContext, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "../05 Shop Item/ItemCard";
import UserContext from "../07 Common Components/UserContext";

type Item = {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  stock: number;
  imagePath: string;
};

interface Props {
  items: Item[];
  fetchItems: () => Promise<void>;
}

const ItemDetails: FC<Props> = ({ items, fetchItems }) => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const user = context?.user;

  const handleAddToCart = async (i: Item) => {
    if (context !== null) {
      const { handleAlert, user } = context;
      try {
        await axios.put(
          `http://localhost:3001/api/shop/items/${i._id}/addtouser/${user._id}`
        );
        handleAlert("success", "Item added to the cart", 750);
        await fetchItems();
      } catch (err) {
        if (err instanceof Error) {
          handleAlert("error", err.message, 750);
        }
      }
    } else {
      alert("context is null");
    }
  };

  return (
    <div className="black-container pt-4">
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
            {user?.role === "USER" ? (
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
            ) : (
              <div className="col-sm-5 justify-end ">
                <button onClick={() => navigate(-1)} className="myBtn2 me-3 ">
                  go back
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
export default ItemDetails;
