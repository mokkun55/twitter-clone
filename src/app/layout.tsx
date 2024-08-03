import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "./provider/AppProvider";

export const metadata: Metadata = {
  title: "Twitter",
  description: "twitter-clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={"font-ibm"}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
