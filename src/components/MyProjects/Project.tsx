import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AppHeader from "../AppHeader";
import { fStore } from "../../service/fireBase";
import { useForm } from "react-hook-form";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo, chatInfo, IChatInfo } from "../../atoms";
import { useLocation, useNavigate } from "react-router-dom";
import { init } from "@emailjs/browser";
import Project_member_invite from "./Project_member_invite";
import Project_chatbox from "./Project_chatbox";

init("user_iTR4gBEPYcVED1QNGuD6c");

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

const MainRoot = styled.ul`
  width: 100vw;
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
    background-color: ${(props) => props.theme.colors.buttonColor};
    color: ${(props) => props.theme.colors.whiteColor};
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    cursor: pointer;
  }
`;

const InvitedForm = styled.div`
  position: absolute;
  border: 1px solid black;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};
  width: 80vw;
  height: 30vh;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    color: ${(props) => props.theme.colors.blackColor};
    margin-bottom: 3rem;
  }
  button {
    border: none;
    outline: none;
    background-color: ${(props) => props.theme.colors.buttonColor};
    color: ${(props) => props.theme.colors.whiteColor};
    width: 60%;
    cursor: pointer;
  }
`;

interface IFMembers {
  userDisplayName: string;
  userId: string;
}

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state: any = location.state;
  const locationArray = location.pathname.split("/");
  const name = state !== null ? state.pjName : decodeURI(locationArray[2]);
  const key = state !== null ? state.pjKey : locationArray[3];
  const [isInvited, setIsInvited] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const userI = useRecoilValue(userInfo);
  const [chat, setChat] = useRecoilState(chatInfo);
  const [fChat, setFChat] = useState<IChatInfo[]>([]);
  const [fMembers, setFMembers] = useState<IFMembers[]>([]);

  const onSubmit = ({ chat }: any) => {
    setChat(() => [
      ...fChat,
      {
        chat: chat,
        userId: userI.uid,
        userDisplayName: userI.displayName,
        timeStamp: Date.now(),
      },
    ]);
    setValue("chat", "");
  };
  // FireStore에 채팅 내용 올리기
  const docRef = doc(fStore, "projects", key + name);

  const uploadFB = async () => {
    await updateDoc(docRef, {
      chatting: chat,
    });
    setChat([]);
  };

  // FireStore로부터 채팅 내용 받아오기

  const getFB = async () => {
    // 채팅 내용 snapshot 수신
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        if (doc.data().chatting) {
          setFChat(() => [...doc.data().chatting]);
        }
        if (doc.data().participant) {
          setFMembers(() => [...doc.data().participant]);
        }
      } else {
        console.log("No such document!");
      }
    });
  };

  // 새로운 유저가 참여했을 때 firestore에 새로운 유저 정보 올리기
  const updateFB = async () => {
    // Atomically add a new region to the "regions" array field.
    await updateDoc(docRef, {
      participant: arrayUnion({
        userId: userI.uid,
        userDisplayName: userI.displayName,
      }),
    });
  };

  // useEffect(() => {
  //   if (userI.uid === "") {
  //     navigate("/");
  //   }
  // }, []);

  // state가 null일 경우 = 외부 경로로 접근했을 경우
  // 화면을 블러처리하고 로그인 화면으로 이동시킨다

  const goToLogin = () => {
    navigate("/", { state: { invitedUrl: location } });
  };

  useEffect(() => {
    getFB();
    if (chat.length > 0) {
      uploadFB();
    }
  }, [chat]);

  useEffect(() => {
    if (state === null) {
      console.log("밖경로에서 들어왔습니다");
      setIsInvited(true);
      if (userI.uid !== "") {
        console.log("유저가 있다");
        console.log(userI);
        setIsInvited(false);
        updateFB();
      }
    }
  }, []);

  return (
    <>
      <Container>
        <AppHeader pjName={name} />
        <Project_member_invite
          userI={userI}
          pjName={name}
          fMembers={fMembers}
        />
        <div>
          <MainRoot>
            {fChat.map((chat) => (
              <Project_chatbox chat={chat} userI={userI} key={chat.timeStamp} />
            ))}
          </MainRoot>
        </div>
        <Form action="" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("chat")} type="text" />
          <button>전송</button>
        </Form>
      </Container>
      {isInvited ? (
        <InvitedForm>
          <h3>로그인 후 회의에 참여하세요</h3>
          <button onClick={goToLogin}>로그인 하러 가기</button>
        </InvitedForm>
      ) : null}
    </>
  );
};

export default Project;
