import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stay Connected auth",
  description: "Login or create a new account in stay-connected and get 100 summarizes for free",
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
      </head>
      <body className={inter.className}>{children}
        <ToastContainer/>
      </body>
    </html>
  );
}
