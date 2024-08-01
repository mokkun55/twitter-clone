"use client";

import { User } from "@/app/Types/User";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useLoginUser = () => {
  console.log("useLoginUser");

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [user] = useAuthState(auth);

  const getUserProfile = async () => {
    if (!user) return;
    const profileRef = doc(db, "users", user.uid);
    const profileSnap = await getDoc(profileRef);
    setUserProfile(profileSnap.data() as User);
  };

  return { userProfile, getUserProfile };
};

export default useLoginUser;
