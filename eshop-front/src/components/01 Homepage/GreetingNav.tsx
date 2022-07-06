import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set, unset } from "../../Reducers/theme";

export default function GreetingNav() {
  const theme = useSelector((state: any) => state.theme.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setTheme = async (e: React.MouseEvent<HTMLElement>) => {
    let id = (e.target as HTMLInputElement).id;

    if (id === "naveshop") {
      dispatch(set({ theme: "eshop" }));
      navigate("/eshop");
    } else if (id === "navbank") {
      dispatch(set({ theme: "bank" }));
      navigate("/ebank");
    }
  };

  // useEffect(() => {
  //   if (theme.theme === "bank") {
  //     navigate("/ebank");
  //   }
  //   if (theme.theme === "eshop") {
  //     navigate("/eshop");
  //   }
  // }, [theme.theme]);

  return (
    <div className="col-sm-6 greetingnavcontainer">
      <div className="row">
        <div
          className="col-sm-4 greeting-nav-item "
          id="naveshop"
          onClick={setTheme}
        >
          eshop
        </div>

        <div
          className="col-sm-4 greeting-nav-item "
          id="navbank"
          onClick={setTheme}
        >
          bank
        </div>

        <div className="col-sm-4 greeting-nav-item ">idk yet</div>
      </div>
    </div>
  );
}
