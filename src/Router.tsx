import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "./atoms";
import Login from "./components/Login";
import MyPage from "./components/mypages/MyPage";
import Project from "./components/MyProjects/Project";

const AppRouter = () => {
  const userId = useRecoilValue(userInfo);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/:userId/*" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
