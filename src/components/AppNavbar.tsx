import { motion } from "framer-motion";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfo } from "../atoms";
import ShowCalendar from "./mypages/ShowCalendar/ShowCalendar";
import ShowProject from "./mypages/ShowProject/ShowProject";
import ShowToDo from "./mypages/ShowTodo/ShowToDo";

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
      color: ${(props) => props.theme.colors.blackColor};
      background-color: ${(props) => props.theme.colors.lightBeigeColor};
    }
  }
`;

const Line = styled(motion.div)`
  width: 30%;
  height: 2px;
  background-color: ${(props) => props.theme.colors.blackColor};
  position: absolute;
  bottom: 3px;
  left: 0;
  right: 0;
  margin: auto;
  /* 이부분 기억하기!! */
  /* left: 0;
  right: 0;
  margin: auto; */
  /* transform: scale(5); // transform이 안먹는다 */
`;

const AppNavbar = () => {
  const match = useMatch(`/mypage/*`)?.params["*"];
  const userI = useRecoilValue(userInfo);

  return (
    <>
      <NavBar>
        <li>
          <Link to={`/mypage/calendar`}>
            <button>calendar</button>
          </Link>
          {match === "calendar" && <Line layoutId="line" />}
        </li>
        <li>
          <Link to={`/mypage/todo`}>
            <button>todo</button>
          </Link>
          {match === "todo" && <Line layoutId="line" />}
        </li>
        <li>
          <Link to={`/mypage/project`}>
            <button>project</button>
          </Link>
          {match === "project" && <Line layoutId="line" />}
        </li>
      </NavBar>
      <Routes>
        <Route path="calendar" element={<ShowCalendar uid={userI.uid} />} />
        <Route path="todo" element={<ShowToDo uid={userI.uid} />} />
        <Route path="project" element={<ShowProject uid={userI.uid} />} />
      </Routes>
    </>
  );
};

export default AppNavbar;
