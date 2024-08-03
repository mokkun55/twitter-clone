"use client";

import Sidebar from "@/app/components/Sidebar";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FollowButton from "@/app/components/buttons/FollowButton";

type Props = {
  params: {
    id: string;
  };
};

// TODO ここからやる

const Page = ({ params }: Props) => {
  const [isTweet, setIsTweet] = useState<boolean>(true);
  const postId = params.id;
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Sidebar isTweet={isTweet} setIsTweet={setIsTweet} />
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
            <p className="font-bold text-xl ml-8">ツイートする</p>
          </div>
        </div>

        {/* ツイート詳細 */}
        <div className="flex flex-col justify-center px-6">
          {/* TODO リツイート */}

          {/* アカウント */}
          <div className="flex items-center justify-between">
            <div className="flex">
              <Image
                src={"/ico.jpg"}
                width={50}
                height={50}
                alt="icon"
                className="rounded-full"
              />
              <div className="flex flex-col ml-2 justify-center">
                <p className="font-bold">もっくん.dev</p>
                <p className="text-gray-500">@mokkun_dev</p>
              </div>
            </div>

            <FollowButton />
          </div>

          {/* アイコンたち */}
          <div className="flex items-center justify-between"></div>
        </div>

        {/* 返信をツイートしよう */}
      </div>
      <div className="w-[10%] lg:w-[40%]"></div>
    </div>
  );
};

export default Page;
