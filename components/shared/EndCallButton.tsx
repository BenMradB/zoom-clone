"use client";
import { Button } from "@/components/ui/button";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const EndCallButton = () => {
  const router = useRouter();

  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;

  if (!isMeetingOwner) return null;
  return (
    <Button
      onClick={async () => {
        await call?.endCall();
        router.push("/");
      }}
      className="bg-red-500 capitalize font-bold text-slate-50 focus-visible:ring-offset-0 focus-visible:ring-0 hover:bg-red-600"
    >
      Close Meeting
    </Button>
  );
};

export default EndCallButton;
