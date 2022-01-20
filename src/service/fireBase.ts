import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// const {
//   REACT_APP_API_KEY,
//   REACT_APP_AUTH_DOMAIN,
//   REACT_APP_PROJECT_ID,
//   REACT_APP_STORAGE_BUCKET,
//   REACT_APP_MESSAGIN_SENDER_ID,
//   REACT_APP_APP_ID,
//   REACT_APP_MEASUREMENT_ID,
// } = process.env;
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// apiKey: "AIzaSyC9CnjcBgmnXo3dKlVEnHPqDfz14v29hd0",
// authDomain: "agenda-39a7e.firebaseapp.com",
// projectId: "agenda-39a7e",
// storageBucket: "agenda-39a7e.appspot.com",
// messagingSenderId: "916619165031",
// appId: "1:916619165031:web:3a0d14ae2a434a0378c3c2",
// measurementId: "G-HPZT56D5DG"

export const initApp = initializeApp(firebaseConfig);
export const auth = getAuth(initApp);
