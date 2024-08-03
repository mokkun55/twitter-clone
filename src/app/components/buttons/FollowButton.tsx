import React, { useState } from "react";


const FollowButton = () => {
  const [isFollow, setIsFollow] = useState<boolean>(true);
  const [isHover, setIsHover] = useState<boolean>(false);
  const clickFollow = () => {
    setIsFollow(!isFollow);
  };

  return (
    <button
      className={`${
        isFollow
          ? isHover
            ? "bg-red-100 border-red text-red-500"
            : "bg-black text-white "
          : "bg-white text-black hover:bg-gray-400/20"
      }  py-1 rounded-full border font-bold h-fit w-[130px] transition-all duration-200`}
      onClick={clickFollow}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isFollow ? (isHover ? "フォロー解除" : "フォロー中") : "フォローする"}
    </button>
  );
};

export default FollowButton;
