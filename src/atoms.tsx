import { atom } from "recoil";

interface IUserInfo {
  default: string;
}

export const userInfo = atom({
  key: "userId",
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
