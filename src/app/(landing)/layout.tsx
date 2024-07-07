import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stay Connected",
  description: "Summarize instagram stories and get latest info in minutes, not hourse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script defer src="https://api.pirsch.io/pa.js"
    id="pianjs"
    data-code="31jEKw3aG6dreCdq0ZobcTWelRXztm9c"></script>
    <meta name="yandex-verification" content="37f80946b72db249" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
