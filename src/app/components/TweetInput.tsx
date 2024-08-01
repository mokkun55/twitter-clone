import { Modal } from "@mui/material";
import React, { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { User } from "../Types/User";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userProfile: User;
};

const TweetInput: FC<Props> = ({ isOpen, setIsOpen, userProfile }) => {
  const [postText, setPostText] = useState<string>("");

  const clickSendTweet = () => {
    setIsOpen(false);
    setPostText("");

    // TODO 送信処理
    const sendPost = async () => {};

    sendPost();
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex  justify-center m-16"
    >
      <div className="h-[300px] w-[600px] bg-white rounded-3xl p-2">
        {/* 上の方 */}
        <div>
          <button
            className="hover:bg-gray-100 p-2 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        {/* インプット */}
        <div className="flex mx-2">
          <Image
            src={userProfile?.profileImg ?? ""}
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px] mr-2"
          />
          <div className=" my-4 w-full h-[180px]">
            <p className="text-gray-600">@{userProfile.userId}</p>
            <textarea
              className="resize-none outline-none text-xl w-full h-[150px] p-2"
              placeholder="いまどうしてる？"
              onChange={(e) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <div className="flex">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-full w-fit ml-auto"
                onClick={clickSendTweet}
              >
                ツイートする
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TweetInput;
