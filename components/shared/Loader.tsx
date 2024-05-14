import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center bg-white/10 ">
      <Loader2 className="animate-spin text-primaryColor " size={50} />
    </div>
  );
};

export default Loader;
