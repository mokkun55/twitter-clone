"use client";

import Link from "next/link";
import React, { useEffect } from "react";

function Page() {
  useEffect(() => {
    // データ取得
  }, []);
  return (
    <div>
      <div className="text-blue-700 underline">
        <Link href="login">ログイン</Link>
        <br />
        <Link href="signup">サインアップ</Link>
      </div>

      <div>
        <h1>ユーザー情報</h1>
        <p>ユーザーID(自動): </p>
        <p>ユーザーID(任意): </p>
        <p>ユーザー名: </p>
      </div>
    </div>
  );
}

export default Page;
