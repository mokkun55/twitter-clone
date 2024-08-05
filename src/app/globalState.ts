import { atom } from "recoil";
import { User } from "./Types/User";

export const loginUserProfile = atom<User | null>({
  key: "loginUserProfile",
  default: null,
});

export const replyModalState = atom<boolean>({
  key: "replyModalState",
  default: false,
});
