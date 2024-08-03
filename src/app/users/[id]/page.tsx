"use client";

import React, { useEffect, useState } from "react";
import { User } from "../../Types/User";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { CircularProgress } from "@mui/material";
import Sidebar from "@/app/components/Sidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRecoilValue } from "recoil";
import { loginUserProfile } from "@/app/globalState";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [user] = useAuthState(auth);
  const { id: userId } = params;
  const router = useRouter();
  const [fetchedUserProfile, setFetchedUserProfile] = useState<User | null>(
    null
  );
  const [myAccount, setMyAccount] = useState<boolean>(false);
  const [isTweet, setIsTweet] = useState<boolean>(true);
  const userProfile = useRecoilValue(loginUserProfile);

  useEffect(() => {
    // ユーザープロフィール取得
    const getUserProfile = async () => {
      const userDocCollection = collection(db, "users");
      const q = query(userDocCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // TODO ユーザーがいないときの処理
        console.log("ユーザーがいません");
        return;
      }
      // TODO ここ改良の余地ある
      if (querySnapshot.docs[0].data().userId === user?.uid) {
        console.log("自分のアカウントです");
        setMyAccount(true);
        return;
      }
      console.log(querySnapshot.docs[0].data().userId);
      console.log(user);

      setFetchedUserProfile(querySnapshot.docs[0].data() as User);
    };

    getUserProfile();
  }, [userId, user]);

  if (!fetchedUserProfile) {
    return (
      <div className="text-center flex flex-col h-[90vh] justify-center items-center">
        <CircularProgress />
        <p className="mt-4">loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Sidebar isTweet={isTweet} setIsTweet={setIsTweet} />

      {/* ここに書く */}
      <div className="w-[70%] border-x">
        {/* 上の方 */}
        <div className="py-2 ">
          <div className="flex items-center px-4">
            <button
              onClick={router.back}
              className="hover:bg-gray-400/20 p-2 rounded-full"
            >
              <ArrowBackIcon className="size-[20px]" />
            </button>
            <div className="flex flex-col justify-center">
              <p className="font-bold text-xl ml-8">
                {fetchedUserProfile.nickName}
              </p>
              {/* TODO あとでやる */}
              <p className="text-gray-500 text-sm ml-8">{"xx"}件のツイート</p>
            </div>
          </div>
        </div>

        {/* プロフカード */}
        <div className="bg-green-100">
          {/* ヘッダー画像 */}
          <Image
            src={"/header.jpg"}
            width={1500}
            height={500}
            alt="header"
            className="w-full"
          />
        </div>

        {/* アイコン + 編集ボタン */}
        <div className="flex mx-6 -mt-14 justify-between">
          <Image
            src={fetchedUserProfile.profileImg}
            width={130}
            height={130}
            alt="icon"
            className="rounded-full"
          />

          {/* TODO 自分のプロフィールなら表示 */}
          {fetchedUserProfile.userId === userProfile?.userId && (
            <button className="border px-4 py-2 rounded-full bg-white font-bold h-fit mt-14 hover:bg-gray-200/40 transition duration-150">
              プロフィールを編集
            </button>
          )}
        </div>

        {/* ユーザー情報 */}
        <div className="mx-6">
          <p className="font-bold text-xl">{fetchedUserProfile.nickName}</p>
          <p className="text-gray-500">@{fetchedUserProfile.userId}</p>
          <p className="mt-2">{fetchedUserProfile.bio}</p>
          <p className="text-gray-500">
            {dayjs(fetchedUserProfile.createdAt.toDate()).format("YYYY年MM月")}
            から Twitterを利用しています
          </p>

          {/* フォロー数 */}
          <div className="flex mt-4">
            <div className="flex">
              <p className="font-bold">11</p>
              <p className="text-gray-500">フォロー中</p>
            </div>

            <div className="flex ml-6">
              <p className="font-bold">14</p>
              <p className="text-gray-500">フォロワー</p>
            </div>
          </div>
        </div>
      </div>

      {/* スタイル埋め合わせ */}
      <div className="w-[10%] lg:w-[40%]"></div>
    </div>
  );
};

export default Page;
