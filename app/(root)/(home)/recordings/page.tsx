import { CallList } from "@/components/shared";
import { CallType } from "@/types";
import React from "react";

const RecordingsPage = () => {
  return (
    <div>
      <CallList type={CallType.Records} />
    </div>
  );
};

export default RecordingsPage;
