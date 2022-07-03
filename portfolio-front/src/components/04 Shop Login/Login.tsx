import axios from "axios";
import React, { useState, FC, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../08 Reducers/user";
import { alert } from "../08 Reducers/alert";

const Login: FC = () => {
  const dispatch = useDispatch();
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

    try {
      const result = await axios.post(
        "http://localhost:3001/api/shop/users/login",
        loginJson
      );

      if (result.data.success) {
        console.log(result.data);
        dispatch(login(result.data));
        navigate("/eshop");
        dispatch(
          alert({ type: "success", text: "Successfully logged in", time: 1500 })
        );
      } else {
      }
    } catch (err: any) {
      console.log(err);
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
