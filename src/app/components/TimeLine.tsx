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

type Props = {};

const TimeLine: FC<Props> = () => {
  // home ↔ all
  const [TLMode, setTLMode] = useState<string>("home");
  const [tweets, setTweets] = useState<Array<Post>>([]);

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
        <div className="hover:bg-slate-50 border w-full p-4" key={post.id}>
          <div className="flex items-start">
            <Image
              src={post.userProfileImg}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px]"
            />

            <div className="flex mt-1 ml-2">
              <p className="font-bold">{post.useNickname}</p>
              {/* TODO 日付 */}
              <p className="text-gray-500">@{post.userId}・日付</p>
            </div>
          </div>

          <div className="ml-[55px] mt-[-20px]">
            <p>{post.postText}</p>
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
