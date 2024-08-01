import React, { FC } from "react";
import { User } from "../Types/User";

type Props = {
  userProfile: User;
};

const TimeLine: FC<Props> = ({ userProfile }) => {
  return (
    <div className="bg-red-300 w-[70%]">
      <h1>TL</h1>
    </div>
  );
};

export default TimeLine;
