import React from "react";
import ShopNav from "./ShopNav";

function ShopHome() {
  return (
    <div>
      <ShopNav />
      <div className="black-container-home">
        <div className="greeting fsize35">
          This is a template of the eshop app
        </div>
      </div>
    </div>
  );
}

export default ShopHome;
