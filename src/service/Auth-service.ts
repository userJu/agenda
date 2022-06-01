import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./fireBase";
import { onAuthStateChanged } from "firebase/auth";

class AuthService {
  login(innerHTML: string) {
    if (innerHTML === "Google") {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider) //
        .then((result) => {
          const user = result.user;
          // setUser(user);
        });
    } else if (innerHTML === "Github") {
      const provider = new GithubAuthProvider();
      signInWithPopup(auth, provider) //
        .then((result) => {
          const user = result.user;
          // setUser(user);
        });
    }
  }

  onAuthChange(onUserChanged: any) {
    onAuthStateChanged(auth, (user) => {
      onUserChanged(user);
    });
  }
}
export default AuthService;
// export const AuthService = atom({
//   key: "GoogleAuth",
//   default :
// });
