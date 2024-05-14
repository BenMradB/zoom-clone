import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full min-h-[50px] bg-slate-900 px-6 py-2 flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between rounded-md md:rounded-md md:rounded-tl-none">
      <div className="flex items-center gap-x-1">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/images/logo.png" alt="logo" />
          <AvatarFallback className="w-12 h-12 rounded-md">
            <Skeleton className="w-12 h-12 rounded-md" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">Zoom</h1>
      </div>

      <div className="flex flex-col gap-y-1 md:flex-row md:items-center md:gap-x-3">
        <Button className="py-1 w-full h-fit bg-transparent flex items-center gap-x-1 justify-start p-0 opacity-80 hover:opacity-100 hover:bg-black md:justify-center md:bg-black md:w-fit md:px-3 md:py-2">
          <Image
            src="/icons/github.svg"
            alt="github"
            width={30}
            height={30}
            className="size-[48px] md:size-[30px] flex-shrink-0"
          />
          <p className="text-sm font-bold text-slate-50">Github Code</p>
        </Button>
        <Button className="py-1 group w-full h-fit bg-transparent flex items-center gap-x-1 justify-start p-0 opacity-80 hover:opacity-100 hover:bg-black md:justify-center md:bg-black md:w-fit md:px-3 md:py-2">
          <Image
            src="/icons/star.svg"
            alt="star"
            width={30}
            height={30}
            className="size-[40px] md:size-[30px] flex-shrink-0"
          />
          <p className="text-sm font-bold text-slate-50">Give It Star</p>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
