// login page

"use client";

import React from "react";
import { auth, db } from "../../../firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../Types/User";

function Page() {
  const router = useRouter();

  const [user] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const uid = result.user.uid;
      const displayName = result.user.displayName;
      const photoURL = result.user.photoURL;

      // 新規か判定
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        router.push("/");
      } else {
        // 新規登録の場合
        const newData: Pick<User, "nickName" | "profileImg" | "createdAt"> = {
          nickName: displayName || "",
          profileImg: photoURL || "",
          createdAt: new Date(),
        };
        const userDocRef = doc(db, "users", uid);
        await setDoc(userDocRef, newData);
        router.push("/signup");
      }
    } catch (error) {
      console.error("dbエラー: ", error);
    }
  };

  const signout = () => {
    signOut(auth);
  };

  return (
    <div className="text-center flex flex-col justify-center items-center h-[90vh]">
      <h1 className="text-3xl font-bold">ログインページ</h1>
      {user ? (
        <div>
          <h1>ログイン済みです</h1>
          <button
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md"
            onClick={signout}
          >
            サインアウト
          </button>
        </div>
      ) : (
        <div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            onClick={loginWithGoogle}
          >
            ログイン or 新規登録
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
