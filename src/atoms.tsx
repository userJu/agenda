import { atom } from "recoil";

export const userInfo = atom({
  key: "userId",
  default: "",
});

export const userName = atom({
  key: "userName",
  default: "",
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
export interface IuserProject {
  pjName: string;
  pjDesc: string;
  pjId: number;
}

export const userProject = atom<IuserProject[]>({
  key: "userProject",
  default: [],
});

export const fStoreProject = atom<IuserProject[]>({
  key: "fStoreProject",
  default: [],
});
