import { CallList } from "@/components/shared";
import { CallType } from "@/types";
import React from "react";

const UpcomingPage = () => {
  return (
    <div>
      <CallList type={CallType.Upcoming} />
    </div>
  );
};

export default UpcomingPage;
