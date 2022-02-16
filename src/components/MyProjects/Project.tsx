import React, { useEffect, useState, useRef } from "react";
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
import { init } from "@emailjs/browser";
import emailjs from "@emailjs/browser";
init("user_iTR4gBEPYcVED1QNGuD6c");

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.buttonColor};
`;

const MainRoot = styled.ul`
  width: 60vw;
  height: 80vh;
  overflow-y: scroll;
  /* 스크롤바 없애는 ie edge 코드 */
  -ms-overflow-style: none;
  /* 스크롤바 없애는 firefox 코드 */
  scrollbar-width: none;
  /* 스크롤바 없애는 chrome 코드 */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const MainChat = styled.li`
  width: 90%;
  height: auto;
  min-height: 50px;
  background-color: white;
  border: 2px solid black;
  margin: 2rem;
  margin-left: 0.5rem;
  padding: 10px;
  display: flex;
  align-items: center;
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
  const state: any = useLocation().state;
  const name = state.pjName;
  const key = state.pjKey;
  const { register, handleSubmit, setValue } = useForm();
  const [userPj, setUserPj] = useRecoilState<IUserProject[]>(userProject);
  const user = useRecoilValue(userName);
  const uid = useRecoilValue(userInfo);
  const [chat, setChat] = useRecoilState(chatInfo);
  const [fChat, setFChat] = useState<IChatInfo[]>([]);
  const onSubmit = ({ chat }: any) => {
    setChat(() => [
      ...fChat,
      { chat: chat, userId: uid, timeStamp: Date.now() },
    ]);
    setValue("chat", "");
  };

  // FireStore에 채팅 내용 올리기
  const uploadFB = async () => {
    const Ref = doc(fStore, "projects", key + name);
    await updateDoc(Ref, {
      chatting: chat,
    });
    setChat([]);
  };

  // FireStore로부터 채팅 내용 받아오기
  const getFB = async () => {
    const docRef = doc(fStore, "projects", key + name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().chatting) {
        setFChat(() => [...docSnap.data().chatting]);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  // emailjs
  const SERVICE_ID = "service_5h73mmn";
  const TEMPLATE_ID = "template_e4hq3d1";
  // 초대하기
  const onInvite = ({ invite }: any) => {
    console.log(invite);

    // .send는 객체 형태로 넣어주면 되고
    // .sendForm은 templateParams로 Form element의 ref를 넣어준다
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        to_name: invite,
        from_name: user,
        message: `${name}에 입장해 프로젝트를 진행해보세요 ${window.location.href}`,
      })
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    getFB();
    if (chat.length > 0) {
      uploadFB();
    }
  }, [chat]);

  return (
    <Container>
      <AppHeader />
      <h3>브런치 이름</h3>
      <form action="" onSubmit={handleSubmit(onInvite)}>
        <input {...register("invite")} type="text" placeholder="email" />
        <button>초대하기</button>
      </form>
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
