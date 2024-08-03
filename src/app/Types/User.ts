import { Timestamp } from "firebase/firestore";

export type User = {
  nickName: string;
  userId: string;
  profileImg: string;
  bio: string;
  createdAt: Timestamp;
};
