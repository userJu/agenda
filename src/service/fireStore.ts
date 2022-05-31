import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export class FireStore {
  // uploadFStore = async (data, progressRef, docs, unionName) => {
  //   if (unionName === "calendar") {
  //     try {
  //       await updateDoc(doc(progressRef, docs), {
  //         calendarEvent: arrayUnion(data),
  //       });
  //     } catch (err) {
  //       await setDoc(doc(progressRef, docs), {
  //         calendarEvent: [data],
  //       });
  //     }
  //   } else {
  //     try {
  //       await updateDoc(doc(progressRef, docs), {
  //         goals: arrayUnion(data),
  //       });
  //     } catch (err) {
  //       await setDoc(doc(progressRef, docs), {
  //         goals: [data],
  //       });
  //     }
  //   }
  // };
}
