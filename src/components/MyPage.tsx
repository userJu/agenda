import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const NavBar = styled.ul`
  display: flex;
  flex-direction: row;
  border: 1px solid pink;
  li {
    border: 1px solid black;
    flex: 30%;
    margin: auto;
    button {
      width: 100%;
    }
  }
`;

const MyPage = () => {
  return (
    <Container>
      <Header>
        <span>Agenda</span>
      </Header>
      <Sidebar />
      <MyHome>
        <MySchedule>
          <span>내 일정</span>
        </MySchedule>
        <NavBar>
          <li>
            <button>달력</button>
          </li>
          <li>
            <button>내 회의</button>
          </li>
          <li>
            <button>프로젝트</button>
          </li>
        </NavBar>
      </MyHome>
    </Container>
  );
};

export default MyPage;
