import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUserInfo } from "../../atoms";
import AppNavbar from "../../components/Layout/AppNavbar";
import MyPage from "./MyPage";

interface IMainPage {
  userI: IUserInfo;
}

const MainPage = ({ userI }: IMainPage) => {
  const navigate = useNavigate();
  console.log(userI);
  useEffect(() => {
    if (userI.uid === "") {
      console.log(userI);

      navigate("/");
    }
  }, [userI]);

  return (
    <>
      <MyPage />
      <AppNavbar />
    </>
  );
};

export default MainPage;
