import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { IUserInfo } from "../../atoms";
import UserCalendar from "./Calendar/Calendar";
import ShowProject from "./Project/Project";
import ShowToDo from "./ToDo/ToDo";

const Container = styled.div`
  width: 100vw;
  height: 70vh;
`;

interface IAppNavbarRoutes {
  userI: IUserInfo;
  fireStore: any;
}

const AppNavbarRoutes = ({ userI, fireStore }: IAppNavbarRoutes) => {
  return (
    <Container>
      <Routes>
        <Route
          path="calendar"
          element={<UserCalendar uid={userI.uid} fireStore={fireStore} />}
        />
        <Route
          path="todo"
          element={<ShowToDo uid={userI.uid} fireStore={fireStore} />}
        />
        <Route path="project" element={<ShowProject />} />
      </Routes>
    </Container>
  );
};

export default AppNavbarRoutes;
