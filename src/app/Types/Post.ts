import { Like } from "./Like";

export type Post = {
  userId: string;
  content: string;
  image?: string;
  createdAt: Date;
  Likes: Array<Like>;
};
