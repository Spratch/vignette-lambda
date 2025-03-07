import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap"
});

export const anthony = localFont({
  src: "/fonts/Anthony.woff2",
  display: "swap"
});
