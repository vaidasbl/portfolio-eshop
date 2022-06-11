import axios from "axios";
import React, { useState } from "react";

function ItemSearch({ setItems }) {
  const [searchString, setSearchString] = useState("");
  const [validSearch, setValidSearch] = useState(true);

  const handleSearch = async (e) => {
    const searchString = e.target.value;
    const regex = /^[a-zA-Zą-ž\s\d-]+$/;

    try {
      if (searchString === "" || regex.test(searchString)) {
        setSearchString(searchString);
        const response = await axios.get(
          `http://localhost:3001/api/shop/items/search/${searchString}`
        );
        setItems(response.data);
      } else {
        setValidSearch(false);
        setTimeout(() => setValidSearch(true), 500);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="">
      <input
        type="text"
        className="searchField inputBoxOutline"
        placeholder="Filter by item name..."
        onChange={(e) => handleSearch(e)}
        value={searchString}
        style={validSearch ? {} : { border: "1px solid red" }}
      ></input>
    </div>
  );
}

export default ItemSearch;
