import axios from "axios";
import React, { useEffect, useState, FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ItemSearch from "../07 Common Components/ItemSearch";
import { useDispatch } from "react-redux";
import { alert } from "../08 Reducers/alert";

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
  const dispatch = useDispatch();
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
    try {
      const result = await Swal.fire({
        title: "Are you sure?",

        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      });
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3001/api/shop/items/${item._id}`);
        dispatch(
          alert({
            type: "success",
            text: "Item successfully deleted",
            time: 1500,
          })
        );
      }
    } catch (err: any) {
      dispatch(alert({ type: "error", text: err.message, time: 3000 }));
      console.log(err.message);
    }

    fetchItems();

    setEdit({ ...edit, inEditMode: false });
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
      dispatch(
        alert({ type: "success", text: "Successfully updated", time: 1500 })
      );
    } catch (err: any) {
      dispatch(alert({ type: "error", text: err.message, time: 3000 }));
      console.log(err.message);
    }

    setEdit({ ...edit, inEditMode: false });
  };

  return (
    <div className="black-container">
      <div className="col-sm-12 col-md-6 col-lg-4 ">
        <div className="row pt-4">
          <div className="col-sm-4 col-md-6 col-lg-6 ">
            <button
              onClick={() => navigate("/eshop/admin/addform")}
              className="myBtn"
            >
              Add new item
            </button>
          </div>
          <div className="col-sm-4 col-md-6 col-lg-6 ">
            <ItemSearch setItems={setItems} />
          </div>
        </div>
      </div>

      <div className="row pb-4 pt-10 center tableheader">
        <div className="col-2">ITEM NAME</div>
        <div className="col-2">ITEM DESCRIPTION</div>
        <div className="col-2">ITEM PRICE</div>
        <div className="col-2">STOCK</div>
        <div className="col-2">IMAGE PATH</div>
        <div className="col-2"></div>
      </div>

      {items.map((item) => (
        <div key={item._id}>
          {edit.inEditMode && edit.editRowId === item._id ? (
            <div className="row  editFormRow">
              <hr />
              <div className="col-sm-2 col-md-2">
                <input
                  name="itemName"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={handleChange}
                  defaultValue={item.itemName}
                ></input>
              </div>
              <div className="col-sm-2 col-md-2">
                <input
                  name="itemDescription"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={handleChange}
                  defaultValue={item.itemDescription}
                ></input>
              </div>
              <div className="col-sm-2 col-md-2">
                <input
                  name="itemPrice"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={handleChange}
                  defaultValue={item.itemPrice}
                ></input>
              </div>
              <div className="col-sm-2 col-md-2">
                <input
                  name="stock"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={handleChange}
                  defaultValue={item.stock}
                ></input>
              </div>
              <div className="col-sm-2 col-md-2">
                <input
                  name="imagePath"
                  type="text"
                  className="editForm inputBoxOutline"
                  onChange={handleChange}
                  defaultValue={item.imagePath}
                ></input>
              </div>

              <div className="col-sm-2 col-md-2 ">
                <button
                  className="myBtn3 me-1"
                  onClick={() => handleSave(item)}
                >
                  Save
                </button>
                <button
                  className="myBtn3 me-1"
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
              <div className="col-2 overflow">{item.itemName}</div>
              <div className="col-2 overflow">{item.itemDescription}</div>
              <div className="col-2 overflow">{item.itemPrice}</div>
              <div className="col-2 overflow">{item.stock}</div>
              <div className="col-2 overflow">{item.imagePath}</div>

              <div className="col-2 "></div>
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
