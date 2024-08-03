import React, { FC, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { Post } from "@/app/Types/Post";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useRecoilValue } from "recoil";
import { loginUserProfile } from "@/app/globalState";

type Props = {
  // clickReply: (index: number) => void;
  index: number;
  tweets: Post[];
};

const ReplyButtn: FC<Props> = ({ tweets, index }) => {
  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  const [replyTweet, setReplyTweet] = useState<Post>();
  const [replyText, setReplyText] = useState<string>("");

  const userProfile = useRecoilValue(loginUserProfile);

  // リプライ
  const clickReply = (index: number) => {
    setReplyTweet(tweets[index]);
    setIsReplyOpen(true);
  };

  const clickSendReply = () => {
    sendReply();
    setIsReplyOpen(false);
    setReplyText("");
  };

  const sendReply = async () => {
    // TODO IDの取得方法
    if (!replyTweet) return;
    if (!userProfile) return;

    const replyRef = collection(db, "posts", replyTweet.id, "reply");
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
  return (
    <button
      className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full"
      onClick={(e) => {
        e.stopPropagation();
        clickReply(index);
      }}
    >
      <ChatBubbleOutlineIcon />
    </button>
  );
};

export default ReplyButtn;
