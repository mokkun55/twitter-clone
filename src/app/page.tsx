"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import useLoginUser from "@/hooks/useLoginUser";
import { CircularProgress } from "@mui/material";
import Sidebar from "./components/Sidebar";
import TimeLine from "./components/TimeLine";
import TweetInput from "./components/TweetInput";

function Page() {
  const [user, loading] = useAuthState(auth);
  const { userProfile, getUserProfile } = useLoginUser();
  const [isTweet, setIsTweet] = useState<boolean>(false);

  useEffect(() => {
    // データ取得
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!userProfile || loading) {
    return (
      <div className="text-center flex flex-col h-[90vh] justify-center items-center">
        <CircularProgress />
        <p className="mt-4">loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* inputモーダル */}
      <TweetInput
        isOpen={isTweet}
        setIsOpen={setIsTweet}
        userProfile={userProfile}
      />

      <div className="flex justify-center ">
        <Sidebar
          userProfile={userProfile}
          isTweet={isTweet}
          setIsTweet={setIsTweet}
        />
        <TimeLine />
        <div className="w-[10%]"></div>
      </div>
    </>
  );
}

export default Page;
