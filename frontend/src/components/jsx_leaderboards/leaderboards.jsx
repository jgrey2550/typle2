import React from "react";
import Navbar from "../navbar";
import pic from "../pictures/0.png"
import { useNavigate } from "react-router-dom";

function Leaderboards() {
    const navigate = useNavigate();

    const changeScreen = (screen) => {
        navigate(`/leaderboards/${screen}`);
      };

    return <div>
        <Navbar/>
        <h1>Leaderboards</h1>
        <p>Welcome to Leaderboards</p>
        <img src={pic} onClick={() => changeScreen("levels")}/>
        <img src={pic} onClick={() => changeScreen("typle")}/>
    </div>
}

export default Leaderboards;