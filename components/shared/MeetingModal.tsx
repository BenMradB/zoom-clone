"use client";
import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type Props = {
  isOpen: boolean;
  title: string;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClose: () => void;
  onClick: () => void;
};

const MeetingModal = ({
  isOpen,
  title,
  buttonText,
  image,
  buttonIcon,
  className,
  children,
  disabled = false,
  onClose,
  onClick,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-6 w-full border-none bg-slate-950 px-6 py-9 sm:max-w-[520px] text-slate-50">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt={image}
                width={72}
                height={72}
                layout="fixed"
              />
            </div>
          )}

          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {" "}
            {title}{" "}
          </h1>

          {children}

          <Button
            className="w-full flex items-center justify-center gap-x-2 bg-primaryColor focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-primaryColor text-slate-50"
            onClick={onClick}
            disabled={disabled}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt={buttonIcon}
                width={17}
                height={17}
                layout="fixed"
              />
            )}
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
