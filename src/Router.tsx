import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MyPage from "./components/mypages/MyPage";
import Project from "./components/MyProjects/Project";

const AppRouter = () => {
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
