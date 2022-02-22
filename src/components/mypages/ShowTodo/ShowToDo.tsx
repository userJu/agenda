import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { fbInit, IMyProgress, myProgress } from "../../../atoms";
import { fStore } from "../../../service/fireBase";
import ShowToDoSet from "./ShowToDoSet";
import { motion, useAnimation } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

const MyProgress = styled.div`
  width: 100%;
  height: 60%;
  overflow-y: scroll;
`;

const SetGoalBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  position: sticky;
  top: 1rem;
`;

const OpenFormBtn = styled.button`
  font-size: 1.2rem;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  top: 0;
`;

const Input = styled(motion.input)`
  width: 100%;
  border: none;
  outline: none;
  height: 1.5rem;
  transform-origin: left;
  border-bottom: 1px solid black;
  background-color: transparent;
`;

const ProgressBox = styled.ul`
  width: 100%;
  margin-top: 1.5rem;
`;

interface IForm {
  progress: string;
}

interface MyprogressProps {
  uid: string;
}

const ShowToDo = ({ uid }: MyprogressProps) => {
  const { register, handleSubmit, setValue, setFocus } = useForm<IForm>();
  const [atomGoals, setAtomGoals] = useRecoilState(myProgress);
  const [goals, setGoals] = useState<IMyProgress[]>([]);
  const [open, setOpen] = useState(false);
  console.log(uid);
  const onOpen = () => {
    if (!open) {
      setFocus("progress");
    }
    // 이유 : open이 false일 때 클릭해야 setFocus를 해야 해서
    setOpen((prev) => !prev);
  };

  const onSubmit = ({ progress }: IForm) => {
    setGoals(() => [
      {
        goal: progress,
        id: Date.now(),
        fin: false,
      },
      ...atomGoals,
    ]);

    setValue("progress", "");
    setOpen((prev) => !prev);
  };

  // upload and download fireStore
  const progressRef = collection(fStore, `${uid}`);

  const uploadFStore = async () => {
    await setDoc(doc(progressRef, "progress"), {
      goals,
    });
  };

  const downloadFStore = async () => {
    const fStoreData = await getDoc(doc(progressRef, "progress"));
    if (fStoreData.exists()) {
      setAtomGoals(fStoreData.data().goals);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    downloadFStore();
    if (goals?.length > 0) {
      uploadFStore();
    }
  }, [goals, uid]);
  // 다시 원상복귀되는 문제가 있음
  // 드래그한 todo를 destination의 index로 바꿔주면 될 것
  // 방법
  // 1. firebase에서 배열을 바꿔주고 바꾼 배열을 downloadFStore을 통해 가져온다
  // - 간단. 될 지 모름 => firebase 내부에서 배열을 바꿀 수 있는 방법은 없다
  // 2. setAtomGoals를 통해 배열을 바꾸고 바꾼 배열을 다시 firestore에 업로드 한 후 새 배열을 가져온다
  // - 복잡. 됨. 하지만 1번에 비해 비효율적
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (destination?.index !== undefined) {
      const draggedArray = [...atomGoals];
      draggedArray.splice(source.index, 1, atomGoals[destination?.index]);
      draggedArray.splice(destination.index, 1, atomGoals[source?.index]);
      setAtomGoals(draggedArray);
      setGoals(draggedArray);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MyProgress>
        <SetGoalBox>
          <OpenFormBtn onClick={onOpen}>📝</OpenFormBtn>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("progress")}
              type="text"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: open ? 1 : 0 }}
              transition={{ type: "tween" }}
            />
          </Form>
        </SetGoalBox>
        {atomGoals ? (
          <Droppable droppableId="one">
            {(provided) => (
              <ProgressBox {...provided.droppableProps} ref={provided.innerRef}>
                {atomGoals.map((goal, index) => (
                  <ShowToDoSet
                    key={goal.id}
                    goal={goal}
                    id={goal.id}
                    uid={uid}
                    index={index}
                    color={goal.fin ? "#dcdde1" : "white"}
                  />
                ))}
                {provided.placeholder}
              </ProgressBox>
            )}
          </Droppable>
        ) : null}
      </MyProgress>
    </DragDropContext>
  );
};

export default ShowToDo;
