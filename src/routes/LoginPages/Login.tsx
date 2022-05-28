import React, { useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../service/fireBase";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { IUserInfo, userInfo } from "../../atoms";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.whiteColor};
`;

const LoginForm = styled.div`
  width: 65vw;
  max-width: 440px;
  max-height: 480px;
  padding: 3rem 1.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.flatShadow};
  h1 {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.grayColor};
  }
`;

const LoginBtns = styled.ul`
  width: 100%;
  margin-top: 2rem;
  button {
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    background-color: ${(props) => props.theme.colors.buttonColor};
    color: ${(props) => props.theme.colors.whiteColor};
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: ${(props) => props.theme.flatShadow};
    cursor: pointer;
  }
`;

const Login = () => {
  const setUserI = useSetRecoilState<IUserInfo>(userInfo);
  const location = useLocation();
  const state: any = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/mypage/calendar");
        if (state !== null) {
          navigate(state.invitedUrl.pathname);
        }
      } else {
        console.log("로그인을 해주세요");
      }
    });
  }, []);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { innerHTML },
    } = e;
    const setUser = (user: any) => {
      setUserI({
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    };
    if (innerHTML === "Google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider) //
        .then((result) => {
          const user = result.user;
          setUser(user);
        });
    } else if (innerHTML === "Github") {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider) //
        .then((result) => {
          const user = result.user;
          setUser(user);
        });
    }
  };

  return (
    <Container>
      <LoginForm>
        <h1>AGENDA</h1>
        <LoginBtns>
          <button onClick={onClick}>Google</button>
          <button onClick={onClick}>Github</button>
        </LoginBtns>
      </LoginForm>
    </Container>
  );
};

export default Login;
