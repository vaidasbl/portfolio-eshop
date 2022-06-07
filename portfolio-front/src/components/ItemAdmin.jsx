import React, { useEffect, useState } from "react";

import ShopNav from "./ShopNav";

export default function ItemAdmin({ items }) {
  const [edit, setEdit] = useState({
    inEditMode: false,
    editRowId: "",
    editedItem: {},
  });
  const handleEdit = (item) => {
    setEdit({ inEditMode: true, editRowId: item._id, editedItem: item });
  };

  return (
    <div>
      <ShopNav />

      <div className="black-container-home items-list-container">
        <div className="row p-4 center tableheader">
          <div className="col-sm-2">ITEM NAME</div>
          <div className="col-sm-2">ITEM DESCRIPTION</div>
          <div className="col-sm-2">ITEM PRICE</div>
          <div className="col-sm-2">IMAGE PATH</div>
          <div className="col-sm-2"></div>
          <div className="col-sm-2"></div>
        </div>

        {items.map((item) => (
          <div>
            {edit.inEditMode && edit.editRowId === item._id ? (
              <React.Fragment>
                <div
                  onClick={() => handleEdit(item)}
                  className="row p-2 center"
                >
                  <hr />
                  <div className="col-sm-2">
                    <input type="text"></input>
                  </div>
                  <div className="col-sm-2">
                    <input type="text"></input>
                  </div>
                  <div className="col-sm-2">
                    <input type="text"></input>
                  </div>
                  <div className="col-sm-2">
                    <input type="text"></input>
                  </div>
                  <div className="col-sm-2"></div>
                  <div className="col-sm-2 ">
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div
                  onClick={() => handleEdit(item)}
                  className="row p-2 center"
                >
                  <hr />
                  <div className="col-sm-2">{item.itemName}</div>
                  <div className="col-sm-2">{item.itemDescription}</div>
                  <div className="col-sm-2">{item.itemPrice}</div>
                  <div className="col-sm-2">{item.imagePath}</div>
                  <div className="col-sm-2"></div>
                  <div className="col-sm-2 ">
                    <button className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
}
