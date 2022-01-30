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
import { userInfo } from "../atoms";
import ShowCalendar from "./ShowCalendar";
import { auth } from "../service/fireBase";
import { useState } from "react";

//모바일부터 코딩

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  height: 5%;
  position: relative;
  button {
    position: absolute;
    right: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;
const MyHome = styled.div`
  width: 100%;
  height: 95%;
  border: 1px solid black;
`;

const MySchedule = styled.div`
  width: 100%;
  height: 40%;
  border: 1px solid green;
  overflow-y: scroll;
`;

const Date = styled.h3`
  border: 1px solid green;
  padding: 0.4rem 0.5rem;
`;

const TodaySchedule = styled.ul`
  width: 100%;
  li {
    background-color: pink;
    border: 1px solid black;
    padding: 0.5rem 0.3rem;
    margin: 0.5rem 0.3rem;
  }
`;

const NavBar = styled.ul`
  display: flex;
  flex-direction: row;
  border: 1px solid pink;
  height: 1.7rem;
  li {
    border: 1px solid black;
    flex: 30%;

    button {
      width: 100%;
      height: 100%;
    }
  }
`;

const MyPage = () => {
  const [userId, setUserId] = useRecoilState(userInfo);
  const navigate = useNavigate();
  console.log(userId);

  useEffect(() => {
    if (userId === "") {
      navigate("/");
    }
  }, [userId]);

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
        <MySchedule>
          <Date>1/16</Date>
          <TodaySchedule>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
          </TodaySchedule>
        </MySchedule>
        <NavBar>
          <li>
            <Link to={`/mypage/calendar`}>
              <button name="calendar">달력</button>
            </Link>
          </li>
          <li>
            <Link to={`/mypage/todo`}>
              <button>TODO</button>
            </Link>
          </li>
          <li>
            <Link to={`/mypage/project`}>
              <button>프로젝트</button>
            </Link>
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
