import axios from "axios";
import React, { useState, FC, ChangeEvent } from "react";

type Item = {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  stock: number;
  imagePath: string;
};

interface Props {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemSearch: FC<Props> = ({ setItems }) => {
  const [searchString, setSearchString] = useState<string>("");
  const [validSearch, setValidSearch] = useState<boolean>(true);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
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
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
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
};

export default ItemSearch;
