"use client";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default AppProvider;
