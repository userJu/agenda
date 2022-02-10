import React from "react";
import styled from "styled-components";
import AppHeader from "../AppHeader";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: grey;
`;

const Project = () => {
  return (
    <Container>
      <AppHeader />
    </Container>
  );
};

export default Project;
