import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 70vw;
  height: 100vh;
  border: 1px solid black;
  background-color: #000000b7;
  color: white;
`;

const Profile = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;
const Category = styled.ul`
  width: 100%;
  height: 65%;
  border: 1px solid pink;
  padding: 1rem 0;
  li {
    padding: 1rem;
    border: 1px solid black;
    background-color: grey;
    margin-bottom: 0.3rem;
  }
`;

const Sidebar = () => {
  return (
    <>
      {false ? (
        <Container>
          <Profile>
            <ProfileImg src="img/sick.png" alt="" />
            <span>userName</span>
          </Profile>
          <Category>
            <li>프로젝트</li>
            <li>일정 확인</li>
            <li>친구 초대하기</li>
            <li>네번째로는 뭘 넣지?</li>
          </Category>
        </Container>
      ) : null}
    </>
  );
};

export default Sidebar;
