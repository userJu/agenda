import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IUserInfo, userInfo } from "../atoms";
import { auth } from "../service/fireBase";

const Header = styled.div`
  height: 2.5rem;
  position: relative;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

const Button = styled.div`
  position: absolute;
  right: 1rem;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.colors.buttonColor};
  border-radius: 50%;
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.whiteColor};
  top: 0.5rem;
  cursor: pointer;
`;

const UserNavbar = styled(motion.ul)`
  height: auto;
  width: 15vh;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};
  box-shadow: ${(props) => props.theme.flatShadow};
  transform-origin: top;
  li {
    margin: 1.5rem 0.3rem;
    cursor: pointer;
  }
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, transition: { type: "tween", duration: 0.5 } },
};

const AppHeader = () => {
  // signout이 아니라 user을 보여주고 github처럼 유저 내용 ~~~왈라왈라하고
  // signout 맨 밑에 쓰기
  const userI = useRecoilValue(userInfo);
  // signout을 하면 navigate를 통해 login화면으로 가는게 낫지 않을까?
  // 현재는 userInfo 안의 것들을 없애는 작업이었음
  // 그냥 navigate를 활용하면 logout되는지를 모름 - 랜더링 되는 것이 아니라서
  const navigate = useNavigate();
  const [navOpen, SetNavOpen] = useState(false);

  const onClick = () => {
    SetNavOpen((prev) => !prev);
  };

  const onSignout = () => {
    auth.signOut();
    console.log(userI.uid);
    navigate("/");
    SetNavOpen((prev) => !prev);
  };

  const onMyPage = () => {
    navigate("/mypage/calendar");
    SetNavOpen((prev) => !prev);
  };

  return (
    <Header>
      <Button onClick={onClick}>{userI.displayName}</Button>
      {navOpen && (
        <UserNavbar variants={myVars} initial="start" animate="end">
          <li>Signed in as {userI.displayName}</li>
          <li>Set status</li>
          <li onClick={onMyPage}>Mypage</li>
          <li>Settings</li>
          <li onClick={onSignout}>Sign out</li>
        </UserNavbar>
      )}
    </Header>
  );
};
export default AppHeader;
