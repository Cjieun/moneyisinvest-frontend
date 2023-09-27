import React, { useState, useEffect } from "react";
import "./styles/global.scss";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MyPage from "pages/MyPage/MyPage";
import AskPage from "pages/MyPage/AskPage";
import AskWrite from "pages/MyPage/AskWrite";
import StockTransaction from "pages/MyPage/Transactions";
import News from "pages/News/News";
import Store from "./pages/Store/Store";
import AllNews from "pages/News/AllNews";
import StockHold from "pages/MyPage/StockHold";
import StockInterest from "pages/MyPage/StockInterest";
import BuyList from "pages/MyPage/BuyList";
import GuestMain from "pages/Main/GuestMain";
import UserMain from "pages/Main/UserMain";
import Textbook from "pages/Education/Textbook";
import TbDetail1 from "pages/Education/TbDetail1";
import TbDetail2 from "pages/Education/tbDetail2";
import TbDetail3 from "pages/Education/TbDetail3";
import AskDetail from "pages/MyPage/AskDetail";
import Company from "pages/Company/Company";
import Community from "pages/Community/Community";
import MessagePage from "components/MessagePage";
import Payment from "pages/Payment/Payment";
import MyWallet from "pages/MyPage/MyWallet/MyWallet";
import axios from "axios";
import { CommunityTwo } from "pages/Community/CommunityTwo";
import StoreBagPage from "pages/Store/StoreBag";

function App() {
  let apiClient;
  if (window.location.protocol === "http:") {
    apiClient = axios.create({
      baseURL: "http://localhost:3000", // 개발 환경일 경우
    });
  } else if (window.location.protocol === "https:") {
    apiClient = axios.create({
      baseURL: "https://moneyisinvest.kr", // 실제 서비스 환경일 경우
    });
  }

  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") !== null
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      urlParams.delete("code");
      // 현재의 브라우징 히스토리 엔트리를 새로운 URL로 대체
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}${urlParams}`
      );
      // 'code' 쿼리 파라미터가 있는 경우 서버에 API 요청
      apiClient
        .post(`/api/v1/social/kakao?code=${code}`)
        .then((res) => {
          console.log("kakaoLogin Success", res);
          setIsLoggedIn(true);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("refresh-token", res.data.refreshToken);
          sessionStorage.setItem("id", res.data.uid);
          sessionStorage.setItem("name", res.data.name);
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
          alert("로그인에 실패했습니다. 다시 시도해주세요");
          window.location.href = "/signIn";
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <UserMain /> : <GuestMain />} />
      <Route
        path="/signIn"
        element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/mypage"
        element={<MyPage setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/askpage" element={<AskPage />} />
      <Route path="/askwrite" element={<AskWrite />} />
      <Route path="/askpage/:supportId" element={<AskDetail />} />
      <Route path="/transactions" element={<StockTransaction />} />
      <Route path="/news/:stockId" element={<News />} />
      <Route path="/Store" element={<Store />} />
      <Route path="/allNews" element={<AllNews />} />
      <Route path="/stockHold" element={<StockHold />} />
      <Route path="/stockInterest" element={<StockInterest />} />
      <Route path="/buyList" element={<BuyList />} />
      <Route path="/main" element={<UserMain />} />
      <Route path="/textbook" element={<Textbook />} />
      <Route path="/TbDetail1" element={<TbDetail1 />} />
      <Route path="/TbDetail2" element={<TbDetail2 />} />
      <Route path="/TbDetail3" element={<TbDetail3 />} />
      <Route path="/company/:stockId" element={<Company />} />
      <Route path="/Community/:stockId" element={<Community />} />
      <Route path="/messagePage" element={<MessagePage />} />
      <Route path="/pay" element={<Payment />} />
      <Route path="/MessagePage" element={<MessagePage />} />
      <Route path="/myWallet" element={<MyWallet />} />
      <Route path="/pay" element={<Payment />} />
      <Route path="/CommunityTwo" element={<CommunityTwo />} />
      <Route path="/storeBag" element={<StoreBagPage />} />
    </Routes>
  );
}

export default App;
