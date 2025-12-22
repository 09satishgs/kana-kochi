"use client";

import Character from "@/components/Character";
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
    <div className="p-10">
      <div className="">
        {groupedArray?.map(([heading, kanas], index) => {
          return (
            <div key={"romaji-" + heading + "-" + index}>
              <div className="text-2xl text-white text-center py-4 uppercase border-y-2 my-4 bg-black/25">
                {heading}
              </div>
              <div className="grid grid-cols-5 gap-10">
                {kanas?.map((kana) => (
                  <Character
                    key={kana?.id}
                    value={kana?.char}
                    onClick={() => navigate(pathname + `?kana=${kana?.char}`)}
                  />
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
