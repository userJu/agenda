import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

const ChatBox = styled.div`
  margin-top: 2rem;
  width: 100%;

  h4 {
    width: 100%;
    font-size: 11px;
    margin-left: 1rem;
    margin-bottom: 0.1rem;
    color: gray;
  }
`;

const MainChat = styled.li`
  position: relative;
  width: 90%;
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
  /* &:hover {
    button {
      display: flex;
    }
  } */
`;

const MakeRootBtn = styled.button<{ isActiveRoot: boolean }>`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  top: 3px;
  right: 3px;
  /* display: ${(props) => (props.isActiveRoot ? "flex" : "none")}; */
  cursor: pointer;
  ${MainChat}:hover & {
    display: flex;
  }
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
  const [newRoot, setNewRoot] = useState(false);

  const makeRoot = () => {
    setNewRoot((prev) => !prev);
  };
  return (
    <ChatBox key={chat.timeStamp}>
      <h4>
        @ {chat.userDisplayName} / {moment(chat.timeStamp).format("LLL")}
      </h4>
      <MainChat>
        <span>{chat.chat}</span>
        {/* 모든 아이디어는 언젠가 쓸 데가 있기 대문에 삭제는 만들지 않는다 */}
        <MakeRootBtn isActiveRoot={newRoot} onClick={makeRoot}>
          📌
        </MakeRootBtn>
      </MainChat>
    </ChatBox>
  );
};

export default Project_chatbox;
