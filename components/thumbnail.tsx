import { roboto } from "@/app/fonts";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

type Props = {
  names: {
    background: string;
    foreground: string;
  };
  images: { background: string; foreground: string };
  time: string;
  nextImages: { background: string; foreground: string };
};

export default function Thumbnail({ names, images, time, nextImages }: Props) {
  const MotionImage = motion.create(Image);
  return (
    <div className="border border-white/10 hover:border-white/20 rounded-xl transition shadow-md sm:shadow-sm sm:hover:shadow-lg shadow-yellow-800/50 overflow-hidden aspect-video w-80 sm:w-[30rem] flex flex-col justify-end relative">
      <AnimatePresence mode="wait">
        {images.background && (
          <MotionImage
            key={names.background}
            initial={{ filter: "blur(50px)", opacity: 0.75 }}
            animate={{ scale: [1.02, 1], filter: "blur(0px)", opacity: 1 }}
            exit={{ scale: [1, 0.98], filter: "blur(50px)", opacity: 0.65 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            src={images.background}
            alt={names.background}
            width={500}
            height={300}
            className="h-full w-full object-cover object-top"
          />
        )}
        {images.foreground && (
          <MotionImage
            key={images.foreground + names.foreground}
            initial={{ "--tw-blur": "blur(30px)", opacity: 0.75 }}
            animate={{ x: [-10, 0], "--tw-blur": "blur(0px)", opacity: 1 }}
            exit={{ x: [0, -10], "--tw-blur": "blur(30px)", opacity: 0.65 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            src={images.foreground}
            alt={names.foreground}
            width={300}
            height={300}
            className="absolute top-0 bottom-5 -left-5 h-full w-8/12 sm:w-2xs object-cover object-top drop-shadow-2xl grayscale contrast-125 brightness-90 bg-gradient-to-r from-black via-black/75 to-transparent"
          />
        )}
        <motion.div
          key={"overlay" + time}
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(20px)",
            maskImage:
              "radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%)"
          }}
        ></motion.div>
        <motion.div
          key={names.background + names.foreground}
          initial={{ y: 10, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 10, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex justify-center pb-1.5 sm:pb-3 pt-16 sm:pt-20 px-2 sm:px-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent"
        >
          <p className="uppercase text-sm sm:text-lg text-center leading-tight">
            {names.background !== "Toi" ? "Comprendre" : "Te comprendre"}{" "}
            <span
              className="font-medium text-nowrap"
              style={{ textShadow: "0 0 4px gold" }}
            >
              {names.background}
            </span>
            &nbsp;grâce&nbsp;
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
        </motion.div>
        <motion.div
          key={"time" + time}
          initial={{ filter: "blur(10px)", opacity: 0.5 }}
          animate={{ filter: "blur(0px)", opacity: 0.65 }}
          exit={{ filter: "blur(10px)", opacity: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`${roboto.className} absolute right-2 bottom-2 px-1 py-px bg-white/20 text-2xs sm:text-xs tabular-nums rounded-sm  backdrop-blur-xs font-medium opacity-65 sm:opacity-100`}
        >
          {time}
        </motion.div>
      </AnimatePresence>
      <div
        className="absolute invisible pointer-events-none size-0"
        aria-hidden
      >
        {nextImages.background && (
          <Image
            src={nextImages.background}
            alt=""
            width={500}
            height={300}
          />
        )}
        {nextImages.foreground && (
          <Image
            src={nextImages.foreground}
            alt=""
            width={300}
            height={300}
          />
        )}
      </div>
    </div>
  );
}
