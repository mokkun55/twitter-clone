import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import TLHeader from "./TLHeader";
import {
  addDoc,
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
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { Modal } from "@mui/material";
import { User } from "../Types/User";

type Props = {
  userProfile: User;
};

const TimeLine: FC<Props> = ({ userProfile }) => {
  const router = useRouter();

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
  const loadNextPosts = () => {
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

  // リプライ
  const clickReply = (index: number, postId: string) => {
    setReplyTweet(tweets[index]);
    setIsReplyOpen(true);
  };

  const clickSendReply = () => {
    sendReply();
    setIsReplyOpen(false);
    setReplyText("");
  };

  const sendReply = async () => {
    const replyRef = collection(db, "posts", "3cvc1hL8oJL1gPhllOIu", "reply");
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

  // リツイート
  const clickRetweet = () => {};

  // いいね
  const clickLike = () => {};

  // ブックマーク
  const clickBookmark = () => {};

  // シェア
  const clickShare = () => {};

  return (
    <div className="w-[70%] border-x ">
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
                  <p className="font-bold">{replyTweet?.useNickname}</p>
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
                    src={userProfile.profileImg ?? ""}
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
                  ツイートする
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {tweets.map((post, index) => (
        // TODO 詳細ページへのリンク
        <div className="hover:bg-slate-50 border w-full p-4" key={post.id}>
          <div className="flex items-start">
            <Link href={`/users/${post.userId}`}>
              <Image
                src={post.userProfileImg}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px] hover:opacity-80"
              />
            </Link>

            <div className="flex mt-1 ml-2">
              <Link href={`/users/${post.userId}`}>
                <p className="font-bold hover:underline">{post.useNickname}</p>
              </Link>
              {/* TODO 日付 */}
              <p className="text-gray-500 ml-1">@{post.userId}・日付</p>
            </div>
          </div>

          {/* 本文 */}
          <div className="pl-[55px] mt-[-20px]">
            <p>{post.postText}</p>
          </div>

          {/* アイコンたち */}
          <div className="text-gray-500 pl-[45px] w-full flex items-center *:transition *:duration-300 justify-between">
            <button
              className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full"
              onClick={() => clickReply(index, post.id)}
            >
              <ChatBubbleOutlineIcon />
            </button>

            <button
              className="hover:text-green-500 hover:bg-green-100 p-2 rounded-full"
              onClick={clickRetweet}
            >
              <RepeatIcon />
            </button>

            <button
              className="hover:text-red-500 hover:bg-red-100 p-2 rounded-full"
              onClick={clickLike}
            >
              <FavoriteBorderIcon />
            </button>

            <div className="*:transition *:duration-300">
              <button
                className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                onClick={clickBookmark}
              >
                <BookmarkBorderIcon />
              </button>

              <button
                className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                onClick={clickShare}
              >
                <IosShareIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        className="hover:bg-slate-50 border w-full p-4 text-blue-500 text-center"
        onClick={loadNextPosts}
      >
        もっと見る (次の10件)
      </button>
    </div>
  );
};

export default TimeLine;
