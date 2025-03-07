import { LucideIcon } from "lucide-react";
import { Button } from "react-aria-components";

type Props = {
  onPress: () => void;
  label: string;
  Icon: LucideIcon;
};

export default function ButtonLambda({ onPress, label, Icon }: Props) {
  return (
    <Button
      onPress={onPress}
      aria-label={label}
      className="flex items-center justify-center rounded-full bg-white text-black transition text-nowrap gap-3.5 select-none py-2 px-4 text-lg cursor-pointer hover:scale-103 hover:rotate-3 focus-visible:outline-2 outline-offset-2 outline-yellow-700"
    >
      <Icon size={20} />
      {label}
    </Button>
  );
}
