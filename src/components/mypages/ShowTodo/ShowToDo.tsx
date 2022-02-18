import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";
import { IMyProgress, myProgress } from "../../../atoms";
import { fStore } from "../../../service/fireBase";
import ShowToDoSet from "./ShowToDoSet";

const MyProgress = styled.div`
  width: 100%;
  height: 40%;
  overflow-y: scroll;
`;

const DateHeader = styled.h3`
  padding: 0.4rem 0.5rem;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 80%;
  }
  button {
    width: 20%;
  }
`;

const ProgressBox = styled.ul`
  width: 100%;
`;

interface IForm {
  progress: string;
}

interface MyprogressProps {
  userId: string;
}

const ShowToDo = ({ userId }: MyprogressProps) => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [atomGoals, setAtomGoals] = useRecoilState(myProgress);
  const [goals, setGoals] = useState<IMyProgress[]>([]);

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
  };

  // upload and download fireStore
  const progressRef = collection(fStore, `${userId}`);

  const uploadFStore = async () => {
    await setDoc(doc(progressRef, "progress"), {
      goals,
    });
  };

  const downloadFStore = async () => {
    const fStoreData = await getDoc(doc(progressRef, "progress"));
    if (fStoreData.exists()) {
      setAtomGoals(fStoreData.data().goals);
      console.log(atomGoals);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    downloadFStore();
    if (goals?.length > 0) {
      uploadFStore();
    }
  }, [goals, userId]);
  // 현재 발생하는 문제
  // 1. 새로고침하고 다시 onSubmit을 하면 리셋되는 문제 : onSubmit에 atomGoals를 넣음으로 해결
  // 2. 내용을 삭제해도 firebase에서는 삭제되지 않는 문제 :

  return (
    <MyProgress>
      <DateHeader>1/16</DateHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("progress")}
          type="text"
          placeholder="목표 설정하기"
        />
        <button>click</button>
      </Form>
      {atomGoals ? (
        <ProgressBox>
          {atomGoals.map((goal) => (
            <ShowToDoSet
              key={goal.id}
              goal={goal}
              id={goal.id}
              userId={userId}
              color={goal.fin ? "#dcdde1" : "white"}
            />
          ))}
        </ProgressBox>
      ) : null}
    </MyProgress>
  );
};

export default ShowToDo;
