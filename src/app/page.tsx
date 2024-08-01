"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import useLoginUser from "@/hooks/useLoginUser";
import { CircularProgress } from "@mui/material";
import Sidebar from "./components/Sidebar";
import TimeLine from "./components/TimeLine";

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
    <div className="flex bg-slate-300 justify-center">
      <Sidebar
        userProfile={userProfile}
        isTweet={isTweet}
        setIsTweet={setIsTweet}
      />
      <TimeLine userProfile={userProfile} />
    </div>
  );
}

export default Page;
