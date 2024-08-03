"use client";

import { User } from "@/app/Types/User";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { loginUserProfile } from "@/app/globalState";

const useLoginUser = () => {
  const [userProfile, setUserProfile] = useRecoilState(loginUserProfile);
  const [user] = useAuthState(auth);

  const getUserProfile = async () => {
    console.count("getUserProfile");
    if (!user) return;
    const profileRef = doc(db, "users", user.uid);
    const profileSnap = await getDoc(profileRef);
    setUserProfile(profileSnap.data() as User);
  };

  return { getUserProfile };
};

export default useLoginUser;
