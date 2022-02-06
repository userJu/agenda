import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { IMyProgress, myProgress } from "../../atoms";
import { doc, setDoc, getDocFromCache } from "firebase/firestore";
import { fStore } from "../../service/fireBase";

const MyProgress = styled.div`
  width: 100%;
  height: 40%;
  border: 1px solid green;
  overflow-y: scroll;
`;

const DateHeader = styled.h3`
  border: 1px solid green;
  padding: 0.4rem 0.5rem;
`;

const Form = styled.form`
  width: 100%;
  background-color: gray;
  input {
    width: 80%;
  }
  button {
    width: 20%;
  }
`;

const ProgressBox = styled.ul`
  width: 100%;
  li {
    background-color: pink;
    border: 1px solid black;
    padding: 0.5rem 0.3rem;
    margin: 0.5rem 0.3rem;
  }
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
  console.log(goals);
  console.log(goals.length);
  console.log(userId);

  const uploadFStore = async () => {
    await setDoc(doc(fStore, `${userId}`, "progress"), {
      goals,
    });
  };

  // const downloadFStore = async () => {
  //   const docRef = doc(fStore, `${userId}`, "progress");
  //   try {
  //     const doc = await getDocFromCache(docRef);
  //     const dataArray = doc.data()?.goals;

  //     console.log(dataArray);
  //     // dataArray.map((goal: IMyProgress) =>
  //     //   setAtomGoals((prev) => [goal, ...prev])
  //     // );
  //   } catch (e) {
  //     console.log("Error getting cached document:", e);
  //   }
  // };

  useEffect(() => {
    if (goals?.length > 0) {
      uploadFStore();
    }
    // downloadFStore();
  }, [goals]);
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
          <li key={goal.id}>{goal.goal}</li>
        ))}
      </ProgressBox>
    </MyProgress>
  );
};

export default Myprogress;
