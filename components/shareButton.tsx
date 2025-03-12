import { Share } from "lucide-react";
import ButtonLambda from "./button";
import { useToBlob } from "@hugocxl/react-to-image";

export default function ShareButton({
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
          navigator.share({ files: [file] });
        });
    }
  });

  return (
    <div className="hidden max-sm:block">
      <ButtonLambda
        onPress={convert}
        label="Partager"
        Icon={Share}
      />
    </div>
  );
}
