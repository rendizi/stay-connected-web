import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stay Connected settings",
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
    data-code="vxsIywd9iuSqNgUFcyFgvdCNGuFGSJIE"></script>
            <link rel="icon" href="/icon(1).png" /> 

      </head>
      <body className={inter.className}>
        {children}
        <div className="max-w-md mx-auto sm:max-w-2xl md:max-w-2/3">
            <ToastContainer/>
        </div>
      </body>
    </html>
  );
}
