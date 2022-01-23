import React from "react";
import { AuthService } from "../service/Auth-service";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../service/fireBase";
import styled from "styled-components";

const Login = () => {
  const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY_KAKAO;
  const REDIRECT_URI = "http://localhost:3000/";
  const LGIN = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

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

  return (
    <Container>
      <LoginForm>
        <h1>AGENDA</h1>
        <LoginBtns>
          <li>
            <button onClick={GoogleLogin}>Google</button>
          </li>
          <li>
            <button>Github</button>
          </li>
          <li>
            <button>
              <a href={LGIN}>Kakao</a>
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
