"use client";

import { Check, Copy } from "lucide-react";
import ButtonLambda from "./button";
import { useToBlob } from "@hugocxl/react-to-image";
import { useState } from "react";

export default function CopyButton({
  combination
}: {
  combination: { background: string; foreground: string };
}) {
  const [_, convert] = useToBlob<HTMLDivElement>({
    selector: ".aspect-video",
    onSuccess: async (data) => {
      if (!data) return;
      // Transform blob to png then copy to clipboard
      const url = URL.createObjectURL(data);
      await fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File(
            [blob],
            `${combination.background}-${combination.foreground}.png`,
            {
              type: "image/png"
            }
          );
          const item = new ClipboardItem({ "image/png": file });
          navigator.clipboard.write([item]);
        });
    }
  });

  // Handle success state
  const [hasCopied, setHasCopied] = useState(false);
  const handleCopy = () => {
    convert();
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  return (
    <div className="max-sm:hidden">
      <ButtonLambda
        onPress={handleCopy}
        label={!hasCopied ? "Copier" : "Copié"}
        Icon={!hasCopied ? Copy : Check}
      />
    </div>
  );
}
