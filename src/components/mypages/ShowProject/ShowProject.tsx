import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { userName } from "../../../atoms";
import ShowProjectMaker from "./ShowProjectMaker";
// 기본값. 언제든 변경할 수 있게 만들 예정

const Container = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.blackColor};
  position: relative;
`;
const AddPJ = styled.h3`
  color: white;
  margin: 1rem 0;
  cursor: pointer;
`;

const ProjectBoxes = styled.div`
  width: 70%;
  height: auto;
  padding: 0.5rem 1rem 1rem 1rem;
  background-color: ${(props) => props.theme.colors.grayColor};
`;
const ProjectBox = styled.div`
  h3 {
    font-size: 15px;
  }
  ul {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
  }
`;
interface INewform {
  name: string;
  desc: string;
}

const ShowProject = () => {
  const user = useRecoilValue(userName);
  const [maker, setMaker] = useState(false);

  const onClick = () => {
    setMaker((prev) => !prev);
  };

  return (
    <Container>
      <AddPJ onClick={onClick}>+ New project</AddPJ>
      {maker ? <ShowProjectMaker /> : null}
      <ProjectBoxes>
        <ProjectBox>
          <h3>{user}</h3>
          <ul>
            <li>My project</li>
          </ul>
        </ProjectBox>
      </ProjectBoxes>
    </Container>
  );
};
export default ShowProject;
