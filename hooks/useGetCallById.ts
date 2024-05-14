import { toast } from "@/components/ui/use-toast";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState<boolean>(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id,
          },
        });

        if (calls.length) setCall(calls[0]);

        setIsCallLoading(false);
      } catch (error: any) {
        toast({
          title: "Try again later",
        });
      }
    };

    loadCall();
  }, [call, id, client]);

  return { call, isCallLoading };
};
