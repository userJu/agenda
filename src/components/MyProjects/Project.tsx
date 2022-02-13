import React from "react";
import styled from "styled-components";
import AppHeader from "../AppHeader";
import { database, fStore } from "../../service/fireBase";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  fStoreProject,
  userInfo,
  userName,
  userProject,
  IUserProject,
} from "../../atoms";
import { useLocation, useMatch } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: grey;
`;

const MainRoot = styled.ul`
  width: 60vw;
  height: 80vh;
`;
const MainChat = styled.li`
  width: 90%;
  height: auto;
  min-height: 50px;
  background-color: white;
  border: 2px solid black;
  margin: 3rem 0;
`;

const Form = styled.form`
  width: 100%;
  height: 13.5vh;
  background-color: white;
  input {
    width: 90%;
    height: 100%;
    border: none;
    outline: none;
  }
  button {
    border: none;
    outline: none;
    background-color: yellow;
  }
`;

const Project = () => {
  const [userPj, setUserPj] = useRecoilState<IUserProject[]>(userProject);
  const user = useRecoilValue(userName);
  console.log(user);
  const uid = useRecoilValue(userInfo);
  const { register, handleSubmit, setValue } = useForm();
  const match = useMatch(`/${user}/*`)?.params["*"];
  const onSubmit = ({ chat }: any) => {
    console.log(chat);
    setValue("chat", "");
  };
  console.log(match);

  // const uploadFB = async () => {
  //   await setDoc(doc(fStore, uid, "projects", "회의", match!), {});
  // };
  return (
    <Container>
      <AppHeader />
      <h3>브런치 이름</h3>
      <div>
        <MainRoot>
          <MainChat>1</MainChat>
          <MainChat>2</MainChat>
          <MainChat>3</MainChat>
          <MainChat>4</MainChat>
          <MainChat>5</MainChat>
          <MainChat>6</MainChat>
        </MainRoot>
      </div>
      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("chat")} type="text" />
        <button>전송</button>
      </Form>
    </Container>
  );
};

export default Project;
