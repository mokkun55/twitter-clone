"use client";

import { collection, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "./Types/User";
import Image from "next/image";

function Page() {
  const [user] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    if (!user) return;
    // データ取得
    const getUserProfile = async () => {
      const profileRef = doc(db, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      setUserProfile(profileSnap.data() as User);
    };

    getUserProfile();
  }, [user]);
  return (
    <div>
      <div className="text-blue-700 underline">
        <Link href="login">ログイン</Link>
        <br />
        <Link href="signup">サインアップ</Link>
      </div>

      {user ? (
        <div>
          <h1>ユーザー情報</h1>
          <Image
            src={userProfile?.profileImg || ""}
            width={100}
            height={100}
            alt="hoge"
          />
          <p>ユーザーID(自動): {user?.uid}</p>
          <p>ユーザーID(任意): {userProfile?.userId}</p>
          <p>ニックネーム: {userProfile?.nickName}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Page;
