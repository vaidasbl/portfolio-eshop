import axios from "axios";
import React, { useState, useContext, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../07 Common Components/UserContext";

const Login: FC = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "txtLoginUsername") {
      setUsername(e.target.value);
    } else if (e.target.id === "txtLoginPassword") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const loginJson = {
      username: username,
      password: password,
    };

    if (context !== null) {
      const { dispatch, handleAlert } = context;
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
      } catch (err: any) {
        handleAlert("error", err.response.data.reason, 1500);
      }
    } else {
      alert("context is null");
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
              onChange={handleChange}
            />
          </div>

          <div className="mt-3">
            <label className="fsize20 mb-1">Password</label>
            <input
              className="form-control text-align-center"
              type="text"
              id="txtLoginPassword"
              onChange={handleChange}
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
};

export default Login;
