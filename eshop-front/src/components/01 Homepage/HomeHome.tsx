import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unset } from "../../Reducers/theme";
import GreetingNav from "./GreetingNav";

export default function HomeHome() {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.value);
  const user = useSelector((state: any) => state.user.value);

  return (
    <div className="black-container">
      <div className="greeting">
        {theme.theme}
        <div className="fsize60 greeting-element">Greetings</div>
        <div className="fsize35 greeting-element">choose an app to show</div>
      </div>

      <GreetingNav />
    </div>
  );
}
