import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Post } from "../Types/Post";
import useSendReply from "@/hooks/tweet/useSendReply";

type Props = {
  postId: string;
  userId: string;
  userProfileImg: string;
  userNickname: string;
  createdAt: Timestamp;
  postText: string;
  isIconRight?: boolean;
  index: number;
};

const Tweet: FC<Props> = ({
  postId,
  userId,
  userProfileImg,
  userNickname,
  postText,
  isIconRight = false,
  index,
}) => {

  // リプライ

  // モーダルを開く

  // 

  return (
    <div className="hover:bg-slate-50 border-y w-full px-4 py-3" key={postId}>
      <Link href={`/posts/${postId}`}>
        <div className="flex items-start">
          <Link href={`/users/${userId}`}>
            <Image
              // TODO なおす
              src={userProfileImg || "/ico.jpg"}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] hover:opacity-80 hover:cursor-pointer"
            />
          </Link>

          <div className="flex mt-1 ml-2">
            <Link
              href={`/users/${userId}`}
              className="font-bold hover:underline hover:cursor-pointer"
            >
              {userNickname}
            </Link>
            {/* TODO 日付 */}
            <p className="text-gray-500 ml-1">@{userId}・日付</p>
          </div>
        </div>

        {/* 本文 */}
        <div className="pl-[55px] mt-[-20px]">
          <p>{postText}</p>
        </div>
      </Link>

      {/* アイコンたち */}
      <div className="text-gray-500 pl-[45px] w-full flex items-center *:transition *:duration-300 justify-between">
        <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
          <ChatBubbleOutlineIcon />
        </button>

        <button className="hover:text-green-500 hover:bg-green-100 p-2 rounded-full">
          <RepeatIcon />
        </button>

        <button className="hover:text-red-500 hover:bg-red-100 p-2 rounded-full">
          <FavoriteBorderIcon />
        </button>

        {isIconRight ? (
          <div className="*:transition *:duration-300">
            <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
              <BookmarkBorderIcon />
            </button>

            <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
              <IosShareIcon />
            </button>
          </div>
        ) : (
          <>
            <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
              <BookmarkBorderIcon />
            </button>

            <button className="hover:text-blue-500 hover:bg-blue-100 p-2 rounded-full">
              <IosShareIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tweet;
