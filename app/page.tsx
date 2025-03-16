"use client";

import { getRandomCombination } from "@/utils/randomizer";
import Thumbnail from "@/components/thumbnail";
import {
  Check,
  Github,
  InfoIcon,
  LinkIcon,
  RefreshCcw,
  Wand
} from "lucide-react";
import { useEffect, useState } from "react";
import { randomTime } from "@/utils/randomTime";
import ButtonLambda from "@/components/button";
import Link from "next/link";
import { basteleur } from "./fonts";
import { useSearchParams } from "next/navigation";
import { background } from "@/utils/background";
import { foreground } from "@/utils/foreground";
import {
  Dialog,
  DialogTrigger,
  Modal,
  ModalOverlay
} from "react-aria-components";

export default function Home() {
  // Default values from url
  const searchParams = useSearchParams();
  const params: { [k: string]: string } = Object.fromEntries(searchParams);

  // Combine background and foreground for names and images
  const [combination, setCombination] = useState({
    background: searchParams.has("invert") ? params.f : params.b || "",
    foreground: searchParams.has("invert") ? params.b : params.f || ""
  });
  const [images, setImages] = useState({
    background: "/background/" + background[params.b] || "",
    foreground: "/foreground/" + foreground[params.f] + ".png" || ""
  });
  const [isInverted, setIsInverted] = useState(false);

  const [time, setTime] = useState("10:05");

  const generateCombination = () => {
    setIsInverted(false);
    const newCombination = getRandomCombination();
    setCombination(newCombination);
    setImages({
      background: "/background/" + background[newCombination.background],
      foreground:
        "/foreground/" + foreground[newCombination.foreground] + ".png"
    });
    setTime(randomTime());
  };

  const invertCombination = () => {
    setCombination({
      background: combination.foreground,
      foreground: combination.background
    });
    setIsInverted((prev) => !prev);
  };

  useEffect(() => {
    if (params.b && params.f) return;
    generateCombination();
  }, [params.b, params.f]);

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
          className="flex items-center justify-center rounded-full bg-white text-black transition-all text-nowrap gap-3.5 select-none py-2 px-4 text-base cursor-pointer hover:scale-103 motion-safe:hover:rotate-3 focus-visible:outline-2 outline-offset-2 outline-yellow-700 pressed:scale-95 pressed:shadow shadow-yellow-200 hover:shadow-md"
          href="https://github.com/Spratch/vignette-lambda"
          target="_blank"
          title="Contribuer sur GitHub"
        >
          <Github size={18} />
          Contribuer sur GitHub
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
            <Modal
              className={`w-full max-w-lg bg-white dark:bg-neutral-800 rounded-xl p-6 overflow-hidden border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100`}
            >
              <Dialog className="outline-none">
                <h2 className="text-2xl font-bold mb-4">À propos</h2>
                <p>
                  Vignette lambda est un générateur de vignettes de vidéos
                  fictives. Les images sont choisies aléatoirement dans une
                  liste pré-établie. Il s'agit d'un petit site pour parodier le
                  genre de vidéos que l'on peut trouver sur YouTube. Rien de
                  plus.
                </p>
                <h3 className="text-xl font-medium mt-3">Images</h3>
                <p>
                  Les images proviennent d'origines diverses, je n'ai aucun
                  droit dessus.{" "}
                  <a
                    href="mailto:legislaturesfr@gmail.com"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    Contactez moi
                  </a>{" "}
                  si vous souhaitez que j'en retire.
                </p>
                <h3 className="text-xl font-medium mt-3">Typographies</h3>
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
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    </section>
  );
}
