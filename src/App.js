import React from "react";
import "./styles/global.scss";
import { Route, Routes, useNavigate } from "react-router-dom"; // useNavigate 추가
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MyPage from "pages/MyPage/MyPage";
import AskPage from "pages/MyPage/AskPage";
import AskWrite from "pages/MyPage/AskWrite";
import News from "pages/News/News";
import AllNews from "pages/News/AllNews";
import StockHold from "pages/MyPage/StockHold";
import StockInterest from "pages/MyPage/StockInterest";
import BuyList from "pages/MyPage/BuyList";
import Main from "pages/Main/Main";
import UserMain from "pages/Main/UserMain";

function App() {
  const navigate = useNavigate(); // useNavigate 초기화

  return (
    <Routes>
      <Route
        path="/"
        element={
          sessionStorage.getItem("token") === null ? <Main /> : <UserMain />
        }
      />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/askpage" element={<AskPage />} />
      <Route path="/askwrite" element={<AskWrite />} />
      <Route path="/news" element={<News />} />
      <Route path="/allNews" element={<AllNews />} />
      <Route path="/stockHold" element={<StockHold />} />
      <Route path="/stockInterest" element={<StockInterest />} />
      <Route path="/buyList" element={<BuyList />} />
      <Route path="/main" element={<UserMain />} />
    </Routes>
  );
}

export default App;
