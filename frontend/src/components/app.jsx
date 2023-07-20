import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Menu from "./menu";
import FirstPage from "./firstPage";
import CreateUser from "./createUser";
import Login from "./login";
import DailyTyple from "./jsx_dailyTyple/dailyTyple";
import CampaignOverview from "./jsx_campaign/campaignOverview";
import Learn from "./jsx_learn/learn";
import TypleBattle from "./jsx_typleBattle/typleBattle";
import Profile from "./jsx_profile/profile";
import Shop from "./jsx_shop/shop";
import Leaderboards from "./jsx_leaderboards/leaderboards";
import Typle from "./jsx_typle/typle";
import LevelsBoards from "./jsx_leaderboards/levelsBoards";
import TypleBoards from "./jsx_leaderboards/typleBoards";

//defining routes for all paths ex localhost:5000/menu will take to to <Menu/>
function App() {
    return <Router>
        <Routes>
            <Route path="/" exact element={<FirstPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/createUser" element={<CreateUser/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/dailyTyple" element={<DailyTyple/>} />
            <Route path="/campaign" element={<CampaignOverview/>} />
            <Route path="/learn" element={<Learn/>} />
            <Route path="/typleBattle" element={<TypleBattle/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/leaderboards" element={<Leaderboards/>} />
            <Route path="/typle" element={<Typle/>}/>
            <Route path="/leaderboards/levels" element={<LevelsBoards/>} />
            <Route path="/leaderboards/typle" element={<TypleBoards/>} />
        </Routes>
    </Router>
}

export default App;