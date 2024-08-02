import { Like } from "./Like";

export type Post = {
  id: string;
  userId: string;
  userProfileImg: string;
  useNickname: string;
  postText: string;
  image?: string;
  createdAt: Date;
  // Likes?: Array<Like>;
  reply?: Array<Post>;
};
