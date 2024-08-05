import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import TLHeader from "./TLHeader";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Post } from "../Types/Post";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import Link from "next/link";
import { Modal } from "@mui/material";
import { useRecoilValue } from "recoil";
import { loginUserProfile } from "../globalState";
import useSendReply from "@/hooks/tweet/useSendReply";
import Tweet from "./Tweet";

const TimeLine: FC = () => {
  const router = useRouter();

  const userProfile = useRecoilValue(loginUserProfile);
  const { sendReply } = useSendReply();

  // home ↔ all
  const [TLMode, setTLMode] = useState<string>("home");
  const [tweets, setTweets] = useState<Array<Post>>([]);

  // リプライ
  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  const [replyTweet, setReplyTweet] = useState<Post>();
  const [replyText, setReplyText] = useState<string>("");

  // ツイート取得 全員のツイートを取得
  // TODO フォローしているユーザーのツイートを取得

  const getAllTweets = () => {
    const Ref = collection(db, "posts");
    const q = query(Ref, orderBy("createdAt", "desc"), limit(20));
    onSnapshot(q, (snapshot) => {
      setTweets(
        snapshot.docs.map((doc) => {
          const data = doc.data() as Post;
          const id = doc.id;
          return { ...data, id };
        })
      );
    });
  };

  // 次の10件を取得
  const loadNextTweets = () => {
    const lastPost = tweets[tweets.length - 1];
    const Ref = collection(db, "posts");
    const q = query(
      Ref,
      orderBy("createdAt", "desc"),
      startAfter(lastPost.createdAt),
      limit(10)
    );
    onSnapshot(q, (snapshot) => {
      setTweets((prevTweets) => [
        ...prevTweets,
        ...snapshot.docs.map((doc) => {
          const data = doc.data() as Post;
          const id = doc.id;
          return { ...data, id };
        }),
      ]);
    });
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  // ---アイコンたち---

  // --リプライ
  // リプライモーダルを開く
  const clickReply = (index: number) => {
    setReplyTweet(tweets[index]);
    setIsReplyOpen(true);
  };

  // リプライを送信
  const clickSendReply = () => {
    if (!replyTweet) return;
    sendReply(replyTweet.id, replyText);
    setIsReplyOpen(false);
    setReplyText("");
  };

  // リツイート
  const clickRetweet = () => {};

  // いいね
  const clickLike = () => {};

  // ブックマーク
  const clickBookmark = () => {};

  // シェア
  const clickShare = () => {};

  return (
    <div className="w-[70%] border-x">
      <TLHeader TLMode={TLMode} setTLMode={setTLMode} />
      {/* リプライモーダル */}
      <Modal
        open={isReplyOpen}
        onClose={() => setIsReplyOpen(false)}
        className="flex justify-center m-16 h-fit"
      >
        <div className="h-fit w-[600px] bg-white rounded-3xl p-2">
          <div>
            <button
              className="hover:bg-gray-100 p-2 rounded-full"
              onClick={() => setIsReplyOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex mx-2">
            <div className=" my-4 w-full">
              {/* リプライ先 */}
              <div className="flex flex-col">
                <div className="flex">
                  <Image
                    src={replyTweet?.userProfileImg ?? ""}
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-full w-[40px] h-[40px] mr-2"
                  />
                  <p className="font-bold">{replyTweet?.userNickname}</p>
                  <p className="text-gray-500 ml-1">
                    @{replyTweet?.userId}・日付
                    {/* TODO 日付 */}
                  </p>
                </div>
                <p className="ml-[50px] mt-[-15px] text-sm">
                  {replyTweet?.postText}
                </p>
              </div>

              {/* 返信欄 */}
              <div className="mt-4">
                <div className="flex">
                  <Image
                    src={userProfile?.profileImg ?? ""}
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-full w-[40px] h-[40px] mr-2"
                  />
                  <textarea
                    className="resize-none outline-none w-full p-2 "
                    placeholder="返信を追加"
                    onChange={(e) => {
                      setReplyText(e.target.value);
                    }}
                    value={replyText}
                  ></textarea>
                </div>
              </div>
              <div className="flex">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
                  onClick={clickSendReply}
                >
                  返信する
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {tweets.map((post, index) => (
        <Tweet
          key={post.id}
          index={index}
          postId={post.id}
          userId={post.userId}
          userProfileImg={post.userProfileImg}
          userNickname={post.userNickname}
          createdAt={post.createdAt}
          postText={post.postText}
        />
      ))}
      <button
        className="hover:bg-slate-50 border w-full p-4 text-blue-500 text-center"
        onClick={loadNextTweets}
      >
        もっと見る (次の10件)
      </button>
    </div>
  );
};

export default TimeLine;
