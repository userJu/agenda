import { atom } from "recoil";

// firebase Auth init
export const fbInit = atom({
  key: "fbInit",
  default: false,
});

// 유저 정보
export interface IUserInfo {
  uid: string; // uid
  email: string;
  displayName: string; // 표시되는 유저이름
  photoURL: string;
}

export const userInfo = atom<IUserInfo>({
  key: "userId",
  default: { uid: "", email: "", displayName: "", photoURL: "" },
});

export interface ICalendarPlan {
  allDay: boolean;
  start: number;
  end: number;
  title: any;
}

export const calendarPlan = atom<ICalendarPlan[]>({
  key: "calendar plan",
  default: [],
});

export interface IMyProgress {
  goal: string;
  id: number;
  fin: boolean;
}

export const myProgress = atom<IMyProgress[]>({
  key: "Progress",
  default: [],
});

// export const myUploadingProgress = atom<IMyProgress[]>({
//   key: "UploadingProgress",
//   default: [],
// });

// Project 부분

export interface IParticipant {
  userId: string;
  userDisplayName: string;
}

export interface IUserProject {
  // participant: { userId: string };
  participant: IParticipant[];
  pjName: string;
  pjDesc: string;
  pjId: number;
}

export const userProject = atom<IUserProject[]>({
  key: "userProject",
  default: [],
});

export interface IBasicPj {
  name: string;
  key: number;
}

export const basicPj = atom<IBasicPj[]>({
  key: "fStoreProject",
  default: [],
});

// 개별 project

export interface IChatInfo {
  chat: string;
  userId: string;
  userDisplayName: string;
  timeStamp: number;
}

export const chatInfo = atom<IChatInfo[]>({
  key: "chatInfo",
  default: [],
});

// project 링크

export const projectLink = atom({
  key: "projectLink",
  default: "",
});
