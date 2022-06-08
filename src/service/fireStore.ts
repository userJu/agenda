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
import { IUserCalendars } from "../atoms";

class FireStore {
  uploadData(progressRef: any, calendarEvent: any) {
    // upload fireStore
    const upload = async (calendarEvent: IUserCalendars) => {
      try {
        await updateDoc(doc(progressRef, "calendar"), {
          calendarEvent: arrayUnion(calendarEvent), // todo쪽도 다음에 이렇게 바꿔야겠다 효율적으로
        });
      } catch (err) {
        await setDoc(doc(progressRef, "calendar"), {
          calendarEvent: [calendarEvent], // 만약 처음 만들어질 때는 setDoc를 먼저 한다
        });
      }
    };
  }

  downloadData(progressRef: any, getData: any, positionName: string) {
    onSnapshot(progressRef, (querySnapshot: any) => {
      querySnapshot.forEach(async (doc: any) => {
        if (positionName === "calendarEvent" && doc.data().calendarEvent) {
          getData(doc.data().calendarEvent);
        }

        if (positionName === "goals" && doc.data().goals) {
          getData(doc.data().goals);
        }
      });
    });
  }

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

export default FireStore;
