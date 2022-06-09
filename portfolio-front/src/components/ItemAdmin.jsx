import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ShopNav from "./ShopNav";

export default function ItemAdmin({ items, setItems, fetchItems }) {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: 0,
    imagePath: "",
  });

  const [searchString, setSearchString] = useState("");

  const [edit, setEdit] = useState({
    inEditMode: false,
    editRowId: "",
    editedItem: {},
  });

  const handleChange = (e) => {
    setItemData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: isNaN(e.target.value)
          ? e.target.value
          : Number(e.target.value),
      };
    });
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`http://localhost:3001/api/shop/items/${item._id}`);
    } catch (err) {
      alert(err.message);
    }

    fetchItems();

    setEdit({
      inEditMode: false,
    });
  };

  const handleEdit = (item) => {
    setEdit({
      inEditMode: true,
      editRowId: item._id,
    });

    setItemData({
      ...itemData,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemPrice: item.itemPrice,
      imagePath: item.imagePath,
    });
  };

  const handleSave = async (item) => {
    try {
      await axios.put(
        `http://localhost:3001/api/shop/items/${item._id}`,
        itemData
      );
      fetchItems();
    } catch (err) {
      if (err.response.status === 400) {
        alert("bad data input. saving failed.");
      }
    }

    setEdit({
      inEditMode: false,
    });
  };

  const handleSearch = async (e) => {
    setSearchString(e.target.value);

    try {
      const response = await axios.get(
        `http://localhost:3001/api/shop/items/search/${e.target.value}`
      );
      console.log(response.data);
      setItems(response.data);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <ShopNav />

      <div className="black-container-home items-list-container">
        <div className="row ">
          <div className="col-sm-4 pt-4">
            <button
              onClick={() => navigate("/eshop/items/addform")}
              className="myBtn"
            >
              Add new item
            </button>
          </div>
          <div className="col-sm-8 pt-4 justify-start ">
            <input
              type="text"
              className="searchField"
              placeholder="Filter by item name..."
              onChange={(e) => handleSearch(e)}
              value={searchString}
            ></input>
          </div>
        </div>

        <div className="row pb-4 pt-10 center tableheader">
          <div className="col-sm-2">ITEM NAME</div>
          <div className="col-sm-2">ITEM DESCRIPTION</div>
          <div className="col-sm-2">ITEM PRICE</div>
          <div className="col-sm-2">IMAGE PATH</div>
          <div className="col-sm-2"></div>
          <div className="col-sm-2"></div>
        </div>

        {items.map((item) => (
          <div key={item._id}>
            {edit.inEditMode && edit.editRowId === item._id ? (
              <div className="row editFormRow">
                <hr />
                <div className="col-sm-2">
                  <input
                    name="itemName"
                    type="text"
                    className="editForm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={item.itemName}
                  ></input>
                </div>
                <div className="col-sm-2">
                  <input
                    name="itemDescription"
                    type="text"
                    className="editForm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={item.itemDescription}
                  ></input>
                </div>
                <div className="col-sm-2">
                  <input
                    name="itemPrice"
                    type="text"
                    className="editForm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={item.itemPrice}
                  ></input>
                </div>
                <div className="col-sm-2">
                  <input
                    name="imagePath"
                    type="text"
                    className="editForm"
                    onChange={(e) => handleChange(e)}
                    defaultValue={item.imagePath}
                  ></input>
                </div>
                <div className="col-sm-2 alignRight">
                  <button
                    className="myBtn3 me-1"
                    onClick={() => handleSave(item)}
                  >
                    Save
                  </button>
                  <button
                    className="myBtn3"
                    onClick={() =>
                      setEdit({
                        inEditMode: false,
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-sm-2 ">
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div onClick={() => handleEdit(item)} className="row editFormRow">
                <hr />
                <div className="col-sm-2">{item.itemName}</div>
                <div className="col-sm-2">{item.itemDescription}</div>
                <div className="col-sm-2">{item.itemPrice}</div>
                <div className="col-sm-2">{item.imagePath}</div>
                <div className="col-sm-2"></div>

                <div className="col-sm-2 "></div>
              </div>
            )}
          </div>
        ))}
        <div className="row">
          <hr />
        </div>
      </div>
    </div>
  );
}
