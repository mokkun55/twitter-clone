import { atom } from "recoil";
import { User } from "./Types/User";

export const loginUserProfile = atom<User | null>({
  key: "loginUserProfile",
  default: null,
});
