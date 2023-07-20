import React, { useState } from "react";
import pic from "./pictures/1.png";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  //change screen to /whatever with useNavigate through react-router-dom
  const changeScreen = (screen) => {
    navigate(`/${screen}`);
  };

  return (
    <div>
    <Navbar/>
    <h1>Menu</h1>
      <div>
          <img src={pic} onClick={() => changeScreen("Campaign")} />
          <img src={pic} onClick={() => changeScreen("Learn")} />
          <img src={pic} onClick={() => changeScreen("Typle")} />
        </div>
        <div>
          <img src={pic} onClick={() => changeScreen("DailyTyple")} />
          <img src={pic} onClick={() => changeScreen("TypleBattle")} />
        </div>
    </div>
  );
}

export default Menu;