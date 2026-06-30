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
    <div className="relative flex aspect-video w-80 flex-col justify-end overflow-hidden rounded-xl border border-white/10 shadow-md shadow-yellow-800/50 transition hover:border-white/20 sm:w-120 sm:shadow-sm sm:hover:shadow-lg">
      <AnimatePresence mode="wait">
        <>
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
              className="absolute top-0 bottom-5 -left-5 h-full w-8/12 bg-linear-to-r from-black via-black/75 to-transparent object-cover object-top brightness-90 contrast-125 drop-shadow-2xl grayscale sm:w-2xs"
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
            className="absolute right-0 bottom-0 left-0 flex justify-center bg-linear-to-t from-black to-transparent px-2 pt-16 pb-1.5 sm:px-6 sm:pt-20 sm:pb-3"
          >
            <p className="text-center text-sm leading-tight uppercase sm:text-lg">
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
                className="inline-block pt-0.5 text-2xl leading-none font-bold tracking-wide sm:text-4xl"
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
            className={`${roboto.className} text-2xs absolute right-2 bottom-2 rounded-sm bg-white/20 px-1 py-px font-medium tabular-nums opacity-65 backdrop-blur-xs sm:text-xs sm:opacity-100`}
          >
            {time}
          </motion.div>
        </>
      </AnimatePresence>
      <div
        className="pointer-events-none invisible absolute size-0"
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
