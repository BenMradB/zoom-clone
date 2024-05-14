"use client";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import { Input } from "../ui/input";

const HomeMeetingsCards = () => {
  const router = useRouter();
  const user = useUser();
  const client = useStreamVideoClient();

  const { toast } = useToast();

  const [joinMeetingLink, setJoinMeetingLink] = useState<string>("");
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [meetingState, setMeetingState] = useState<
    "isScheduledMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime)
        return toast({
          title: "Please select a date and time",
          variant: "destructive",
        });

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Error creating meeting");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${id}`);
      }

      toast({
        title: "Meeting Created",
      });
    } catch (error: any) {
      console.log("Error creating meeting", error.message);

      toast({
        title: "Failed to create meeting",
        variant: "destructive",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6">
      <MeetingCard
        icon="/icons/new-room.svg"
        className="bg-[#FF742E]"
        title="New Meeting"
        subTitle="Start a new meeting"
        onClick={() => setMeetingState("isInstantMeeting")}
      />
      <MeetingCard
        icon="/icons/link.svg"
        className="bg-primaryColor"
        title="Join Meeting"
        subTitle="Via invitation link"
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
      <MeetingCard
        icon="/icons/upcoming.svg"
        className="bg-[#830EF9]"
        title="Schedule Meeting"
        subTitle="Plan your meeting"
        onClick={() => setMeetingState("isScheduledMeeting")}
      />
      <MeetingCard
        icon="/icons/records.svg"
        className="bg-[#F9A90E]"
        title="View Recordings"
        subTitle="Meeting recordings"
        onClick={() => router.push("/recordings")}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          title="Schedule A Meeting"
          buttonText="Schedule"
          onClose={() => setMeetingState(undefined)}
          disabled={!values.dateTime || !values.description}
          onClick={createMeeting}
        >
          <div className="w-full flex flex-col gap-y-3">
            <div className="w-full flex flex-col gap-y-2">
              <Label className="text-slate-100 font-normal">
                Add A Description
              </Label>
              <Textarea
                className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-slate-900 border-none"
                onChange={(e) =>
                  setValues((curr) => ({
                    ...curr,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <Label className="text-slate-100 font-normal">
                Pick Date & Time
              </Label>
              <DatePicker
                selected={values.dateTime}
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                className="w-full py-2 px-2 bg-slate-900 border-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded-lg"
                onChange={(date) =>
                  setValues((curr) => ({ ...curr, dateTime: date! }))
                }
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduledMeeting"}
          className="text-center"
          title="Meeting Created"
          image="/icons/success.svg"
          buttonIcon={isLinkCopied ? "/icons/copied.svg" : "/icons/copy.svg"}
          buttonText="Copy Meeting Link"
          onClose={() => setMeetingState(undefined)}
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            setIsLinkCopied(true);
            toast({
              title: "Link Copied",
            });
          }}
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        className="text-center"
        title="Start An Instant Meeting"
        buttonText="Start Meeting"
        onClose={() => setMeetingState(undefined)}
        onClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        title="Join A Meeting"
        buttonText="Join Now"
        onClose={() => setMeetingState(undefined)}
        onClick={() => router.push(joinMeetingLink)}
        disabled={!joinMeetingLink}
      >
        <Input
          placeholder="Enter Meeting Link"
          className="
            bg-slate-900 border-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none rounded-lg
          "
          value={joinMeetingLink}
          onChange={(e) => setJoinMeetingLink(e.target.value)}
        />
      </MeetingModal>
    </section>
  );
};

export default HomeMeetingsCards;
