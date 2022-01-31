import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "./atoms";
import Login from "./components/Login";
import MyPage from "./components/mypages/MyPage";

const AppRouter = () => {
  const userId = useRecoilValue(userInfo);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mypage/*" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
