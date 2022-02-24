import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  IBasicPj,
  userInfo,
  userProject,
  IUserProject,
  basicPj,
} from "../../../atoms";
import { addDoc, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { database, fStore } from "../../../service/fireBase";
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

const ShowProjectMaker = () => {
  const [userPj, setUserPj] = useRecoilState<IUserProject[]>(userProject);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const userI = useRecoilValue(userInfo);

  const Submit = ({ name, desc }: any) => {
    setUserPj(() => [
      {
        // participant: { userId: userI.uid },
        participant: [
          { userId: userI.uid, userDisplayName: userI.displayName },
        ],
        pjName: name,
        pjDesc: desc,
        pjId: Date.now(),
      },
    ]);
    console.log(name);
    console.log(desc);

    setValue("name", "");
    setValue("desc", "");
    setFocus("name");
  };
  // upload firestore
  // const uploadFB = async () => {
  //   await setDoc(doc(fStore, uid, "projects"), {
  //     userPj,
  //   });
  // };
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
