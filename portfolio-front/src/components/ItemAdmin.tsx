import axios from "axios";
import React, { useContext, useEffect, useState, FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ItemSearch from "./ItemSearch";
import UserContext from "./UserContext";

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
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  fetchItems: () => Promise<void>;
}

const ItemAdmin: FC<Props> = ({ items, setItems, fetchItems }) => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [itemData, setItemData] = useState({
    itemName: "",
    itemDescription: "",
    itemPrice: 0,
    imagePath: "",
    stock: 0,
  });

  const [edit, setEdit] = useState({
    inEditMode: false,
    editRowId: "",
    editedItem: {},
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: isNaN(Number(e.target.value))
          ? e.target.value
          : Number(e.target.value),
      };
    });
  };

  const handleDelete = async (item: Item) => {
    if (context !== null) {
      const { handleAlert } = context;
      try {
        const result = await Swal.fire({
          title: "Are you sure?",

          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        });
        if (result.isConfirmed) {
          await axios.delete(
            `http://localhost:3001/api/shop/items/${item._id}`
          );
          handleAlert("success", "Successfully deleted", 1500);
        }
      } catch (err) {
        alert("error but not instance of Error");
        if (err instanceof Error) handleAlert("error", err.message, 5000);
      }

      fetchItems();

      setEdit({ ...edit, inEditMode: false });
    }
  };

  const handleEdit = (item: Item) => {
    setEdit({ ...edit, inEditMode: true, editRowId: item._id });

    setItemData({
      ...itemData,
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemPrice: item.itemPrice,
      imagePath: item.imagePath,
      stock: item.stock,
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (item: Item) => {
    try {
      await axios.put(
        `http://localhost:3001/api/shop/items/${item._id}`,
        itemData
      );
      fetchItems();
    } catch (err) {
      alert("caught but not instanceof error");
      if (err instanceof Error) {
        alert("bad data input. saving failed.");
      }
    }

    setEdit({ ...edit, inEditMode: false });
  };

  return (
    <div className="black-container">
      <div className="row pt-4">
        <div className="col-sm-4 ">
          <button
            onClick={() => navigate("/eshop/admin/addform")}
            className="myBtn"
          >
            Add new item
          </button>
        </div>
        <div className="col-sm-8">
          <ItemSearch setItems={setItems} />
        </div>
      </div>

      <div className="row pb-4 pt-10 center tableheader">
        <div className="col-sm-2">ITEM NAME</div>
        <div className="col-sm-2">ITEM DESCRIPTION</div>
        <div className="col-sm-2">ITEM PRICE</div>
        <div className="col-sm-2">STOCK</div>
        <div className="col-sm-2">IMAGE PATH</div>
        <div className="col-sm-2"></div>
      </div>

      {items.map((item) => (
        <div key={item._id}>
          {edit.inEditMode && edit.editRowId === item._id ? (
            <div className="row  editFormRow">
              <hr />
              <div className="col-sm-2">
                <input
                  name="itemName"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={(e) => handleChange(e)}
                  defaultValue={item.itemName}
                ></input>
              </div>
              <div className="col-sm-2">
                <input
                  name="itemDescription"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={(e) => handleChange(e)}
                  defaultValue={item.itemDescription}
                ></input>
              </div>
              <div className="col-sm-2">
                <input
                  name="itemPrice"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={(e) => handleChange(e)}
                  defaultValue={item.itemPrice}
                ></input>
              </div>
              <div className="col-sm-2">
                <input
                  name="stock"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={(e) => handleChange(e)}
                  defaultValue={item.stock}
                ></input>
              </div>
              <div className="col-sm-2">
                <input
                  name="imagePath"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={(e) => handleChange(e)}
                  defaultValue={item.imagePath}
                ></input>
              </div>

              <div className="col-sm-2 alignRight">
                <button className="myBtn3" onClick={() => handleSave(item)}>
                  Save
                </button>
                <button
                  className="myBtn3"
                  onClick={() => setEdit({ ...edit, inEditMode: false })}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="myBtn-red"
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
              <div className="col-sm-2">{item.stock}</div>
              <div className="col-sm-2">{item.imagePath}</div>

              <div className="col-sm-2 "></div>
            </div>
          )}
        </div>
      ))}
      <div className="row">
        <hr />
      </div>
    </div>
  );
};
export default ItemAdmin;
