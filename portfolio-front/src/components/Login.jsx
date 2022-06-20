import axios from "axios";
import React, { useState } from "react";
import ShopNav from "./ShopNav";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const field = e.target.id;
    console.log(username, password);
    switch (field) {
      case "txtLoginUsername":
        setUsername(e.target.value);
        break;
      case "txtLoginPassword":
        setPassword(e.target.value);
        break;
      default:
        alert("error");
    }
  };
  const handleLogin = async () => {
    const loginJson = {
      username: username,
      password: password,
    };

    const result = await axios.post(
      "http://localhost:3001/api/shop/users/login",
      loginJson
    );

    if (result.data) {
      console.log("logged in");
    } else {
      console.log("failed login");
    }
  };

  return (
    <div>
      <ShopNav />

      <div className="black-container-home items-list-container ">
        <div className="greeting ">
          <div>
            <h6 className="fsize35 pb-4 ">Login</h6>
          </div>

          <div className="mt-3">
            <label className="fsize20 mb-1">Username</label>
            <input
              className="form-control text-align-center"
              type="text"
              id="txtLoginUsername"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mt-3">
            <label className="fsize20 mb-1">Password</label>
            <input
              className="form-control text-align-center"
              type="text"
              id="txtLoginPassword"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mt-3">
            <button onClick={() => handleLogin()} className="myBtn ">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
