import React, { FC } from "react";

type Props = {
  TLMode: string;
  setTLMode: (mode: string) => void;
};

const TLHeader: FC<Props> = ({ TLMode, setTLMode }) => {
  const toggleMode = () => {
    if (TLMode === "home") {
      setTLMode("all");
    } else {
      setTLMode("home");
    }
  };
  return (
    <div className="sticky top-0 bg-white">
      <div className="flex justify-between items-center border-b p-4">
        <div>
          <p className="font-bold text-xl">
            {TLMode === "home" ? "ホーム" : "すべて"}
          </p>
        </div>
        <div>
          <button
            className="text-blue-500 p-2 rounded hover:bg-gray-50"
            onClick={toggleMode}
          >
            {TLMode === "home" ? "すべて" : "ホーム"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TLHeader;
