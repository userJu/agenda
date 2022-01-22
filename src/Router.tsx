import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import Login from "./components/Login";
import MyPage from "./components/MyPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
