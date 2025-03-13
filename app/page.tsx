"use client";

import { getRandomCombination } from "@/utils/randomizer";
import Thumbnail from "@/components/thumbnail";
import { Check, Github, LinkIcon, RefreshCcw, Wand } from "lucide-react";
import { useEffect, useState } from "react";
import { randomTime } from "@/utils/randomTime";
import ButtonLambda from "@/components/button";
import Link from "next/link";
import { anthony } from "./fonts";
import { useSearchParams } from "next/navigation";
import { background } from "@/utils/background";
import { foreground } from "@/utils/foreground";

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
        className={`${anthony.className} text-center leading-none`}
        style={{ textShadow: "0 0 2rem var(--color-yellow-800)" }}
      >
        <span className="text-6xl sm:text-8xl">Vignette</span>
        <br />
        <span className="text-5xl sm:text-7xl -mt-2 inline-block">lambda</span>
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
      <div className="bg-white rounded-full">
        <Link
          className="h-9 px-3 gap-2 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center cursor-pointer text-black/50 hover:text-black transition-all"
          href="https://github.com/Spratch/vignette-lambda"
          target="_blank"
          title="Contribuer sur GitHub"
        >
          <Github size={18} />
          Contribuer sur GitHub
        </Link>
      </div>
    </section>
  );
}
