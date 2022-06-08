import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { IMyProgress, myProgress } from "../../../atoms";
import { fStore } from "../../../service/fireBase";
import ToDoList from "./ToDoList";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

const MyProgress = styled.div`
  width: 100%;
  height: 90%;
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
  fireStore: any;
}

const ShowToDo = ({ uid, fireStore }: MyprogressProps) => {
  const { register, handleSubmit, setValue, setFocus } = useForm<IForm>();
  const [atomGoals, setAtomGoals] = useRecoilState(myProgress);
  const [open, setOpen] = useState(false);

  const openFormInput = () => {
    if (!open) {
      setFocus("progress");
    }
    setOpen((prev) => !prev);
  };

  const onSubmit = ({ progress }: IForm) => {
    const goals = {
      goal: progress,
      id: Date.now(),
      fin: false,
    };
    uploadFStore(goals);
    setValue("progress", "");
    setOpen((prev) => !prev);
  };

  // upload and download fireStore
  const progressRef = collection(fStore, `${uid}`);

  const uploadFStore = async (goals: IMyProgress) => {
    try {
      await updateDoc(doc(progressRef, "progress"), {
        goals: arrayUnion(goals),
      });
    } catch (err) {
      await setDoc(doc(progressRef, "progress"), {
        goals: [goals],
      });
    }
  };

  // const downloadFStore = async () => {
  //   await onSnapshot(progressRef, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if (doc.data().goals) {
  //         setAtomGoals((prev) => [...doc.data().goals]);
  //       }
  //     });
  //   });
  // };

  const getData = (datas: any) => {
    if (datas) {
      setAtomGoals((prev) => [...datas]);
    }
  };

  useEffect(() => {
    // downloadFStore();
    fireStore.downloadData(progressRef, getData, "goals");
  }, []);
  // 다시 원상복귀되는 문제가 있음
  // 드래그한 todo를 destination의 index로 바꿔주면 될 것
  // 방법
  // 1. firebase에서 배열을 바꿔주고 바꾼 배열을 downloadFStore을 통해 가져온다
  // - 간단. 될 지 모름 => firebase 내부에서 배열을 바꿀 수 있는 방법은 없다
  // 2. setAtomGoals를 통해 배열을 바꾸고 바꾼 배열을 다시 firestore에 업로드 한 후 새 배열을 가져온다
  // - 복잡. 됨. 하지만 1번에 비해 비효율적

  // 4월 8일 문제
  // 새로고침하면 돌아옴, 당연함. 순서 업데이트 안함.
  // 따라서

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (destination?.index !== undefined) {
      const draggedArray = [...atomGoals];
      draggedArray.splice(source.index, 1, atomGoals[destination?.index]);
      draggedArray.splice(destination.index, 1, atomGoals[source?.index]);
      setAtomGoals(draggedArray);
      // setGoals(draggedArray); => 드래그 문제
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <MyProgress>
        <SetGoalBox>
          <OpenFormBtn onClick={openFormInput}>📝</OpenFormBtn>
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
                  <ToDoList
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
