import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userInfo } from "../atoms";
import { auth } from "../service/fireBase";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5%;
  position: relative;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};

  button {
    position: absolute;
    right: 1rem;
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.colors.buttonColor};
    border-radius: 0.5rem;
    padding: 2px 7px;
    color: ${(props) => props.theme.colors.whiteColor};
  }
`;

const AppHeader = () => {
  // signout이 아니라 user을 보여주고 github처럼 유저 내용 ~~~왈라왈라하고
  // signout 맨 밑에 쓰기
  const setUserId = useSetRecoilState(userInfo);
  const onClick = () => {
    console.log("로그아웃");
    auth.signOut();
    setUserId("");
  };

  return (
    <Header>
      <span>Agenda</span>
      <button onClick={onClick}>Sign out</button>
    </Header>
  );
};
export default AppHeader;
