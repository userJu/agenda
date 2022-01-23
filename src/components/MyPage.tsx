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
          </TodaySchedule>
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
