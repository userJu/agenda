import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

const ChatBox = styled.div`
  margin-top: 2rem;
  width: auto;
  position: relative;
  border: 2px solid black;
  h4 {
    width: 45vw;
    font-size: 11px;
    margin-left: 1rem;
    margin-bottom: 0.1rem;
    color: gray;
  }
`;

const MainChat = styled.li`
  border: 1px solid pink;
  position: relative;
  width: 45vw;
  height: auto;
  min-height: 50px;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};
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

const NewRootProject = styled.div`
  border: 1px solid black;
  position: absolute;
  top: 0;
  left: 50vw;
  height: 75vh;
  width: 45vw;
  overflow-y: scroll;
`;

const RootForm = styled.form`
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
  position: sticky;
  bottom: 0;
  left: 0;
`;

interface IProject_chatbox {
  chat: {
    chat: string;
    userId: string;
    userDisplayName: string;
    timeStamp: number;
  };
}

const Project_chatbox = ({ chat }: IProject_chatbox) => {
  const [IsMakeRoot, setIsMakeRoot] = useState(false);

  const makeRoot = () => {
    setIsMakeRoot((prev) => !prev);
  };
  return (
    <ChatBox key={chat.timeStamp}>
      <h4>
        @ {chat.userDisplayName} / {moment(chat.timeStamp).format("LLL")}
      </h4>
      <MainChat>
        <span>{chat.chat}</span>
        {/* 모든 아이디어는 언젠가 쓸 데가 있기 대문에 삭제는 만들지 않는다 */}
        <MakeRootBtn isMakeRoot={IsMakeRoot} onClick={makeRoot}>
          📌
        </MakeRootBtn>
      </MainChat>
      {IsMakeRoot ? (
        <NewRootProject>
          <h4>새 프로젝트 root 이것도 작성시키기</h4>
          <RootForm action="">
            <input type="text" />
            <button>루트올리기</button>
          </RootForm>
        </NewRootProject>
      ) : null}
    </ChatBox>
  );
};

export default Project_chatbox;
