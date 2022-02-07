import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import {
  Link,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../../atoms";
import ShowCalendar from "./ShowCalendar";
import { auth } from "../../service/fireBase";
import { useState } from "react";
import Myprogress from "./Myprogress";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";

//모바일부터 코딩

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

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
const MyHome = styled.div`
  width: 100%;
  height: 95%;
  border: 1px solid black;
`;

const NavBar = styled(motion.ul)`
  display: flex;
  flex-direction: row;
  height: 2rem;
  li {
    flex: 30%;
    position: relative;
    button {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      color: ${(props) => props.theme.colors.whiteColor};
      background-color: ${(props) => props.theme.colors.grayColor};
    }
  }
`;

const Line = styled(motion.div)`
  width: 30%;
  height: 2px;
  background-color: ${(props) => props.theme.colors.whiteColor};
  position: absolute;
  top: 82%;
  left: 50%;
  /* transform: scale(5); // transform이 안먹는다 */
`;

const MyPage = () => {
  const [userId, setUserId] = useRecoilState(userInfo);
  const navigate = useNavigate();
  const match = useMatch(`/mypage/*`)?.params["*"];
  useEffect(() => {
    if (userId === "") {
      navigate("/");
    }
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        console.log("로그인을 해주세요");
      }
    });
  }, []);
  console.log(userId);

  const onLogout = () => {
    console.log("로그아웃");
    auth.signOut();
    setUserId("");
  };

  return (
    <Container>
      <Header>
        <span>Agenda</span>
        <button onClick={onLogout}>Logout</button>
      </Header>
      <Sidebar />
      <MyHome>
        <Myprogress userId={userId} />
        <NavBar>
          <li>
            <Link to={`/mypage/calendar`}>
              <button>달력</button>
            </Link>
            {match === "calendar" ? (
              <Line layoutId="line" animate={{ translateX: "-50%" }} />
            ) : null}
          </li>
          <li>
            <Link to={`/mypage/todo`}>
              <button>TODO</button>
            </Link>
            {match === "todo" ? (
              <Line layoutId="line" animate={{ translateX: "-50%" }} />
            ) : null}
          </li>
          <li>
            <Link to={`/mypage/project`}>
              <button>프로젝트</button>
            </Link>
            {match === "project" ? (
              <Line layoutId="line" animate={{ translateX: "-50" }} />
            ) : null}
          </li>
        </NavBar>
        <Routes>
          <Route path="calendar" element={<ShowCalendar />} />
        </Routes>
      </MyHome>
    </Container>
  );
};

export default MyPage;
