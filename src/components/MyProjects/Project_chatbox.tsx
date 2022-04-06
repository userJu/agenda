import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { fStore } from "../../service/fireBase";
import { useRecoilState } from "recoil";
import { chatInfo, IChatInfo } from "../../atoms";
import { upload } from "@testing-library/user-event/dist/upload";

const ChatBox = styled.div<{ isMakeRoot: boolean }>`
  margin-top: 2rem;
  padding-bottom: 11px;
  padding-top: 3px;
  width: 50vw;
  position: relative;
  background-color: ${(props) =>
    props.isMakeRoot && props.theme.colors.buttonColor};
  h4 {
    width: 45vw;
    font-size: 11px;
    margin-left: 1rem;
    margin-bottom: 0.1rem;

    color: gray;
    color: ${(props) =>
      props.isMakeRoot
        ? props.theme.colors.lightBeigeColor
        : props.theme.colors.buttonColor};
  }
`;

const MainChat = styled.li<{ isActive?: boolean }>`
  position: relative;
  width: 45vw;
  height: auto;
  min-height: 50px;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};
  border: 1px solid ${(props) => (props.isActive ? "yellow" : "transparent")};
  margin: 0 2rem;
  margin-left: 0.5rem;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: ${(props) => props.theme.flatShadow};
  border-radius: 6px;
`;

const MakeRootBtn = styled.button<{ isMakeRoot: boolean }>`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  top: 3px;
  right: 3px;
  ${(props) => (props.isMakeRoot ? " opacity:1" : "opacity: 0")};
  cursor: pointer;
  ${MainChat}:hover & {
    opacity: 1;
  }
`;

const NewRootBox = styled.div`
  position: absolute;
  top: 0px;
  left: 50vw;
  height: auto;
  max-height: 65vh;
  width: 48vw;
  padding-top: 10px;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.colors.buttonColor};
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  /* 스크롤바 없애는 ie edge 코드 */
  -ms-overflow-style: none;
  /* 스크롤바 없애는 firefox 코드 */
  scrollbar-width: none;
  /* 스크롤바 없애는 chrome 코드 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NewRootProject = styled.div`
  h4 {
    color: ${(props) => props.theme.colors.lightBeigeColor};
  }
`;

const NewRootChat = styled(MainChat)`
  width: 95%;
  margin: 5px;
  margin-bottom: 15px;
`;

const RootForm = styled.form`
  width: 100%;
  height: 13.5vh;
  background-color: white;
  border: 1px solid navy;
  position: sticky;
  bottom: 0;
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

interface IProject_chatbox {
  chat: {
    chat: string;
    userId: string;
    userDisplayName: string;
    timeStamp: number;
  };
  userI: { uid: string; email: string; displayName: string; photoURL: string };
}

const Project_chatbox = ({ chat, userI }: IProject_chatbox) => {
  const location = useLocation();
  const [IsMakeRoot, setIsMakeRoot] = useState(false);
  const [newRootChats, setNewRootChats] = useState<IChatInfo[]>([]);
  const [activeChats, setActiveChats] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const locationArray = location.pathname.split("/");
  const name = decodeURI(locationArray[2]);
  const key = locationArray[3];
  const makeRoot = () => {
    setIsMakeRoot((prev) => !prev);
  };
  const onSubmit = ({ newRootInput }: any) => {
    const newRootChat: IChatInfo = {
      chat: newRootInput,
      userId: userI.uid,
      userDisplayName: userI.displayName,
      timeStamp: Date.now(),
    };
    uploadFB(newRootChat);
    setValue("newRootInput", "");
  };

  const docRef = doc(
    fStore,
    "projects",
    key + name,
    `${chat.timeStamp}`,
    `${chat.chat}`
  );

  const uploadFB = async (newRootChat: IChatInfo) => {
    try {
      await updateDoc(docRef, {
        chatting: arrayUnion(newRootChat),
      });
    } catch (err) {
      await setDoc(docRef, {
        chatting: [newRootChat],
      });
    }
  };

  // FireStore로부터 채팅 내용 받아오기
  const getFB = async () => {
    // 채팅 내용 snapshot 수신
    await onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setNewRootChats(() => [...doc.data()?.chatting]);
        setActiveChats(true);

        // 새로운 루트를 열 때 가져오기 || 한번에 다 가져오기
        // 속도를 위해서 한번에 다 가져옴
      }
    });
  };

  useEffect(() => {
    getFB();
  }, []);
  return (
    <ChatBox key={chat.timeStamp} isMakeRoot={IsMakeRoot}>
      <h4>
        @ {chat.userDisplayName} / {moment(chat.timeStamp).format("LLL")}
      </h4>
      <MainChat isActive={activeChats}>
        <span>{chat.chat}</span>
        {/* 모든 아이디어는 언젠가 쓸 데가 있기 대문에 삭제는 만들지 않는다 */}
        <MakeRootBtn isMakeRoot={IsMakeRoot} onClick={makeRoot}>
          📌
        </MakeRootBtn>
      </MainChat>
      {IsMakeRoot ? (
        <NewRootBox>
          <NewRootProject>
            <h4>{chat.chat} // New root</h4>
            <ul>
              {newRootChats.map((chat) => (
                <NewRootChat key={chat.timeStamp}>
                  <span>{chat.chat}</span>
                </NewRootChat>
              ))}
            </ul>
          </NewRootProject>
          <RootForm
            onSubmit={handleSubmit(onSubmit)}
            action="새로운 루트에 내용을 작성한다"
          >
            <input type="text" {...register("newRootInput")} />
            <button>루트올리기</button>
          </RootForm>
        </NewRootBox>
      ) : null}
    </ChatBox>
  );
};

export default Project_chatbox;
