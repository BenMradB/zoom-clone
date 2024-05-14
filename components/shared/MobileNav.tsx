"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { routes } from "@/lib/data";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const MobileNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname.toLowerCase().trim() === href.toLowerCase().trim();
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button className="size-[35px] bg-transparent hover:bg-white-5 border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 flex items-center justify-center">
          <MenuIcon size={30} className="flex-shrink-0 text-slate-50" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col gap-y-10 bg-slate-900"
      >
        <div className="flex items-center gap-x-1">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/images/logo.png" alt="logo" />
            <AvatarFallback className="w-12 h-12 rounded-md">
              <Skeleton className="w-12 h-12 rounded-md" />
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">Zoom</h1>
        </div>
        <div className="w-full flex flex-col gap-y-5">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={` 
            w-full h-[40px] px-3 py-6 rounded-md flex items-center gap-x-5 
            ${
              isActive(route.href)
                ? "bg-gradient-to-l from-primaryColor via-primaryColor/80 to-primaryColor/80 "
                : "bg-transparent "
            }
            hover:bg-gradient-to-l from-primaryColor via-primaryColor/80 to-primaryColor/80 
            transition-all duration-700 ease-in-out
          `}
            >
              <Image
                src={route.icon}
                alt={route.label}
                width={30}
                height={30}
                layout="fixed"
                className=""
              />
              <p className="text-slate-50 font-bold text-lg ">
                {" "}
                {route.label}{" "}
              </p>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
