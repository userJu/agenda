import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userInfo } from "../atoms";
import { auth } from "../service/fireBase";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  height: 5%;
  position: relative;
  background-color: ${(props) => props.theme.colors.grayColor};

  button {
    position: absolute;
    right: 1rem;
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.colors.blueColor};
    border-radius: 0.5rem;
    padding: 2px 7px;
    color: ${(props) => props.theme.colors.whiteColor};
  }
`;

const AppHeader = () => {
  const setUserId = useSetRecoilState(userInfo);

  const onLogout = () => {
    console.log("로그아웃");
    auth.signOut();
    setUserId("");
  };

  return (
    <Header>
      <span>Agenda</span>
      <button onClick={onLogout}>Logout</button>
    </Header>
  );
};
export default AppHeader;
