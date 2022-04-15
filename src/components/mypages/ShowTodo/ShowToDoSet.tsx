import { collection, doc, setDoc } from "firebase/firestore";
import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IMyProgress, myProgress } from "../../../atoms";
import { fStore } from "../../../service/fireBase";

const List = styled.div`
  padding: 0.5rem 0.3rem;
  margin: 0.5rem 1.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // 현재 component에서 오는 color
  background-color: ${(props) => props.color};
  box-shadow: ${(props) => props.theme.flatShadow};
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
  margin-right: 5px;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.flatShadow};
  cursor: pointer;
`;

interface IShowToDoSet {
  goal: any;
  id: number;
  uid: string;
  color: string;
  index: number;
}

const ShowToDoSet = memo(({ uid, goal, id, color, index }: IShowToDoSet) => {
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
      console.log("완료");
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
  const progressRef = collection(fStore, `${uid}`);
  const uploadFStore = async (goals: any) => {
    await setDoc(doc(progressRef, "progress"), {
      goals,
    });
    setAtomGoals(goals);
  };

  return (
    <Draggable key={id} draggableId={id + ""} index={index}>
      {(provided) => (
        <List
          color={color}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <li>{goal.goal}</li>
          <Buttons>
            <Btn
              onClick={onClick}
              className="delete"
              style={{ backgroundColor: "#2f3640" }}
              title="삭제"
            ></Btn>
            <Btn
              onClick={onClick}
              className="complete"
              style={{ backgroundColor: "#7f8fa6" }}
              title="완료"
            ></Btn>
          </Buttons>
        </List>
      )}
    </Draggable>
  );
});
export default ShowToDoSet;
