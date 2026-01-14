"use client";

import ButtonLambda from "@/components/button";
import Thumbnail from "@/components/thumbnail";
import { background } from "@/utils/background";
import { foreground } from "@/utils/foreground";
import { getRandomCombination } from "@/utils/randomizer";
import { randomTime } from "@/utils/randomTime";
import {
  Check,
  Github,
  InfoIcon,
  LinkIcon,
  RefreshCcw,
  Wand
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay
} from "react-aria-components";
import { basteleur } from "./fonts";

export default function Home() {
  // Default values from url
  const searchParams = useSearchParams();
  const params: { [k: string]: string } = Object.fromEntries(searchParams);

  // Combine background and foreground for names and images
  const getInitialState = () => {
    if (params.b && params.f) {
      const isInverted = searchParams.has("invert");
      const bg = isInverted ? params.f : params.b;
      const fg = isInverted ? params.b : params.f;

      return {
        combination: {
          background: bg,
          foreground: fg
        },
        images: {
          background: "/background/" + background[bg],
          foreground: "/foreground/" + foreground[fg] + ".png"
        },
        time: randomTime(),
        isInverted
      };
    } else {
      const newCombination = getRandomCombination();
      return {
        combination: newCombination,
        images: {
          background: "/background/" + background[newCombination.background],
          foreground:
            "/foreground/" + foreground[newCombination.foreground] + ".png"
        },
        time: randomTime(),
        isInverted: false
      };
    }
  };

  const initialState = getInitialState();
  const [combination, setCombination] = useState(initialState.combination);
  const [images, setImages] = useState(initialState.images);
  const [isInverted, setIsInverted] = useState(initialState.isInverted);
  const [time, setTime] = useState(initialState.time);

  // Generate next combination
  const [nextCombination, setNextCombination] = useState(() =>
    getRandomCombination()
  );
  const [nextImages, setNextImages] = useState(() => {
    return {
      background: "/background/" + background[nextCombination.background],
      foreground:
        "/foreground/" + foreground[nextCombination.foreground] + ".png"
    };
  });

  const generateCombination = () => {
    setIsInverted(false);
    setCombination(nextCombination);
    setImages(nextImages);
    setTime(randomTime());

    const newNextCombination = getRandomCombination();
    setNextCombination(newNextCombination);
    setNextImages({
      background: "/background/" + background[newNextCombination.background],
      foreground:
        "/foreground/" + foreground[newNextCombination.foreground] + ".png"
    });
  };

  const invertCombination = () => {
    setCombination({
      background: combination.foreground,
      foreground: combination.background
    });
    setIsInverted((prev) => !prev);
  };

  const getUrl = () => {
    const sharedParams: Record<string, string> = {
      b: !isInverted ? combination.background : combination.foreground,
      f: !isInverted ? combination.foreground : combination.background
    };
    const url =
      process.env.NEXT_PUBLIC_HOST +
      "/?b=" +
      encodeURI(sharedParams.b) +
      "&f=" +
      encodeURI(sharedParams.f) +
      (isInverted ? "&invert" : "");
    return url;
  };

  const [isCopied, setIsCopied] = useState(false);
  const copyUrl = () => {
    navigator.clipboard.writeText(getUrl());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const MotionModal = motion.create(Modal);

  return (
    <section className="flex flex-col items-center justify-evenly h-dvh">
      <h1
        className={`${basteleur.className} text-center leading-none`}
        style={{
          textShadow: "0 0 2rem var(--color-yellow-800)"
        }}
      >
        <span className="text-4xl sm:text-6xl">Vignette</span>
        <br />
        <span className="text-3xl sm:text-5xl -mt-4 inline-block -rotate-3">
          lambda
        </span>
      </h1>

      <div className="flex flex-col gap-y-8 items-center">
        <Thumbnail
          names={combination}
          images={images}
          time={time}
          nextImages={nextImages}
        />
        <div className="flex gap-x-2 gap-y-2 flex-wrap items-center justify-center">
          <ButtonLambda
            onPress={generateCombination}
            label="Générer une nouvelle vignette"
            Icon={Wand}
          />
          <ButtonLambda
            onPress={invertCombination}
            label="Inverser"
            Icon={RefreshCcw}
          />
          <ButtonLambda
            onPress={copyUrl}
            label={isCopied ? "Copié !" : "Copier le lien"}
            Icon={isCopied ? Check : LinkIcon}
            text={false}
          />
        </div>
      </div>
      <div className="flex gap-4 opacity-80">
        <Link
          className="flex items-center justify-center rounded-full bg-white text-black transition-all text-nowrap gap-3.5 select-none p-3 text-base cursor-pointer hover:scale-103 motion-safe:hover:rotate-3 focus-visible:outline-2 outline-offset-2 outline-yellow-700 pressed:scale-95 pressed:shadow shadow-yellow-200 hover:shadow-md"
          href="https://github.com/Spratch/vignette-lambda"
          target="_blank"
          title="Contribuer sur GitHub"
        >
          <Github size={18} />
        </Link>
        <DialogTrigger>
          <ButtonLambda
            label="À propos"
            text={false}
            onPress={() => {}}
            Icon={InfoIcon}
          />
          <ModalOverlay
            isDismissable
            className={`fixed inset-0 z-50 bg-black/25 flex items-center justify-center p-4 backdrop-blur`}
          >
            <MotionModal
              key={"modal"}
              initial={{ opacity: 0.5, scale: 0.95, translateY: 50 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`w-full max-w-lg bg-white dark:bg-neutral-800 rounded-xl p-6 overflow-hidden border origin-bottom border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
            >
              <Dialog className="outline-none">
                <h2 className="text-3xl uppercase mb-2 font-basteleur">
                  À propos
                </h2>
                <p>
                  Vignette lambda est un générateur de vignettes de vidéos
                  fictives. Les images sont choisies aléatoirement dans une
                  liste pré-établie. Il s&apos;agit d&apos;un petit site pour
                  parodier le genre de vidéos que l&apos;on peut trouver sur
                  YouTube. Rien de plus.
                </p>
                <h3 className="text-xl mt-3 font-basteleur">Images</h3>
                <p>
                  Les images proviennent d&apos;origines diverses, je n&apos;ai
                  aucun droit dessus.{" "}
                  <a
                    href="mailto:legislaturesfr@gmail.com"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    Contactez moi
                  </a>{" "}
                  si vous souhaitez que j&apos;en retire.
                </p>
                <h3 className="text-xl mt-3 font-basteleur">Typographies</h3>
                <p>
                  Basteleur par Keussel. Distribué par{" "}
                  <a
                    href="https://velvetyne.fr/fonts/basteleur/"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    velvetyne.fr
                  </a>
                  .
                </p>
                <p>
                  Jost par Owen Earl. Distribué par{" "}
                  <a
                    href="https://fonts.google.com/specimen/Jost"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    Google Fonts
                  </a>
                  .
                </p>
              </Dialog>
            </MotionModal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    </section>
  );
}
