import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IMyProgress, myProgress } from "../../../atoms";
import { fStore } from "../../../service/fireBase";

const List = styled.div`
  border-bottom: 1px solid black;
  padding: 0.5rem 0.3rem;
  margin: 0.5rem 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.color};
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;
const Btn = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-right: 5px;
  box-shadow: ${(props) => props.theme.flatShadow};
  cursor: pointer;
`;

interface IShowToDoSet {
  goal: any;
  id: number;
  userId: string;
  color: string;
}

const ShowToDoSet = ({ userId, goal, id, color }: IShowToDoSet) => {
  const [atomGoals, setAtomGoals] = useRecoilState(myProgress);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { className },
    } = e;
    if (className.includes("delete")) {
      const index = atomGoals.findIndex((goalId) => goalId.id === id);
      const goals = [...atomGoals];
      goals.splice(index, 1);
      uploadFStore(goals);
      setAtomGoals(() => [...goals]);
    } else if (className.includes("complete")) {
      console.log("완.요");
      const index = atomGoals.findIndex((goalId) => goalId.id === id);
      const findGoals = atomGoals.find((goalId) => goalId.id === id);
      const finGoals: IMyProgress = {
        goal: findGoals?.goal as string,
        id: findGoals?.id as number,
        fin: true,
      };
      const goals = [...atomGoals];
      goals.splice(index, 1, finGoals);
      uploadFStore(goals);
      setAtomGoals(() => [...goals]);
    }
  };
  //바뀐 내용을 firebase에 업로드하기
  const progressRef = collection(fStore, `${userId}`);
  const uploadFStore = async (goals: any) => {
    await setDoc(doc(progressRef, "progress"), {
      goals,
    });
    setAtomGoals(goals);
  };

  return (
    <List color={color}>
      <li>{goal.goal}</li>
      <Buttons>
        <Btn
          onClick={onClick}
          className="delete"
          style={{ backgroundColor: "#e74c3c" }}
        ></Btn>
        <Btn
          onClick={onClick}
          className="complete"
          style={{ backgroundColor: "#2ecc71" }}
        ></Btn>
      </Buttons>
    </List>
  );
};
export default ShowToDoSet;