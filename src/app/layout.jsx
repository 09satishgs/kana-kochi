import TopHeader from "@/components/TopHeader";
import "./globals.css";
import { GlobalsProvider } from "@/contexts/GlobalsContext";

export const metadata = {
  title: "Kana Kochi",
  description: "Learn Hiragana and Katakana through sound-based games",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen  text-black bg-linear-to-br from-[#0e031e] to-[#0d0043] antialiased">
        <GlobalsProvider>
          <TopHeader />
          {children}
        </GlobalsProvider>
      </body>
    </html>
  );
}
