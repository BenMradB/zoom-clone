"use client";
import React, { useEffect } from "react";
import CallCard from "./CallCard";
import { useGetCalls } from "@/hooks/useGetCalls";
import { CallType } from "@/types";
import Loader from "./Loader";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import Lottie from "lottie-react";
import animationData from "@/public/animations/no-calls.json";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

type Props = {
  type: CallType;
};

const CallList = ({ type }: Props) => {
  const router = useRouter();

  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = React.useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case CallType.Upcoming:
        return upcomingCalls;
      case CallType.Previous:
        return endedCalls;
      case CallType.Records:
        return recordings;

      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        if (callRecordings) {
          const callData = await Promise.all(
            callRecordings.map((call) => call.queryRecordings())
          );

          const records = callData
            .filter((call) => call.recordings.length > 0)
            .flatMap((call) => call.recordings);

          setRecordings(records);
        }
      } catch (error: any) {
        toast({
          title: "Try again later",
        });
      }
    };

    if (type === CallType.Records) {
      fetchRecordings();
    }
  }, [recordings, type, callRecordings]);

  const calls = getCalls();

  if (isLoading) return <Loader />;

  return (
    <div className="w-full h-full ">
      {calls?.length && !isLoading ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {calls?.map((call: Call | CallRecording, index) => (
            <CallCard
              key={index}
              type={type}
              call={call}
              onClick={
                type === CallType.Records
                  ? () => router.push(`${(call as CallRecording).url}`)
                  : () => router.push(`/meeting/${(call as Call).id}`)
              }
              onCopy={() => {
                navigator.clipboard.writeText(
                  type === CallType.Records
                    ? `${(call as CallRecording).url}`
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                        (call as Call).id
                      }`
                );
                toast({
                  title:
                    type === CallType.Records
                      ? "Record Link copied"
                      : "Meeting Link copied",
                });
              }}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <Lottie animationData={animationData} className="h-[400px]" />
          <h2 className="text-3xl md:text-5xl font-bold capitalize">
            {type === CallType.Records
              ? "No recordings available"
              : "No calls available"}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CallList;
