import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import React, { useState } from "react";
import ShopHome from "./components/02 Shop Home/ShopHome";
import ShopItems from "./components/05 Shop Item/ShopItems";

import axios from "axios";
import ItemDetails from "./components/05 Shop Item/ItemDetails";
import ItemAdmin from "./components/05 Shop Item/ItemAdmin";
import AdminAddNewItem from "./components/05 Shop Item/AdminAddNewItem";
import Cart from "./components/06 Cart/Cart";
import Login from "./components/04 Shop Login/Login";
import { useSelector } from "react-redux";
import LayoutWithNav from "./components/03 Shop Nav/LayoutWithNav";
import LayoutWithAnonNav from "./components/03 Shop Nav/LayoutWithAnonNav";

type Item = {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  stock: number;
  imagePath: string;
};

function App() {
  const user = useSelector((state: any) => state.user.value);
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/shop/items");
    setItems(response.data);
  };

  if (user.isAuthenticated) {
    switch (user.role) {
      case "ADMIN":
        return (
          <Router>
            <Routes>
              <Route element={<LayoutWithNav />}>
                <Route path="/eshop" element={<ShopHome />} />

                <Route
                  path="/eshop/items"
                  element={
                    <ShopItems
                      items={items}
                      setItems={setItems}
                      fetchItems={fetchItems}
                    />
                  }
                />
                <Route
                  path="/eshop/items/:id"
                  element={
                    <ItemDetails fetchItems={fetchItems} items={items} />
                  }
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
                  path="/eshop/admin/addform"
                  element={<AdminAddNewItem fetchItems={fetchItems} />}
                />
              </Route>
              <Route />
            </Routes>
          </Router>
        );
      case "USER":
        return (
          <Router>
            <Routes>
              <Route element={<LayoutWithNav />}>
                <Route path="/eshop" element={<ShopHome />} />
                <Route
                  path="/eshop/items"
                  element={
                    <ShopItems
                      items={items}
                      setItems={setItems}
                      fetchItems={fetchItems}
                    />
                  }
                />
                <Route
                  path="/eshop/items/:id"
                  element={
                    <ItemDetails items={items} fetchItems={fetchItems} />
                  }
                />
                <Route path="/eshop/cart" element={<Cart />} />
              </Route>

              <Route path="*" element={<Navigate to="/eshop" replace />} />
            </Routes>
          </Router>
        );
      default:
        return <div></div>;
    }
  } else {
    return (
      <Router>
        <Routes>
          <Route element={<LayoutWithAnonNav />}>
            <Route path="/eshop" element={<ShopHome />} />
            <Route path="/eshop/login" element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to="/eshop/login" replace />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
