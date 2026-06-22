import Link from "next/link";
import React from "react";
import { useGetMe } from "../features/user/matches-connections/hooks/users.hooks";

const Avatar = () => {
    const { data, isLoading } = useGetMe();
     if (isLoading) {
       return <h1>Loading...</h1>;
     }
  return (
    <Link href={"/profile"}>
      <div className="h-10 w-10 rounded-full bg-[#0f6e56] flex items-center justify-center text-white font-bold text-sm">
        <img className="w-full h-full object-cover rounded-full border-1 border-green-200 shadow-xl" src={data?.data?.avatarUrl} alt="" />
      </div>
    </Link>
  );
};

export default Avatar;
