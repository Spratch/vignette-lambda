import { roboto } from "@/app/fonts";
import Image from "next/image";

type Props = {
  names: {
    background: string;
    foreground: string;
  };
  images: { background: string; foreground: string };
  time: string;
};

export default function Thumbnail({ names, images, time }: Props) {
  return (
    <div className="border border-white/10 hover:border-white/20 rounded-xl transition shadow-md sm:shadow-sm sm:hover:shadow-lg shadow-yellow-800/50 overflow-hidden aspect-video flex flex-col justify-end relative">
      {images.background && (
        <Image
          src={images.background}
          alt={names.background}
          width={500}
          height={300}
          className="h-full w-80 sm:w-[30rem] object-cover object-top"
          unoptimized
        />
      )}
      {images.foreground && (
        <Image
          src={images.foreground}
          alt={names.foreground}
          width={300}
          height={300}
          className="absolute top-0 bottom-5 -left-5 h-full w-8/12 sm:w-2xs object-cover object-top drop-shadow-2xl grayscale contrast-125 brightness-90 bg-gradient-to-r from-black via-black/75 to-transparent"
          unoptimized
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(20px)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%)"
        }}
      ></div>
      <div className="flex justify-center pb-1.5 sm:pb-3 pt-16 sm:pt-20 px-2 sm:px-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
        <p className="uppercase text-sm sm:text-lg text-center leading-tight">
          Comprendre{" "}
          <span
            className="font-medium"
            style={{ textShadow: "0 0 4px gold" }}
          >
            {names.background}
          </span>{" "}
          grâce&nbsp;
          {names.foreground.startsWith("Les ")
            ? "aux"
            : names.foreground.startsWith("Le ")
              ? "au"
              : "à"}{" "}
          <br />
          <span
            className="pt-0.5 inline-block font-bold text-2xl sm:text-4xl tracking-wide leading-none"
            style={{ textShadow: "0 0 6px gold" }}
          >
            {names.foreground.startsWith("Le ") ||
            names.foreground.startsWith("Les ")
              ? names.foreground.slice(3)
              : names.foreground}
          </span>
        </p>
      </div>
      <div
        className={`${roboto.className} absolute right-2 bottom-2 px-1 py-px bg-white/20 text-2xs sm:text-xs tabular-nums rounded-sm  backdrop-blur-xs font-medium opacity-65 sm:opacity-100`}
      >
        {time}
      </div>
    </div>
  );
}
