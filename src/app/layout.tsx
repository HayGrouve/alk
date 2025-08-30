import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "a-el-key - Очаквайте ни скоро",
  description:
    "a-el-key - Ръчно изработени мебели по поръчка в София. Очаквайте ни скоро с нещо изключително.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" className={`${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
