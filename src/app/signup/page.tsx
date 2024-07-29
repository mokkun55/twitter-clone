// 新規登録ページ

"use client";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "../Types/User";

const Page: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // ログインしている場合は戻す
  useEffect(() => {
    if (user) {
      // ユーザー情報取得
      const userDocRef = doc(db, "users", user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.data()?.userId) {
          router.push("/");
        }
      });
    }
  }, [user, router]);

  // ユーザー名チェック
  const chageUserId = (userId: string) => {
    userId = userId.replace(/[^a-zA-Z0-9]/g, "");
    // console.log(userId);

    setUserId(userId);
  };

  // データ追加
  const addData = async (e: React.FormEvent) => {
    e.preventDefault();
    // データ送信
    try {
      if (auth.currentUser === null) {
        alert("ログインしていません\n先にログインしてください");
        router.push("/login");
        return;
      }

      const userData: Pick<User, "bio" | "nickName" | "userId"> = {
        userId: userId,
        nickName: userName,
        bio: bio || "未設定",
      };

      // 重複チェック
      const userDocCollection = collection(db, "users");
      const q = query(userDocCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        alert("ユーザー名が重複しています");
        return;
      }

      await setDoc(doc(db, "users", auth.currentUser.uid), userData, {
        merge: true,
      });

      setUserId("");
      setUserName("");
      setBio("");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] ">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold pb-4">新規登録</h1>
          <form onSubmit={(e) => addData(e)}>
            <h1>名前(日本語OK)</h1>
            <input
              type="text"
              maxLength={32}
              placeholder="名前"
              required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              className="rounded border border-gray-300 p-1"
            />

            <h1 className="mt-4">ユーザー名(日本語,記号NG)</h1>
            <input
              type="text"
              maxLength={16}
              minLength={3}
              placeholder="userid"
              required
              onChange={(e) => chageUserId(e.target.value)}
              value={userId}
              className="rounded border border-gray-300 p-1"
            />

            <h1 className="mt-4">自己紹介(省略可)</h1>
            <textarea
              placeholder="自己紹介"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className="rounded border border-gray-300 p-1 resize-none"
            ></textarea>
            <button
              type="submit"
              onClick={addData}
              className="bg-blue-500 rounded p-1 text-white flex"
            >
              完了
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Page;
