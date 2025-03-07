import type { Metadata } from "next";
import "./globals.css";
import { Jost, Roboto } from "next/font/google";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Vignette lambda",
  description: "Générateur de vignettes de vidéos fictives"
};

const jost = Jost({
  subsets: ["latin"],
  display: "swap"
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap"
});

const anthony = localFont({
  src: "/fonts/Anthony.woff2",
  display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${jost.className}  antialiased bg-gradient-to-tl from-black to-yellow-950 text-white font-jost`}
      >
        {children}
      </body>
    </html>
  );
}
