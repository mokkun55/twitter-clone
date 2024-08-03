"use client";

import Sidebar from "@/app/components/Sidebar";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FollowButton from "@/app/components/buttons/FollowButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useRecoilValue } from "recoil";
import { loginUserProfile } from "@/app/globalState";
import useLoginUser from "@/hooks/useLoginUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const postId = params.id;
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [isTweet, setIsTweet] = useState<boolean>(true);
  const [postText, setPostText] = useState<string>("");

  const userProfile = useRecoilValue(loginUserProfile);
  const { getUserProfile } = useLoginUser();

  useEffect(() => {
    // データ取得
    !userProfile && getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

          {/* 本文 */}
          <div className="mt-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, et saepe. Saepe, dicta. Nobis natus commodi corrupti
              quo qui alias harum atque perferendis repellendus iste veniam
              suscipit itaque minima eveniet numquam quod, dolore, provident
              molestias? Deserunt aspernatur officia laboriosam corrupti.
            </p>
          </div>

          {/* TODO 日付 */}
          <div>
            <p className="text-gray-500 text-sm py-4">
              午後xx:xx・2024年8月2日
            </p>
          </div>

          {/* アイコンたち */}
          <div className="text-gray-500 pl-[45px] w-full flex items-center *:transition *:duration-300 justify-between border-y">
            <button
              className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full"
              // onClick={clickReply}
            >
              <ChatBubbleOutlineIcon />
            </button>

            <button
              className="hover:text-green-500 hover:bg-green-100 p-2 rounded-full"
              // onClick={clickRetweet}
            >
              <RepeatIcon />
            </button>

            <button
              className="hover:text-red-500 hover:bg-red-100 p-2 rounded-full"
              // onClick={clickLike}
            >
              <FavoriteBorderIcon />
            </button>

            <button
              className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full"
              // onClick={clickBookmark}
            >
              <BookmarkBorderIcon />
            </button>

            <button
              className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full"
              // onClick={clickShare}
            >
              <IosShareIcon />
            </button>
          </div>
        </div>

        {/* 返信欄 */}
        <div className="flex m-2">
          <Image
            src={userProfile?.profileImg || "/noImg.jpg"}
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] mr-2"
          />
          <div className="mt-3 w-full h-fit ">
            <textarea
              className="resize-none outline-none w-full text-lg"
              placeholder="返信をツイート"
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <div className="flex">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
                // onClick={clickSendTweet}
              >
                返信
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[10%] lg:w-[40%]"></div>
    </div>
  );
};

export default Page;
