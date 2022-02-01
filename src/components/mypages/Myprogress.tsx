import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { IMyProgress, myProgress } from "../../atoms";
import { doc, setDoc } from "firebase/firestore";
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
  const [goals, setGoals] = useRecoilState(myProgress);

  const onSubmit = ({ progress }: IForm) => {
    console.log(progress);
    setGoals((prevGoals) => [
      {
        goal: progress,
        id: Date.now(),
      },
      ...prevGoals,
    ]);
    uploadFStore(progress);
    console.log(goals);

    setValue("progress", "");
  };

  const uploadFStore = async (progress: string) => {
    await setDoc(doc(fStore, `${userId}`, "progress"), {
      goal: progress,
      id: Date.now(),
    });
  };

  useEffect(() => {}, []);
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
        {goals.map((goal) => (
          <li key={goal.id}>{goal.goal}</li>
        ))}
      </ProgressBox>
    </MyProgress>
  );
};

export default Myprogress;
