"use client";

import KanaCard from "@/components/KanaCard";
import { tailwindClass } from "@/constants";
import { useNav } from "@/hooks/useNav";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const LearnKanaClient = ({ data }) => {
  const { navigate } = useNav();
  const pathname = usePathname();
  const groupedArray = useMemo(() => {
    const groupedObj = Object.groupBy(data, ({ row }) => row);
    return Object.entries(groupedObj);
  }, [data]);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 sm:p-10">
      <div className="flex flex-col gap-12">
        {groupedArray?.map(([heading, kanas], index) => {
          return (
            <div key={"section-" + heading + "-" + index} className="w-full">
              {/* --- Stylized Row Header --- */}
              <div className="flex items-center gap-6 mb-8">
                {/* Left decorative fade */}
                <div className="h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent w-16 sm:w-24 opacity-50" />

                <h2 className="text-2xl sm:text-3xl font-light text-white tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {heading}
                </h2>

                {/* Right decorative line (fills remaining space) */}
                <div className="h-px bg-linear-to-r from-cyan-500/50 to-transparent flex-1 opacity-30" />
              </div>

              {/* --- The Grid --- */}
              <div className="grid grid-cols-5 gap-3 sm:gap-6 lg:gap-8">
                {kanas?.map((kana) => (
                  <div
                    key={kana?.id}
                    className={`${
                      tailwindClass.COL_ST[+kana?.column + 1]
                    } col-span-1`}
                  >
                    <KanaCard
                      kana={kana?.char}
                      romaji={kana?.romaji}
                      mode="practice"
                      href={`${pathname}?kana=${kana?.char}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LearnKanaClient;
