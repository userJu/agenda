import React, { useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { IUserInfo } from "../../atoms";

const MemberBox = styled.ul`
  display: flex;
  margin-bottom: 2rem;
  margin-top: 1rem;
  li {
    border: 1px solid black;
    border-radius: 20px;
    margin: 0 0.5rem;
    padding: 0.3rem 0.7rem;
    box-shadow: ${(props) => props.theme.flatShadow};
  }
`;

const InviteBox = styled.div`
  display: flex;
  align-items: center;
  button {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const InviteForm = styled.form`
  input {
    background-color: transparent;
    transform-origin: 0%;
    border: none;
    border-bottom: 1px solid black;
  }
`;

interface IProject_M_I {
  userI: IUserInfo;
  pjName: string;
  fMembers: { userDisplayName: string; userId: string }[];
}

const Project_member_invite = ({ userI, pjName, fMembers }: IProject_M_I) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  // 초대 폼 열기
  const onInviteOpen = () => {
    setOpen((prev) => !prev);
  };

  // emailjs
  const SERVICE_ID = "service_5h73mmn";
  const TEMPLATE_ID = "template_e4hq3d1";
  // 초대하기
  const onInvite = ({ invite }: any) => {
    console.log(invite);

    // .send는 객체 형태로 넣어주면 되고
    // .sendForm은 templateParams로 Form element의 ref를 넣어준다
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        to_name: invite,
        from_name: userI.displayName,
        message: `${pjName}에 입장해 프로젝트를 진행해보세요 ${window.location.href}`,
      })
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setValue("invite", "");
  };

  return (
    <>
      <MemberBox>
        {fMembers.map((member) => (
          <li>{member.userDisplayName}</li>
        ))}
      </MemberBox>
      <InviteBox>
        <button onClick={onInviteOpen}>초대하기 ➕</button>
        <InviteForm action="" onSubmit={handleSubmit(onInvite)}>
          <motion.input
            {...register("invite")}
            type="text"
            placeholder="email"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: open ? 1 : 0 }}
            transition={{ type: "tween" }}
          />
        </InviteForm>
      </InviteBox>
    </>
  );
};

export default Project_member_invite;
