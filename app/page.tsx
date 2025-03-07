"use client";

import {
  background,
  foreground,
  getRandomCombination
} from "@/utils/randomizer";
import Thumbnail from "@/components/thumbnail";
import { Github, RefreshCcw, Wand } from "lucide-react";
import { useEffect, useState } from "react";
import { randomTime } from "@/utils/randomTime";
import ButtonLambda from "@/components/button";
import Link from "next/link";
import { anthony } from "./fonts";

export default function Home() {
  const [combination, setCombination] = useState({
    background: "",
    foreground: ""
  });
  const [images, setImages] = useState({ background: "", foreground: "" });
  const [time, setTime] = useState("10:05");

  const generateCombination = () => {
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
  };

  useEffect(() => {
    generateCombination();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-y-28">
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
          {/* <ButtonLambda
            onPress={() => {}}
            label="Copier"
            Icon={Copy}
          /> */}
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
