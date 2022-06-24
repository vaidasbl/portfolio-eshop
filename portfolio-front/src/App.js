import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import React, { useEffect, useReducer, useState } from "react";

import { UserContext } from "./components/UserContext";
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
  let initUser = {
    isAuthenticated: null,
    _id: null,
    username: null,
    role: null,
  };

  const reducer = (user, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...user,
          isAuthenticated: true,
          _id: action.payload._id,
          username: action.payload.username,
          role: action.payload.role,
        };
      case "LOGOUT":
        return {
          ...user,
          isAuthenticated: false,
          _id: null,
          username: null,
          role: null,
        };

      default:
        return user;
    }
  };

  const [user, dispatch] = useReducer(reducer, initUser);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:3001/api/shop/items");
    setItems(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (user.isAuthenticated === true) {
    switch (user.role) {
      case "ADMIN":
        return (
          <UserContext.Provider value={{ user, dispatch }}>
            <Router>
              <Routes>
                <Route path="/" element={<HomeHome />} />
                <Route path="/eshop" element={<ShopHome />} />
                <Route
                  path="/eshop/items"
                  element={
                    <ShopItems
                      fetchItems={fetchItems}
                      items={items}
                      setItems={setItems}
                    />
                  }
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
          </UserContext.Provider>
        );
      case "USER":
        return (
          <UserContext.Provider value={{ user, dispatch }}>
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
                  element={
                    <ItemDetails items={items} fetchItems={fetchItems} />
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
                  path="/eshop/items/addform"
                  element={<AdminnAddNewItem fetchItems={fetchItems} />}
                />

                <Route path="/eshop/cart" element={<Cart />} />
                <Route path="/eshop/login" element={<Login />} />
              </Routes>

              <div className="App"></div>
            </Router>
          </UserContext.Provider>
        );
      default:
        return <div></div>;
    }
  } else {
    return (
      <UserContext.Provider value={{ user, dispatch }}>
        <Router>
          <Routes>
            <Route path="/eshop" element={<ShopHome />} />
            <Route path="/eshop/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/eshop/login" replace />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
