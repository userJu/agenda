import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfo, userProject } from "../../../atoms";
import { doc, setDoc } from "firebase/firestore";
import { fStore } from "../../../service/fireBase";
import { useEffect } from "react";

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
  name: any;
  desc: any;
}

const ShowProjectMaker = () => {
  const [userPj, setUserPj] = useRecoilState(userProject);
  const { register, handleSubmit, setValue, setFocus } =
    useForm<IProjectMaker>();
  const userI = useRecoilValue(userInfo);

  const Submit = ({ name, desc }: IProjectMaker) => {
    setUserPj(() => [
      {
        participant: [
          { userId: userI.uid, userDisplayName: userI.displayName },
        ],
        pjName: name,
        pjDesc: desc,
        pjId: Date.now(),
      },
    ]);

    setValue("name", "");
    setValue("desc", "");
    setFocus("name");
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

  return (
    <ProjectMaker>
      <Location>위치</Location>
      <Form action="name" onSubmit={handleSubmit(Submit)}>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="프로젝트명"
          style={{ width: "40%" }}
        />
        <input
          {...register("desc", { required: true })}
          type="text"
          placeholder="설명"
          style={{ width: "70%" }}
        />
        <button>button</button>
      </Form>
    </ProjectMaker>
  );
};

export default ShowProjectMaker;
