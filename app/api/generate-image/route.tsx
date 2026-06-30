import { background } from "@/utils/background";
import { foreground } from "@/utils/foreground";
import { googleFonts } from "takumi-js/helpers";
import ImageResponse from "takumi-js/response";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = new URL(request.url);
  const params: { [k: string]: string } = Object.fromEntries(searchParams);

  let combination: { background: string; foreground: string };
  let images: { background: string; foreground: string };
  let time: string;
  let isInverted: boolean;

  if (params.b && params.f) {
    isInverted = searchParams.has("invert");
    const bg = isInverted ? params.f : params.b;
    const fg = isInverted ? params.b : params.f;

    combination = {
      background: bg,
      foreground: fg
    };
    images = {
      background: "/background/" + background[params.b],
      foreground: "/foreground/" + foreground[params.f] + ".png"
    };
    time = params.t || "53:00";

    if (!background[params.b] || !foreground[params.f]) {
      return new Response("Invalid theme", { status: 400 });
    }
  } else {
    combination = {
      background: Object.keys(background)[0],
      foreground: Object.keys(foreground)[0]
    };
    images = {
      background: "/background/" + background[combination.background],
      foreground: "/foreground/" + foreground[combination.foreground] + ".png"
    };
    time = params.t || "53:00";

    if (
      !background[combination.background] ||
      !foreground[combination.foreground]
    ) {
      return new Response("Invalid theme", { status: 400 });
    }
  }

  const [bgBuffer, fgBuffer] = await Promise.all([
    fetch(`${url.origin}${images.background}`).then((res) => res.arrayBuffer()),
    fetch(`${url.origin}${images.foreground}`).then((res) => res.arrayBuffer())
  ]);

  return new ImageResponse(
    <div tw="relative text-white flex w-full flex-col justify-end">
      <img
        src="bg-image"
        alt=""
        height={288}
        width={480}
        tw="h-full w-full object-cover object-top"
      />
      <img
        src="fg-image"
        alt=""
        height={288}
        width={288}
        tw="absolute top-0 bottom-5 -left-5 h-full bg-linear-to-r from-black via-black/75 to-transparent object-cover object-top brightness-90 contrast-125 drop-shadow-2xl grayscale w-2xs"
      />
      <div
        tw="absolute inset-0 block"
        style={{
          // backdropFilter: "blur(20px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 100%)"
        }}
      ></div>
      <div tw="absolute right-0 bottom-0 left-0 flex justify-center bg-linear-to-t from-black to-transparent px-6 pt-20 pb-3">
        <p
          style={{ fontFamily: "Jost", fontWeight: 400 }}
          tw="text-center leading-tight uppercase m-0 text-lg"
        >
          {combination.background !== "Toi" ? "Comprendre" : "Te comprendre"}{" "}
          <span
            tw="text-nowrap inline-block"
            style={{ textShadow: "0 0 4px gold", fontWeight: 500 }}
          >
            {combination.background}
          </span>
          &nbsp;grâce&nbsp;
          {combination.foreground.startsWith("Les ")
            ? "aux"
            : combination.foreground.startsWith("Le ")
              ? "au"
              : "à"}{" "}
          <br />
          <span
            tw="inline-block leading-none tracking-wide text-4xl -mt-1.25"
            style={{
              textShadow: "0 0 6px gold",
              fontWeight: 700
            }}
          >
            {combination.foreground.startsWith("Le ") ||
            combination.foreground.startsWith("Les ")
              ? combination.foreground.slice(3)
              : combination.foreground}
          </span>
        </p>
      </div>
      <div
        style={{
          fontFamily: "Roboto",
          fontVariantNumeric: "tabular-nums",
          fontWeight: 500
        }}
        tw={`absolute right-2 bottom-2 rounded-sm bg-white/20 px-1 py-px backdrop-blur-xs text-xs opacity-100`}
      >
        {time}
      </div>
    </div>,
    {
      width: 480,
      height: 288,
      fonts: await googleFonts({
        families: [
          { name: "Jost", weight: [400, 500, 700], style: "normal" },
          { name: "Roboto", weight: [500], style: "normal" }
        ]
      }),
      images: [
        {
          src: "bg-image",
          data: () => Promise.resolve(bgBuffer)
        },
        {
          src: "fg-image",
          data: () => Promise.resolve(fgBuffer)
        }
      ]
    }
  );
}
