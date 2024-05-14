import { CallList } from "@/components/shared";
import { CallType } from "@/types";
import React from "react";

const PreviousPage = () => {
  return (
    <div>
      {" "}
      <CallList type={CallType.Previous} />
    </div>
  );
};

export default PreviousPage;
