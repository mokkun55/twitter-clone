import React, { FC, useState } from "react";
import { User } from "../Types/User";
import Image from "next/image";
import TLHeader from "./TLHeader";

type Props = {};

const TimeLine: FC<Props> = () => {
  // home ↔ all
  const [TLMode, setTLMode] = useState<string>("home");

  return (
    <div className="w-[70%] border-x ">
      <TLHeader TLMode={TLMode} setTLMode={setTLMode} />

      {/* ツイート */}
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
      <div className="hover:bg-slate-50 border w-full p-4">
        <div className="flex items-start">
          <Image
            src="/ico.jpg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full w-[50px] h-[50px]"
          />

          <div className="flex mt-1 ml-2">
            <p className="font-bold">ほげお</p>
            <p className="text-gray-500">@hoge・昨日</p>
          </div>
        </div>

        <div className="ml-[55px] mt-[-20px]">
          <p>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
