import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { basicPj, userInfo, userProject } from "../../../atoms";
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { fStore } from "../../../service/fireBase";
import { useNavigate } from "react-router-dom";
import InputBoard from "../../Layout/UI/InputBoard";
import { useForm } from "react-hook-form";

// 기본값. 언제든 변경할 수 있게 만들 예정

const Container = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid pink;
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

//
const ProjectMaker = styled.div`
  width: 85%;
  height: 55%;
  background-color: #ffffffce;
  position: absolute;
  top: 2.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Location = styled.h1`
  padding-bottom: 1rem;
`;

const Form = styled.form`
  margin-left: 0.3rem;
  margin-bottom: 1rem;
  height: 10%;
  input {
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 2px solid black;
    height: 100%;
  }
  button {
    position: absolute;
    top: 80%;
    left: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;

interface IProjectMaker {
  name?: any;
  desc?: any;
  title?: string | number | any;
}

const ShowProject = () => {
  const [fStorePj, setfStorePj] = useRecoilState(basicPj);
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();
  const [userPj, setUserPj] = useRecoilState(userProject);
  //
  const { register, handleSubmit, setValue, setFocus } =
    useForm<IProjectMaker>();
  const userI = useRecoilValue(userInfo);

  const onClick = () => {
    setOpenForm((prev) => !prev);
  };

  const closeFormBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenForm((prev) => !prev);
  };

  // firestore에서 project이름 가져오기
  const getFB = async () => {
    const q = query(
      collection(fStore, "projects"),
      where("participant", "array-contains", {
        userDisplayName: userI.displayName,
        userId: userI.uid,
      })
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
    navigate(`/${userI.displayName}/${pjName}/${pjKey}`, {
      state: { pjName, pjKey },
    });
  };

  //
  const submitForm = ({ title, desc }: IProjectMaker) => {
    setUserPj(() => [
      {
        participant: [
          { userId: userI.uid, userDisplayName: userI.displayName },
        ],
        pjName: title,
        pjDesc: desc,
        pjId: Date.now(),
      },
    ]);

    setValue("title", "");
    setValue("desc", "");
    setFocus("title");
  };

  const uploadFB = () => {
    userPj.map(async (project) => {
      await setDoc(doc(fStore, "projects", project.pjId + project.pjName), {
        ...project,
      });
    });
  };

  useEffect(() => {
    uploadFB();
  }, [userPj]);

  useEffect(() => {
    getFB();
  }, []);

  return (
    <Container>
      <AddPJ onClick={onClick}>+ New project</AddPJ>
      {openForm ? (
        // <ProjectMaker>
        //   <Location>위치</Location>
        //   <Form action="name" onSubmit={handleSubmit(Submit)}>
        //     <input
        //       {...register("name", { required: true })}
        //       type="text"
        //       placeholder="프로젝트명"
        //       style={{ width: "40%" }}
        //     />
        //     <input
        //       {...register("desc", { required: true })}
        //       type="text"
        //       placeholder="설명"
        //       style={{ width: "70%" }}
        //     />
        //     <button>button</button>
        //   </Form>
        // </ProjectMaker>
        <InputBoard
          closeFormBtn={closeFormBtn}
          submitForm={submitForm}
          formName="project"
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <input
              {...(register("title"), { required: true })}
              type="text"
              placeholder="프로젝트명을 적어주세요"
            />
            <input
              {...register("desc")}
              type="text"
              placeholder="프로젝트 설명을 적어주세요"
            />
            <button>click</button>
          </form>
        </InputBoard>
      ) : null}
      <ProjectBoxes>
        <ProjectBox>
          <h3>{userI.displayName}</h3>
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
