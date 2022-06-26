import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch, handleAlert } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const field = e.target.id;
    switch (field) {
      case "txtLoginUsername":
        setUsername(e.target.value);
        break;
      case "txtLoginPassword":
        setPassword(e.target.value);
        break;
      default:
        console.log("Login.jsx 25l");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginJson = {
      username: username,
      password: password,
    };

    try {
      const result = await axios.post(
        "http://localhost:3001/api/shop/users/login",
        loginJson
      );

      if (result.data.success) {
        await dispatch({ type: "LOGIN", payload: result.data });
        navigate("/eshop");
        handleAlert("info", "Successfully logged in", 750);
      } else {
      }
    } catch (err) {
      handleAlert("warning", err.response.data.reason, 1500);
    }
  };

  return (
    <div className="black-container">
      <div className="centerform">
        <div>
          <h6 className="fsize35 pb-4 ">Login</h6>
        </div>
        <form onSubmit={handleLogin}>
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
            <button type="submit" className="myBtn3">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
