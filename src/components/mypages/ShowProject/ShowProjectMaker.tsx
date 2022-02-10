import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fStoreProject, userInfo, userName, userProject } from "../../../atoms";
import { doc, setDoc } from "firebase/firestore";
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

interface IShowProjectMaker {
  maker: boolean;
}
const ShowProjectMaker = ({ maker }: IShowProjectMaker) => {
  const [userPj, setUserPj] = useRecoilState(userProject);
  const prevPj = useRecoilValue(fStoreProject);
  const { register, handleSubmit, setValue, setFocus } = useForm();
  const uid = useRecoilValue(userInfo);

  const Submit = ({ name, desc }: any) => {
    setUserPj(() => [
      ...prevPj,
      {
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
  const uploadFB = async () => {
    await setDoc(doc(fStore, uid, "projects"), {
      userPj,
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
