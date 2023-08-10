import React from "react";
import "./styles/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MyPage from "pages/MyPage/MyPage";
import AskPage from "pages/MyPage/AskPage";
import AskWrite from "pages/MyPage/AskWrite";
import News from "pages/News/News";
import Store from "./pages/Store/Store";
import AllNews from "pages/News/AllNews";
import StockHold from "pages/MyPage/StockHold";
import StockInterest from "pages/MyPage/StockInterest";
import BuyList from "pages/MyPage/BuyList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/askpage" element={<AskPage />} />
        <Route path="/askwrite" element={<AskWrite />} />
        <Route path="/news" element={<News />} />
        <Route path="/Store" element={<Store/>} />
        <Route path="/allNews" element={<AllNews />} />
        <Route path="/stockHold" element={<StockHold />} />
        <Route path="/stockInterest" element={<StockInterest />} />
        <Route path="/buyList" element={<BuyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
