import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GreetingNav() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("");

  const navPush = (e: React.MouseEvent<HTMLElement>) => {
    let id = (e.target as HTMLInputElement).id;

    if (id === "naveshop") {
      setTheme("eshop");
    }
    if (id === "navmanager") {
      setTheme("manager");
    }
  };

  useEffect(() => {
    if (theme === "eshop") {
      navigate("/eshop");
    }
    if (theme === "manager") {
      navigate("/manager");
    }
  }, [theme]);

  return (
    <div className="col-sm-6 greetingnavcontainer">
      <div className="row">
        <div
          className="col-sm-4 greeting-nav-item "
          id="naveshop"
          onClick={(e) => navPush(e)}
        >
          eshop
        </div>

        <div
          className="col-sm-4 greeting-nav-item "
          id="navmanager"
          onClick={(e) => navPush(e)}
        >
          manager
        </div>

        <div className="col-sm-4 greeting-nav-item ">idk yet</div>
      </div>
    </div>
  );
}