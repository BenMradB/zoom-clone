"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export type Props = {
  icon: string;
  title: string;
  subTitle: string;
  className?: string;
  onClick: () => void;
};

const MeetingCard = ({ icon, title, subTitle, className, onClick }: Props) => {
  return (
    <div
      className={cn(
        "w-full cursor-pointer md:w-[270px] h-[250px] rounded-xl text-slate-50 flex flex-col justify-between p-3",
        className
      )}
      onClick={onClick}
    >
      <div className="size-[60px] bg-white/10 flex items-center justify-center rounded-lg">
        <Image
          src={icon}
          alt={icon}
          width={50}
          height={50}
          layout="fixed"
          className="flex-shrink-0 size-[50px]"
        />
      </div>

      <div className="flex flex-col gap-y-1 ">
        <p className="text-4xl md:text-lg lg:text-2xl font-bold">{title}</p>
        <span className="text-sm text-slate-200">{subTitle}</span>
      </div>
    </div>
  );
};

export default MeetingCard;
