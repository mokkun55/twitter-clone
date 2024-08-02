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
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import Link from "next/link";

type Props = {};

const TimeLine: FC<Props> = () => {
  // home ↔ all
  const [TLMode, setTLMode] = useState<string>("home");
  const [tweets, setTweets] = useState<Array<Post>>([]);

  const router = useRouter();

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

  return (
    <div className="w-[70%] border-x ">
      <TLHeader TLMode={TLMode} setTLMode={setTLMode} />

      {tweets.map((post) => (
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
            <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
              <ChatBubbleOutlineIcon />
            </button>

            <button className="hover:text-green-500 hover:bg-green-100 p-2 rounded-full">
              <RepeatIcon />
            </button>

            <button className="hover:text-red-500 hover:bg-red-100 p-2 rounded-full">
              <FavoriteBorderIcon />
            </button>

            <div className="*:transition *:duration-300">
              <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
                <BookmarkBorderIcon />
              </button>

              <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
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
