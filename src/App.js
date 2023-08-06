import React from "react";
import "./styles/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
