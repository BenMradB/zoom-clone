"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { Check, Eye, LayoutList, Users } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
const MeetingRoom = () => {
  const searchParams = useSearchParams();

  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState<boolean>(false);
  const { useCallCallingState } = useCallStateHooks();

  const callState = useCallCallingState();

  const isPersonalRoom = !!searchParams.get("personal");

  if (callState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-slate-50">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px]">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            block: showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="size-[40px] bg-transparent hover:bg-slate-900 rounded-full flex items-center justify-center">
              <LayoutList
                className="text-slate-50 cursor-pointer flex-shrink-0"
                size={20}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {["grid", "speaker-left", "speaker-right"].map((view, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setLayout(view as CallLayoutType)}
                className={`cursor-pointer ${
                  layout === view ? "bg-slate-900" : ""
                }`}
              >
                <span className="capitalize">{view.split("-").join(" ")}</span>
                <DropdownMenuShortcut>
                  {layout === view && (
                    <Check size={15} className="text-slate-50" />
                  )}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <Button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="size-[40px] bg-transparent hover:bg-slate-900 rounded-full flex items-center justify-center"
        >
          <Users size={20} className="text-slate-50 flex-shrink-0" />
        </Button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
