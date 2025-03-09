import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Vignette lambda",
  description: "Générateur de vignettes de vidéos fictives"
};

const jost = Jost({
  subsets: ["latin"],
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
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e0f1dd33-816d-40af-b66c-5531d5d639c9"
        />
      </head>
      <body
        className={`${jost.className}  antialiased bg-gradient-to-tl from-black to-yellow-950 text-white font-jost`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
