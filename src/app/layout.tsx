import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head"; 

import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stay Connected",
  description: "Summarize Instagram stories and get latest info in minutes, not hours",
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
    data-code="vxsIywd9iuSqNgUFcyFgvdCNGuFGSJIE"></script>        <meta name="yandex-verification" content="37f80946b72db249" />
        <link rel="icon" href="icon(1).png" /> 
      </head>
      <body className={inter.className}>
        <GoogleOAuthProvider 
          clientId="612984225496-qfebmu4kv30no0c1absoje1g286mn805.apps.googleusercontent.com"
>
<Suspense>
          {children}
          </Suspense>
        </GoogleOAuthProvider>
        <ToastContainer />
        </body>
    </html>
  );
}
