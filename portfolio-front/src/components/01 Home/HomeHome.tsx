import React from "react";
import GreetingNav from "./GreetingNav";

export default function HomeHome() {
  return (
    <div className="black-container">
      <div className="greeting">
        <div className="fsize60 greeting-element">Greetings</div>
        <div className="fsize35 greeting-element">choose an app to show</div>
      </div>

      <GreetingNav />
    </div>
  );
}
