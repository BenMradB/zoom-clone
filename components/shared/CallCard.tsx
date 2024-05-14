"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { CallType } from "@/types";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { cn, formatElapsedTime, getCurrentDateTime } from "@/lib/utils";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

type Props = {
  type: CallType;
  call: Call | CallRecording;
  onClick?: () => void;
  onCopy?: () => void;
};

const CallCard = ({ type, call, onClick, onCopy }: Props) => {
  const [time, fullDate] = getCurrentDateTime(
    (call as Call).state?.startsAt || new Date()
  );
  return (
    <div className="bg-slate-900 min-h-[250px] md:min-h-[200px] rounded-lg p-4 w-full flex flex-col justify-between">
      <div className="flex flex-col gap-y-3">
        <Image src={`/icons/${type}.svg`} width={25} height={25} alt={type} />
        <h2 className="font-bold text-lg">
          {type === CallType.Records
            ? (call as CallRecording).filename.substring(0, 30) + "..." ||
              "No Description"
            : (call as Call).state?.custom.description.substring(0, 30) +
                " ..." || "No Description"}
        </h2>
        {type === CallType.Records ? (
          <div className="w-full flex items-center gap-x-5">
            <p className="text-md md:text-sm lg:text-md text-slate-300">
              <span className="font-bold">Start Time</span> :
              {formatElapsedTime((call as CallRecording).start_time)}
            </p>
            <p className="text-md md:text-sm lg:text-md text-slate-300">
              <span className="font-bold">End Time</span> :{" "}
              {formatElapsedTime((call as CallRecording).end_time)}
            </p>
          </div>
        ) : (
          <div className="w-full flex items-center gap-x-2 text-slate-300">
            <p className="text-md md:text-sm lg:text-md ">{fullDate}</p>
            <span>-</span>
            <p className="text-md md:text-sm lg:text-md ">{time}</p>
          </div>
        )}
      </div>

      <div
        className={`w-full flex flex-col gap-y-2  ${
          type === CallType.Records
            ? "!flex-col"
            : "lg:flex-row lg:items-center lg:justify-between"
        }`}
      >
        {type === CallType.Records ? null : (
          <div className="flex">
            <AnimatedTooltip
              items={people.length < 8 ? people : people.slice(0, 7)}
            />
          </div>
        )}
        {type === CallType.Previous ? null : (
          <div className={"flex items-center gap-x-2"}>
            <Button
              onClick={onClick}
              className="w-full flex items-center justify-center gap-x-3 focus-visible:ring-0 focus-visible:ring-offset-0 bg-primaryColor hover:bg-primaryColor/80 text-slate-50 transition-all duration-300 ease-in-out"
            >
              <Image src="/icons/play.svg" width={20} height={20} alt="play" />
              <p>{type === CallType.Records ? "Play" : "Start"}</p>
            </Button>
            <Button
              onClick={onCopy}
              className="w-full flex items-center justify-center gap-x-3 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white/10 hover:bg-white/5 text-slate-50 transition-all duration-300 ease-in-out"
            >
              <Image src="/icons/copy.svg" width={20} height={20} alt="share" />
              <p>Copy Link</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallCard;
