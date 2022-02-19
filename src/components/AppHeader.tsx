import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userInfo } from "../atoms";
import { auth } from "../service/fireBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
  const userI = useSetRecoilState(userInfo);
  // signout을 하면 navigate를 통해 login화면으로 가는게 낫지 않을까?
  // 현재는 userInfo 안의 것들을 없애는 작업이었음
  // 그냥 navigate를 활용하면 logout되는지를 모름 - 랜더링 되는 것이 아니라서
  const navigate = useNavigate();

  const onClick = () => {
    console.log("로그아웃");
    auth.signOut();
    navigate("/");
    // userI("");
    // userI({ uid: "", email: "", displayName: "", photoURL: "" });
  };

  return (
    <Header>
      <span>Agenda</span>
      <button onClick={onClick}>Sign out</button>
    </Header>
  );
};
export default AppHeader;
