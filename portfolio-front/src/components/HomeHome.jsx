import React from "react";
import GreetingNav from "./GreetingNav";

export default function HomeHome() {
  return (
    <div className="black-container-home">
      <div className="greeting">
        <div className="fsize60 greeting-element">Greetings</div>
        <div className="fsize35 greeting-element">choose an app to show</div>
        <div className="mt-4">
          <GreetingNav />
        </div>
      </div>
    </div>
  );
}
