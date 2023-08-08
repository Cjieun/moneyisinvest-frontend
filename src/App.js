import React from "react";
import "./styles/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MyPage from "pages/MyPage/MyPage";
import AskPage from "pages/MyPage/AskPage";
import AskWrite from "pages/MyPage/AskWrite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/askpage" element={<AskPage />} />
        <Route path="/askwrite" element={<AskWrite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
