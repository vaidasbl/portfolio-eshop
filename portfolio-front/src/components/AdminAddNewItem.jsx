import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ShopNav from "./ShopNav";

export default function AdminnAddNewItem({ items, fetchItems }) {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: "",
    imagePath: "",
  });

  const [priceValid, setPriceValid] = useState(true);

  const handleClear = () => {
    setItemData({
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      imagePath: "",
    });
  };
  const handleChange = (e) => {
    if (e.target.name !== "itemPrice") {
      setItemData((prevState) => {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      });
    } else {
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
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:3001/api/shop/items", itemData);
      fetchItems();
      navigate("/eshop/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  const [saveDisabled, setSaveDisabled] = useState(false);
  const keys = Object.keys(itemData);

  const checkIfAnyEmpty = () => {
    const empty = keys.map((k) => itemData[k]).some((value) => value === "");
    return empty;
  };

  useEffect(() => {
    checkIfAnyEmpty() ? setSaveDisabled(true) : setSaveDisabled(false);
  }, [itemData]);

  return (
    <div>
      <ShopNav />
      <div className="black-container-home">
        <div className="greeting">
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
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mt-3">
            <label className="fsize20 mb-1" htmlFor="txtItemDescription">
              Item Description
            </label>
            <input
              className="form-control"
              name="itemDescription"
              type="text"
              value={itemData.itemDescription}
              required
              id="txtItemDescription"
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
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
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="row pt-4">
            <div className="col-sm-7 justify-end ">
              <button
                onClick={() => handleSave()}
                className="myBtn2"
                disabled={saveDisabled}
              >
                Save
              </button>
            </div>

            <div className="col-sm-5 align-end">
              <button onClick={() => handleClear()} className="myBtn2 me-2">
                Clear fields
              </button>
              <button onClick={() => navigate(-1)} className="myBtn2">
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
