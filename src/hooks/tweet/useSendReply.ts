import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Post } from "@/app/Types/Post";
import { useRecoilValue } from "recoil";
import { loginUserProfile } from "@/app/globalState";

// type Props = {
//   ReplyToId: string;
//   replyText: string;
// };

const useSendReply = () => {
  const userProfile = useRecoilValue(loginUserProfile);

  const sendReply = async (ReplyToId: string, replyText: string) => {
    if (!userProfile) return;

    const replyRef = collection(db, "posts", ReplyToId, "reply");
    const sendReplyData: Post = {
      id: "", // TODO: どうかする
      userId: userProfile.userId,
      userProfileImg: userProfile.profileImg,
      useNickname: userProfile.nickName,
      postText: replyText,
      // TODO: 画像投稿機能
      createdAt: new Date(),
      // TODO: いいね機能
    };
    await addDoc(replyRef, sendReplyData);
    console.log("リプライしました");
  };

  return { sendReply };
};

export default useSendReply;
