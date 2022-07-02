import axios from "axios";
import React, { useContext, useEffect, useState, FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../07 Common Components/UserContext";

type Item = {
  _id?: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number | string;
  stock: number | string;
  imagePath: string;
};

interface Props {
  fetchItems: () => Promise<void>;
}

const AdminAddNewItem: FC<Props> = ({ fetchItems }) => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [itemData, setItemData] = useState<Item>({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    stock: "",
    imagePath: "",
  });

  const [priceValid, setPriceValid] = useState<boolean>(true);
  const [stockValid, setStockValid] = useState<boolean>(true);

  const handleClear = () => {
    setItemData({
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      stock: "",
      imagePath: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "itemPrice") {
      const regex = /^[0-9\b,.]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setItemData((prevState) => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          };
        });
      } else {
        setPriceValid(false);
        setTimeout(() => setPriceValid(true), 500);
      }
    } else if (e.target.name === "stock") {
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setItemData((prevState) => {
          return {
            ...prevState,
            [e.target.name]: e.target.value,
          };
        });
      } else {
        setStockValid(false);
        setTimeout(() => setStockValid(true), 500);
      }
    } else {
      setItemData((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleSave = async () => {
    if (context !== null) {
      const { handleAlert } = context;

      try {
        await axios.post("http://localhost:3001/api/shop/items", itemData);

        await fetchItems();
        handleAlert("success", "Successfully added new item", 1500);
        navigate("/eshop/admin");
      } catch (err) {
        if (err instanceof Error) {
          handleAlert("error", err.message, 5000);
        } else {
          alert("caught but not instanceof error");
        }
      }
    }
  };

  const [saveDisabled, setSaveDisabled] = useState(false);

  const checkIfAnyEmpty = () => {
    const isEmpty = Object.values(itemData).some(
      (k) => k === undefined || k === ""
    );
    return isEmpty;
  };

  useEffect(() => {
    checkIfAnyEmpty() ? setSaveDisabled(true) : setSaveDisabled(false);
  }, [itemData]);

  return (
    <div className="black-container">
      <div className="centerform">
        <div>
          <h6 className="fsize35 pb-4">Add new item</h6>
        </div>

        <div className="mt-3">
          <label htmlFor="txtItemName" className="fsize20 mb-1">
            Item name
          </label>
          <input
            className="form-control"
            name="itemName"
            type="text"
            value={itemData.itemName}
            required
            id="txtItemName"
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label className="fsize20 mb-1" htmlFor="txtItemDescription">
            Item description
          </label>
          <input
            className="form-control"
            name="itemDescription"
            type="text"
            value={itemData.itemDescription}
            required
            id="txtItemDescription"
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label className="fsize20 mb-1" htmlFor="txtItemPrice">
            Item price
          </label>
          <input
            className="form-control"
            name="itemPrice"
            type="text"
            value={itemData.itemPrice}
            style={
              priceValid ? { border: "none" } : { border: "2px solid red" }
            }
            required
            id="txtItemPrice"
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label className="fsize20 mb-1" htmlFor="txtStock">
            Stock
          </label>
          <input
            className="form-control"
            name="stock"
            type="text"
            value={itemData.stock}
            style={
              stockValid ? { border: "none" } : { border: "2px solid red" }
            }
            required
            id="txtStock"
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label className="fsize20 mb-1" htmlFor="txtImagePath">
            Image path
          </label>
          <input
            className="form-control"
            name="imagePath"
            type="text"
            value={itemData.imagePath}
            required
            id="txtImagePath"
            placeholder="/images/X.jpeg"
            onChange={handleChange}
          />
        </div>

        <div className="row pt-4  justify-between">
          <div className="col-sm-4  justify-start">
            <button
              data-testid="savebtn"
              onClick={handleSave}
              className="myBtn2"
              disabled={saveDisabled}
            >
              Save
            </button>
          </div>
          <div className="col-sm-6  justify-end">
            <button onClick={handleClear} className="myBtn2 me-2">
              Clear
            </button>
            <button onClick={() => navigate(-1)} className="myBtn2">
              Go back
            </button>
          </div>

          <div className="col-sm-5 align-end"></div>
        </div>
      </div>
    </div>
  );
};
export default AdminAddNewItem;
