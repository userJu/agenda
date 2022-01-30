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
  start: string;
  end: string;
  title: string;
  userId: string;
}

export const calendarPlan = atom<ICalendarPlan[]>({
  key: "calendar plan",
  default: [],
});

const dummyEvents = [
  {
    allDay: false,
    end: "January 10, 2022 11:13:00",
    start: "January 09, 2022 11:13:00",
    title: "hi",
  },
  {
    allDay: true,
    end: "January 02, 2022 11:13:00",
    start: "January 02, 2022 11:13:00",
    title: "All Day Event",
  },
  {
    allDay: true,
    end: "January 30, 2022 11:13:00",
    start: "January 30, 2022 11:10:00",
    title: "td",
  },
];
