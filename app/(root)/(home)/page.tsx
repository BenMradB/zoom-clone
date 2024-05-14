import { HomeMeetingsCards } from "@/components/shared";
import { getCurrentDateTime } from "@/lib/utils";
import React from "react";

const HomePage = () => {
  const [time, fullDate] = getCurrentDateTime(new Date());
  return (
    <section className="w-full h-full flex flex-col gap-y-3">
      <div className=" h-[300px] w-full rounded-xl bg-hero object-cover px-3 py-6 flex flex-col justify-between">
        <div className="w-fit  bg-white/5 rounded-md px-4 py-2 text-sm">
          Upcoming Meeting at : 10:00 AM
        </div>

        <div className="flex flex-col gap-y-2">
          <h2 className=" text-slate-50 font-bold">
            <p className="text-4xl md:ext-7xl">{time}</p>
          </h2>
          <p className="font-semibold text-lg text-[#C9DDFF] pl-1">
            {fullDate}
          </p>
        </div>
      </div>
      <HomeMeetingsCards />
    </section>
  );
};

export default HomePage;
