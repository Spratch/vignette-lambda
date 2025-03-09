"use client";

import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "react-aria-components";

type Props = {
  onPress: () => void;
  label: string;
  Icon: LucideIcon;
};

export default function ButtonLambda({ onPress, label, Icon }: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    onPress();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <Button
      onPress={handleClick}
      aria-label={label}
      className="flex items-center justify-center rounded-full bg-white text-black transition-all text-nowrap gap-3.5 select-none py-2 px-4 text-lg cursor-pointer hover:scale-103 motion-safe:hover:rotate-3 focus-visible:outline-2 outline-offset-2 outline-yellow-700 pressed:scale-95 pressed:shadow shadow-yellow-200 hover:shadow-md"
    >
      <Icon
        size={20}
        className={
          isClicked
            ? Icon.displayName === "Wand"
              ? "animate-wand origin-left"
              : Icon.displayName === "RefreshCcw"
                ? "animate-invert"
                : ""
            : ""
        }
      />
      {label}
    </Button>
  );
}
