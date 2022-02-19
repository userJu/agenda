import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { fbInit, IMyProgress, myProgress } from "../../../atoms";
import { fStore } from "../../../service/fireBase";
import ShowToDoSet from "./ShowToDoSet";
import { motion, useAnimation } from "framer-motion";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
`;

const ProgressBox = styled.ul`
  width: 100%;
  margin-top: 1.5rem;
  background-color: pink;
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

  return (
    <MyProgress>
      <SetGoalBox>
        <OpenFormBtn onClick={onOpen}>📝</OpenFormBtn>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("progress")}
            type="text"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: open ? 1 : 0 }}
          />
        </Form>
      </SetGoalBox>
      {atomGoals ? (
        <Droppable droppableId="one">
          {(provided) => (
            <ProgressBox {...provided.droppableProps}>
              {atomGoals.map((goal) => (
                <ShowToDoSet
                  key={goal.id}
                  goal={goal}
                  id={goal.id}
                  uid={uid}
                  color={goal.fin ? "#dcdde1" : "white"}
                />
              ))}
            </ProgressBox>
          )}
        </Droppable>
      ) : null}
    </MyProgress>
  );
};

export default ShowToDo;
