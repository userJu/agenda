import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initApp } from "./fireBase";

export class AuthService {
  // login() {
  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential?.accessToken;
  //       const user = result.user;
  //       console.log("로그인됨");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       const email = error.email;
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //     });
  // }
}

// export const AuthService = atom({
//   key: "GoogleAuth",
//   default :
// });
