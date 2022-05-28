import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./routes/LoginPages/Login";
import MyPage from "./routes/Mainpages/MyPage";
import Project from "./routes/ProjectPages/Project";

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
