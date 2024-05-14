"use client";
import { Button } from "@/components/ui/button";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

const MeetingSetup = ({
  setSetupCompleted,
}: {
  setSetupCompleted: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState<boolean>(false);
  const call = useCall();

  if (!call) throw new Error("use Call must be used within a StreamCall");

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera?.disable();
      call?.microphone?.disable();
    } else {
      call?.camera?.enable();
      call?.microphone?.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-slate-50">
      <h1 className="text-3xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <input
          type="checkbox"
          className="h-6 w-6"
          checked={isMicCamToggledOn}
          onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
        />
        <label className="flex items-center gap-2 font-medium">
          Join With Mic and Camera Off
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call.join();
          setSetupCompleted(true);
        }}
        className="bg-primaryColor capitalize font-bold text-slate-50 focus-visible:ring-offset-0 focus-visible:ring-0 hover:bg-primaryColor"
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
