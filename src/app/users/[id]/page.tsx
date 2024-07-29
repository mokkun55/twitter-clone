"use client";

import React, { useEffect, useState } from "react";
import { User } from "../../Types/User";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const [user] = useAuthState(auth);
  const { id } = params;
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [myAccount, setMyAccount] = useState<boolean>(false);

  useEffect(() => {
    // ユーザープロフィール取得
    const getUserProfile = async () => {
      const userDocCollection = collection(db, "users");
      const q = query(userDocCollection, where("userId", "==", id));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // TODO ユーザーがいないときの処理
        console.log("ユーザーがいません");
        return;
      }
      if (querySnapshot.docs[0].data().userId === user?.uid) {
        console.log("自分のアカウントです");
        setMyAccount(true);
        return;
      }
      console.log(querySnapshot.docs[0].data().userId);
      console.log(user);

      setUserProfile(querySnapshot.docs[0].data() as User);
    };

    getUserProfile();
  }, [id, user]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl m-4 font-bold">{id}さんのプロフィール</h1>
      {myAccount && (
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => router.push("/users/me/edit")}
        >
          編集
        </button>
      )}
      <div className="flex flex-col items-center justify-center">
        <Image
          src={userProfile?.profileImg || ""}
          width={100}
          height={100}
          alt="プロフィール画像"
        ></Image>
        <h1 className="font-bold">名前</h1>
        <p>{userProfile?.nickName}</p>
        <h1 className="font-bold">ユーザー名</h1>
        <p>{userProfile?.userId}</p>
        <h1 className="font-bold">自己紹介</h1>
        <p>{userProfile?.bio}</p>
      </div>
    </div>
  );
};

export default Page;
