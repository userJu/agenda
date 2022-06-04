import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "./atoms";
import Login from "./routes/LoginPages/Login";
import MainPages from "./routes/Mainpages/MainPage";
import MyPage from "./routes/Mainpages/MyPage";
import Project from "./routes/ProjectPages/Project";

const AppRouter = ({ authService }: any) => {
  const userI = useRecoilValue(userInfo);
  console.log(userI);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login authService={authService} />} />
        <Route path="/mypage/*" element={<MainPages userI={userI} />} />
        <Route path="/:userId/*" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
