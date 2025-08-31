import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Erling Munguia — Software Developer",
  description:
    "Portfolio of Erling Munguia: Software Developer & Automation Engineer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
      >
        <Navbar />
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
        <Footer />
      </body>
    </html>
  );
}
