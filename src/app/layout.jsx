import TopHeader from "@/components/TopHeader";
import "./globals.css";
import { GlobalsProvider } from "@/contexts/GlobalsContext";
import FloatingNav from "@/components/FloatingNav";
import { LEFT_NAV_CONFIG } from "@/data/navConfig";
import WelcomeUser from "@/components/WelcomeUser";
import BackendSyncGate from "@/components/BackendSyncGate";

export const metadata = {
  title: "Kana Kochi",
  description: "Learn Hiragana and Katakana through sound-based games",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-auto text-black bg-linear-to-br from-black to-[#000b0a] antialiased">
        <GlobalsProvider>
          <TopHeader />
          <FloatingNav
            config={LEFT_NAV_CONFIG}
            position="top-1/2 left-4 -translate-y-1/2"
          />
          <div className="px-20">{children}</div>
          <WelcomeUser />
          <BackendSyncGate />
        </GlobalsProvider>
      </body>
    </html>
  );
}
