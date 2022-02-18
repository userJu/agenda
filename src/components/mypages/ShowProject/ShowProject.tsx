import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { basicPj, userName, userProject } from "../../../atoms";
import ShowProjectMaker from "./ShowProjectMaker";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { fStore } from "../../../service/fireBase";
import { useNavigate } from "react-router-dom";

// 기본값. 언제든 변경할 수 있게 만들 예정

const Container = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.whiteColor};
  position: relative;
`;
const AddPJ = styled.h3`
  color: ${(props) => props.theme.colors.blackColor};

  margin: 1rem 0;
  cursor: pointer;
`;

const ProjectBoxes = styled.div`
  width: 70%;
  height: auto;
  padding: 0.5rem 1rem 1rem 1rem;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};
  color: ${(props) => props.theme.colors.blackColor};
`;
const ProjectBox = styled.div`
  h3 {
    font-size: 15px;
  }
  ul {
    margin-top: 0.3rem;
    margin-left: 0.3rem;
    li {
      margin-top: 0.5rem;
      font-size: 12px;
      cursor: pointer;
    }
  }
`;
interface IShowProject {
  userId: string;
}

const ShowProject = ({ userId }: IShowProject) => {
  const [fStorePj, setfStorePj] = useRecoilState(basicPj);
  const [userPj, setUserPj] = useRecoilState(userProject);
  const user = useRecoilValue(userName);
  const [maker, setMaker] = useState(false);
  const navigate = useNavigate();

  const onClick = () => {
    setMaker((prev) => !prev);
  };

  // firestore에서 project이름 가져오기
  const getFB = async () => {
    const q = query(
      collection(fStore, "projects"),
      where("participant.userId", "==", `${userId}`)
    );
    onSnapshot(q, (querySnapshot) => {
      const myPjArr: any = [];
      querySnapshot.forEach((doc) => {
        myPjArr.push({ name: doc.data().pjName, key: doc.data().pjId });
      });
      setfStorePj(myPjArr);
    });
  };

  // 프로젝트명을 누르면 프로젝트 상세 페이지로 이동하기
  const goToProject = (pjName: string, pjKey: number) => {
    navigate(`/${user}/${pjName}/${pjKey}`, { state: { pjName, pjKey } });
  };

  useEffect(() => {
    getFB();
  }, [userPj]);

  return (
    <Container>
      <AddPJ onClick={onClick}>+ New project</AddPJ>
      {maker ? <ShowProjectMaker /> : null}
      <ProjectBoxes>
        <ProjectBox>
          <h3>{user}</h3>
          <ul>
            {fStorePj.map((project) => (
              <li
                onClick={() => {
                  goToProject(project.name, project.key);
                }}
                key={project.key}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </ProjectBox>
      </ProjectBoxes>
    </Container>
  );
};
export default ShowProject;
