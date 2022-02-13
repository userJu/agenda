import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { fStoreProject, userInfo, userName, userProject } from "../../../atoms";
import ShowProjectMaker from "./ShowProjectMaker";
import { doc, getDoc } from "firebase/firestore";
import { fStore } from "../../../service/fireBase";
import { useNavigate } from "react-router-dom";

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
    li {
      margin-top: 0.5rem;
      font-size: 12px;
      cursor: pointer;
    }
  }
`;
interface INewform {
  name: string;
  desc: string;
}

const ShowProject = () => {
  const [fStorePj, setfStorePj] = useRecoilState(fStoreProject);
  const [userPj, setUserPj] = useRecoilState(userProject);
  const user = useRecoilValue(userName);
  const [maker, setMaker] = useState(false);
  const userId = useRecoilValue(userInfo);
  const navigate = useNavigate();

  const onClick = () => {
    setMaker((prev) => !prev);
  };
  console.log(fStorePj);

  // firestore에서 project이름 가져오기
  const getFB = async () => {
    const docSnap = await getDoc(doc(fStore, userId, "projects"));

    if (docSnap.exists()) {
      setfStorePj(() => [...docSnap.data().userPj]);
    } else {
      console.log("No such document!");
    }
  };

  // 프로젝트명을 누르면 프로젝트 상세 페이지로 이동하기
  const goToProject = (pjName: string) => {
    navigate(`/${user}/${pjName}`, { state: { pjName } });
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
                  goToProject(project.pjName);
                }}
                key={project.pjId}
              >
                {project.pjName}
              </li>
            ))}
          </ul>
        </ProjectBox>
      </ProjectBoxes>
    </Container>
  );
};
export default ShowProject;
