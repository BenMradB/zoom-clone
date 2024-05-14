"use client";
import { Loader, MeetingRoom, MeetingSetup } from "@/components/shared";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const MeetingPage = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(params.id);

  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);

  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!setupCompleted ? (
            <MeetingSetup setSetupCompleted={setSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
