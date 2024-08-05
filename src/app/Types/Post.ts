import { Timestamp } from "firebase/firestore";
import { Like } from "./Like";

export type Post = {
  id: string;
  userId: string;
  userProfileImg: string;
  userNickname: string;
  postText: string;
  image?: string;
  createdAt: Timestamp;
  // Likes?: Array<Like>;
  reply?: Array<Post>;
};
