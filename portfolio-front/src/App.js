import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { useEffect, useState } from "react";

import HomeHome from "./components/HomeHome";
import ShopHome from "./components/ShopHome";
import ShopItems from "./components/ShopItems";
import axios from "axios";
import ItemDetails from "./components/ItemDetails";
import ItemAdmin from "./components/ItemAdmin";
import AdminnAddNewItem from "./components/AdminAddNewItem";
import Cart from "./components/Cart";
import Login from "./components/Login";

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/shop/items");
    setItems(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeHome />} />
        <Route path="/eshop" element={<ShopHome />} />
        <Route
          path="/eshop/items"
          element={<ShopItems items={items} setItems={setItems} />}
        />
        <Route
          path="/eshop/items/:id"
          element={<ItemDetails items={items} />}
        />
        <Route
          path="/eshop/admin"
          element={
            <ItemAdmin
              fetchItems={fetchItems}
              items={items}
              setItems={setItems}
            />
          }
        />

        <Route
          path="/eshop/items/addform"
          element={<AdminnAddNewItem fetchItems={fetchItems} />}
        />

        <Route path="/eshop/cart" element={<Cart />} />
        <Route path="/eshop/login" element={<Login />} />
      </Routes>

      <div className="App"></div>
    </Router>
  );
}

export default App;
