import { prodErrorMap } from "firebase/auth";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

const ProjectMaker = styled.div`
  width: 85%;
  height: 55%;
  background-color: #ffffffce;
  position: absolute;
  top: 2.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Location = styled.h1`
  padding-bottom: 1rem;
`;

const Form = styled.form`
  margin-left: 0.3rem;
  margin-bottom: 1rem;
  height: 10%;
  input {
    border: none;
    outline: none;
    background-color: transparent;
    border-bottom: 2px solid black;
    height: 100%;
  }
  button {
    position: absolute;
    top: 80%;
    left: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;

const ShowProjectMaker = () => {
  const [pjName, setPjName] = useState("");
  const [pjDesc, setPjDesc] = useState("");
  const { register, handleSubmit, setValue, setFocus } = useForm();

  const nameSubmit = ({ name }: any) => {
    console.log(name);
    setPjName(name);
    setFocus("desc");
  };
  const descSubmit = ({ desc }: any) => {
    console.log(desc);
    setPjDesc(pjDesc);
    setValue("name", "");
    setValue("desc", "");
  };

  return (
    <ProjectMaker>
      <Location>위치</Location>
      <Form action="name" onSubmit={handleSubmit(nameSubmit)}>
        <input
          {...register("name")}
          type="text"
          placeholder="프로젝트명"
          style={{ width: "40%" }}
        />
      </Form>
      <Form action="description" onSubmit={handleSubmit(descSubmit)}>
        <input
          {...register("desc")}
          type="text"
          placeholder="설명"
          style={{ width: "70%" }}
        />
        <button>button</button>
      </Form>
    </ProjectMaker>
  );
};

export default ShowProjectMaker;
