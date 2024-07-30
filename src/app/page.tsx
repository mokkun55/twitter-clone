"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import useLoginUser from "@/hooks/useLoginUser";

function Page() {
  const [user] = useAuthState(auth);
  const { userProfile, getUserProfile } = useLoginUser();

  useEffect(() => {
    // データ取得
    getUserProfile();
  }, [getUserProfile, user]);
  return (
    <div>
      <div className="text-blue-700 underline">
        <Link href="login">ログイン</Link>
        <br />
        {!userProfile && <Link href="signup">サインアップ</Link>}
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
