import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="h-[80px] rounded-md md:rounded-md md:rounded-bl-none px-4 flex items-center justify-between bg-slate-900">
      <div className="flex items-center gap-x-1">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/images/logo.png" alt="logo" />
          <AvatarFallback className="w-12 h-12 rounded-md">
            <Skeleton className="w-12 h-12 rounded-md" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">Zoom</h1>
      </div>

      <div className="flex items-center gap-x-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
