import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppHeader from "../AppHeader";
import { database, fStore } from "../../service/fireBase";
import { useForm } from "react-hook-form";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userInfo,
  userName,
  userProject,
  IUserProject,
  chatInfo,
  IChatInfo,
} from "../../atoms";
import { useLocation, useMatch } from "react-router-dom";
import { isFunctionTypeNode } from "typescript";
import { dateFnsLocalizer } from "react-big-calendar";

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
  const { register, handleSubmit, setValue } = useForm();

  const user = useRecoilValue(userName);
  console.log(user);
  const uid = useRecoilValue(userInfo);
  const [chat, setChat] = useRecoilState(chatInfo);
  const [fChat, setFChat] = useState<IChatInfo[]>([]);
  const state: any = useLocation().state;

  const name = state.pjName;
  const key = state.pjKey;
  const onSubmit = ({ chat }: any) => {
    console.log(chat);
    setChat(() => [
      ...fChat,
      { chat: chat, userId: uid, timeStamp: Date.now() },
    ]);
    setValue("chat", "");
  };
  console.log(uid);
  // FireStore에 채팅 내용 올리기
  const uploadFB = async () => {
    const Ref = doc(fStore, "projects", key + name);

    // Set the "capital" field of the city 'DC'
    await updateDoc(Ref, {
      chatting: chat,
    });
  };

  // FireStore로부터 채팅 내용 받아오기
  const getFB = async () => {
    const docRef = doc(fStore, "projects", key + name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().chatting !== undefined) {
        setFChat(() => [...docSnap.data().chatting]);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (chat.length > 0) {
      uploadFB();
    }
    getFB();
  }, [chat]);

  return (
    <Container>
      <AppHeader />
      <h3>브런치 이름</h3>
      <div>
        <MainRoot>
          {fChat.map((chat) => (
            <MainChat key={chat.timeStamp}>{chat.chat}</MainChat>
          ))}
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
