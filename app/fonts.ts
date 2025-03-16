import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap"
});

export const basteleur = localFont({
  src: "/fonts/Basteleur-Bold.woff2",
  display: "swap"
});
