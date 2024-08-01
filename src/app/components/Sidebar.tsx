"use client";

import React, { FC } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";
import { User } from "../Types/User";
import { Edit } from "@mui/icons-material";
import Image from "next/image";

type Props = {
  userProfile: User;
  isTweet: boolean;
  setIsTweet: (value: boolean) => void;
};

const Sidebar: FC<Props> = ({ userProfile, isTweet, setIsTweet }) => {
  const router = useRouter();
  return (
    <div className="bg-blue-300 h-screen w-[10%] flex flex-col items-center">
      <ul className="flex flex-col *:m-1 *:p-2">
        <li>
          <button onClick={() => router.push("/")}>
            <HomeIcon className="text-[50px] p-2 rounded-full hover:bg-gray-400/20" />
            <p className="hidden">HOME</p>
          </button>
        </li>
        <li>
          <button onClick={() => router.push(`/users/${userProfile.userId}`)}>
            <PersonIcon className="text-[50px] p-2 rounded-full hover:bg-gray-400/20" />
            <p className="hidden">Profile</p>
          </button>
        </li>
        <li>
          <button onClick={() => router.push("/login")}>
            <SettingsIcon className="text-[50px] p-2 rounded-full hover:bg-gray-400/20" />
            <p className="hidden">Setting</p>
          </button>
        </li>
        <li>
          <button onClick={() => setIsTweet(!isTweet)} className="w-full">
            <Edit className="text-[50px] p-3 bg-blue-500 rounded-full text-white block" />

            <p className="bg-blue-500 rounded-full text-white py-3 font-bold hidden">
              ツイートする
            </p>
          </button>
        </li>
      </ul>

      <div className="">
        <Image
          src={userProfile.profileImg}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
