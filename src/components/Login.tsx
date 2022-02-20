import React, { useEffect, useState } from "react";
import { AuthService } from "../service/Auth-service";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../service/fireBase";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IUserInfo, projectLink, userInfo } from "../atoms";

// Kakao.Auth.authorize({
//   redirectUri: "{REDIRECT_URI}",
// });
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
  li {
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: ${(props) => props.theme.flatShadow};

    button {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      outline: none;
      background-color: ${(props) => props.theme.colors.buttonColor};
      color: ${(props) => props.theme.colors.whiteColor};
      cursor: pointer;
    }
  }
`;

const Login = () => {
  const [userI, setUserI] = useRecoilState<IUserInfo>(userInfo);
  const location = useLocation();
  const state: any = location.state;
  const navigate = useNavigate();
  console.log(userI);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserI({
        //   uid: user.uid,
        //   email: user.email || "",
        //   displayName: user.displayName || "",
        //   photoURL: user.photoURL || "",
        //   // 만약 없을 경우 보여주지 말라
        // });
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

  // const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const {
  //     currentTarget: { innerHTML },
  //   } = e;
  //   const setUser = (provider: any) => {
  //     signInWithPopup(auth, provider) //
  //       .then((result) => {
  //         const user = result.user;
  //         setUserI({
  //           uid: user.uid,
  //           email: user.email || "",
  //           displayName: user.displayName || "",
  //           photoURL: user.photoURL || "",
  //         });
  //       });
  //   };
  //   if (innerHTML === "Google") {
  //     const provider = new GoogleAuthProvider();
  //     setUser(provider);
  //   } else if (innerHTML === "Github") {
  //     const provider = new GithubAuthProvider();
  //     setUser(provider);
  //   }
  // };

  return (
    <Container>
      <LoginForm>
        <h1>AGENDA</h1>
        <LoginBtns>
          <li>
            <button onClick={onClick}>Google</button>
          </li>
          <li>
            <button onClick={onClick}>Github</button>
          </li>
          <li>
            <button>
              <a>Kakao</a>
            </button>
          </li>
          <li>
            <button>Naver</button>
          </li>
        </LoginBtns>
      </LoginForm>
    </Container>
  );
};

export default Login;

//Kakao
// const REST_API_KEY = process.env.REACT_APP_REST_API_KEY_KAKAO;
// const REDIRECT_URI = "http://localhost:3000/";
// const LGIN = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

// useEffect(() => {
//   const code = new URL(window.location.href).searchParams.get("code");
//   console.log(code);

//   window.Kakao.Auth.login({
//     scope: "profile",
//   });
// }, []);

// const code = useLocation().search;
// useLocation에서 searchParams사용하는법
// 위 code = 다음 받아오기
