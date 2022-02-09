import React from "react";
import styled from "styled-components";
// 기본값. 언제든 변경할 수 있게 만들 예정

const Container = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.blackColor};
`;
const AddPJ = styled.h3`
  color: white;
  margin: 1rem 0;
`;
const ProjectBoxes = styled.div`
  width: 70%;
  height: auto;
  padding: 0.5rem 1rem 1rem 1rem;
  background-color: ${(props) => props.theme.colors.grayColor};
`;
const ProjectBox = styled.div``;

const ShowProject = () => {
  return (
    <Container>
      <AddPJ>+ New project</AddPJ>
      <ProjectBoxes>
        <ProjectBox>
          <h3>UserName</h3>
          <ul>
            <li> * My project</li>
          </ul>
        </ProjectBox>
      </ProjectBoxes>
    </Container>
  );
};
export default ShowProject;
