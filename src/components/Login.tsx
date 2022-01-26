import React, { useEffect } from "react";
import { AuthService } from "../service/Auth-service";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../service/fireBase";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userExist } from "../atoms";

// Kakao.Auth.authorize({
//   redirectUri: "{REDIRECT_URI}",
// });
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  width: 65vw;
  max-width: 440px;
  max-height: 480px;
  padding: 3rem 1.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1.1rem;
  }
`;

const LoginBtns = styled.ul`
  width: 100%;
  margin-top: 2rem;
  li {
    border: 1px solid pink;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    button {
      width: 100%;
    }
  }
`;

const Login = () => {
  const [userId, setUserId] = useRecoilState(userExist);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        navigate("/mypage");
      } else {
        console.log("로그아웃");
      }
    });
  }, []);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { innerHTML },
    } = e;
    if (innerHTML === "Google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider); //
    } else if (innerHTML === "Github") {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider); //
    }
  };
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