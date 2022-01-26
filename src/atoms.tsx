import { atom } from "recoil";

// interface IUserExist {
//   text: string;
// }

export const userExist = atom<string>({
  key: "user",
  default: "",
});
