"use client";

import React from "react";
import { PiSmileySadLight } from "react-icons/pi";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();
  return (
    <div className="font-montserrat-regular flex flex-col gap-2 h-[calc(100vh-150px)] justify-center items-center">
      <PiSmileySadLight className="text-7xl xxs:text-8xl" />
      <div className="font-montserrat-medium text-5xl xxs:text-6xl">Error 404</div>
      <div className="text-xl xxs:text-2xl uppercase">Oops! Page not found!</div>
      <div className="flex items-center gap-5 mt-5">
        <button
          onClick={() => router.back()}
          className="border text-xs sm:text-sm flex items-center gap-2 px-7 py-2 rounded-md hover:cursor-pointer"
        >
          <MdOutlineKeyboardBackspace className="text-lg" /> Back
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-[#5F14E0] border border-[#5F14E0] text-xs sm:text-sm flex items-center gap-2 px-9 py-2 text-white rounded-md hover:cursor-pointer font-montserrat-medium"
        >
          Home
        </button>
      </div>
    </div>
  );
}
