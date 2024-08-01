"use client";

import React, { FC } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
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
    <div className="h-screen w-[10%] lg:w-[40%] flex flex-col items-center lg:items-end lg:mr-10 justify-between sticky top-0">
      <ul className="flex flex-col *:m-1 *:p-2">
        <li>
          <button
            onClick={() => router.push("/")}
            className="flex items-center"
          >
            <HomeIcon className="text-[50px] p-2 rounded-full hover:bg-gray-400/20" />
            <p className="hidden lg:block">Home</p>
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push(`/users/${userProfile.userId}`)}
            className="flex items-center"
          >
            <PersonIcon className="text-[50px] p-2 rounded-full hover:bg-gray-400/20" />
            <p className="hidden lg:block">Profile</p>
          </button>
        </li>
        <li>
          <button
            onClick={() => router.push("/login")}
            className="flex items-center"
          >
            <LogoutIcon className="text-[50px] p-2 rounded-full hover:bg-gray-400/20" />
            <p className="hidden lg:block">Logout</p>
          </button>
        </li>
        <li>
          <button onClick={() => setIsTweet(!isTweet)} className="w-full">
            <Edit className="text-[50px] p-3 bg-blue-500 rounded-full text-white block lg:hidden" />

            <p className="bg-blue-500 rounded-full text-white py-3 px-5 font-bold hidden lg:block">
              ツイートする
            </p>
          </button>
        </li>
      </ul>

      {/* <div className="mb-4 lg:mr-1">
        <Image
          src={userProfile.profileImg}
          alt="profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div> */}
    </div>
  );
};

export default Sidebar;
