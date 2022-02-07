import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { IMyProgress, myProgress } from "../../atoms";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { fStore } from "../../service/fireBase";
import MyprogressSet from "./MyprogressSet";

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

const Myprogress = ({ userId }: MyprogressProps) => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [atomGoals, setAtomGoals] = useRecoilState(myProgress);
  const [goals, setGoals] = useState<IMyProgress[]>([]);
  const onSubmit = ({ progress }: IForm) => {
    console.log(progress);

    setGoals((prevGoals) => [
      {
        goal: progress,
        id: Date.now(),
      },
      ...prevGoals,
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
      <ProgressBox>
        {atomGoals.map((goal) => (
          <MyprogressSet goal={goal} key={goal.id} />
        ))}
      </ProgressBox>
    </MyProgress>
  );
};

export default Myprogress;
