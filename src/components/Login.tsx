import React from "react";
import { AuthService } from "../service/Auth-service";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../service/fireBase";

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
  return (
    <div>
      <h1>AGENDA</h1>
      <div>
        <button onClick={GoogleLogin}>Google</button>
        <button>Github</button>
        <button>Kakao</button>
        <button>Naver</button>
      </div>
    </div>
  );
};

export default Login;
