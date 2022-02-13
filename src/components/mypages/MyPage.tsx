import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
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
import ShowCalendar from "./ShowCalendar/ShowCalendar";
import { auth } from "../../service/fireBase";
import { useState } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import ShowToDo from "./ShowTodo/ShowToDo";
import ShowProject from "./ShowProject/ShowProject";
import AppHeader from "../AppHeader";

//모바일부터 코딩

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

const MyHome = styled.div`
  width: 100%;
  height: 95%;
  border: 1px solid black;
`;

const UsefulThings = styled.div`
  width: 100%;
  height: 40%;
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

  return (
    <>
      {userId ? (
        <Container>
          <AppHeader />
          <Sidebar />
          <MyHome>
            <UsefulThings></UsefulThings>
            <NavBar>
              <li>
                <Link to={`/mypage/calendar`}>
                  <button>calendar</button>
                </Link>
                {match === "calendar" ? (
                  <Line layoutId="line" animate={{ translateX: "-50%" }} />
                ) : null}
              </li>
              <li>
                <Link to={`/mypage/todo`}>
                  <button>todo</button>
                </Link>
                {match === "todo" ? (
                  <Line layoutId="line" animate={{ translateX: "-50%" }} />
                ) : null}
              </li>
              <li>
                <Link to={`/mypage/project`}>
                  <button>project</button>
                </Link>
                {match === "project" ? (
                  <Line layoutId="line" animate={{ translateX: "-50" }} />
                ) : null}
              </li>
            </NavBar>
            <Routes>
              <Route path="calendar" element={<ShowCalendar />} />
              <Route path="todo" element={<ShowToDo userId={userId} />} />
              <Route path="project" element={<ShowProject userId={userId} />} />
            </Routes>
          </MyHome>
        </Container>
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
};

export default MyPage;
