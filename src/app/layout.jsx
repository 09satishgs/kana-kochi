import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kana Kochi",
  description: "Learn Japanese Kana through quiz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-screen bg-black overflow-y-auto overflow-x-hidden`}
      >
        <nav className="p-3 flex justify-around bg-gray-500 text-white items-center">
          <Link href={"/"} children={"Home"} />
          <Link href={"/chapters"} children={"Chapters"} />
          <Link href={"/hiragana"} children={"Hiragana"} />
          <Link href={"/katakana"} children={"Katakana"} />
        </nav>
        <div className="p-6">{children}</div>
      </body>
    </html>
  );
}
