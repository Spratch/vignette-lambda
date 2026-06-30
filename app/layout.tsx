import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { jost } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vignette lambda",
  description: "Générateur de vignettes de vidéos fictives",
  openGraph: {
    url: `https://${process.env.NEXT_PUBLIC_HOST}/`
  }
};

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
        className={`${jost.className} overscroll-none  antialiased bg-gradient-to-tl from-black to-yellow-950 text-white font-jost`}
      >
        <Suspense>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
