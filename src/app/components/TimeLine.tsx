import React, { FC, useEffect, useState } from "react";
import { User } from "../Types/User";
import Image from "next/image";
import TLHeader from "./TLHeader";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { Post } from "../Types/Post";

type Props = {};

const TimeLine: FC<Props> = () => {
  // home ↔ all
  const [TLMode, setTLMode] = useState<string>("home");
  const [tweets, setTweets] = useState<Array<Post>>([]);

  useEffect(() => {
    // ツイート取得 全員のツイートを取得
    const getAllTweets = async () => {
      const Ref = collection(db, "posts");
      const q = query(Ref, orderBy("createdAt", "desc"));
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

    // TODO フォローしているユーザーのツイートを取得
    const getFollowTweets = async () => {
      const Ref = collection(db, "posts");
      const q = query(Ref, orderBy("createdAt", "desc"));
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

    switch (TLMode) {
      case "home":
        getAllTweets();
        break;
      case "all":
        getFollowTweets();
        break;
      default:
        break;
    }
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
    </div>
  );
};

export default TimeLine;
