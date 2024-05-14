"use client";
import { routes } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname.toLowerCase().trim() === href.toLowerCase().trim();
  return (
    <div
      className="hidden sm:24 lg:w-72 bg-slate-900 overflow-y-auto px-4 py-8 sm:flex flex-col gap-y-8 "
      style={{
        minHeight: "calc(100vh - 130px)",
      }}
    >
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
          <p className="text-slate-50 font-bold text-lg hidden lg:block">
            {" "}
            {route.label}{" "}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
