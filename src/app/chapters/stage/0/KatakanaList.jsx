"use client";
import katakana from "@/assets/katakana";
import DestructureJSON from "@/components/DestructureJSON";
import useAudio from "@/customHooks/useAudio";
import { useCallback } from "react";

const KatakanaList = () => {
  const { speak } = useAudio();
  const getItemProps = useCallback(
    (item) => {
      return {
        onClick: () => speak(item?.kana),
        title: item?.romaji,
      };
    },
    [speak]
  );
  const handleHeaderClick = (items) => {
    if (Array.isArray(items)) {
      const combinedLetters = items?.map(({ kana }) => kana).join("");
      speak(combinedLetters);
    }
  };
  return (
    <div className="text-white flex flex-wrap gap-2">
      <DestructureJSON
        jsonObj={katakana}
        maxTreeLvl={3}
        finalRendererFn={(item) => item?.kana}
        containerClasses={"flex flex-col gap-2"}
        headerClasses={"text-center bg-white text-6xl text-black my-4 "}
        itemClasses={
          "text-6xl text-white w-fit border rounded-4xl border-white p-4 text-nowrap cursor-pointer"
        }
        itemContainerClasses={"flex justify-around flex-wrap gap-4"}
        getItemProps={getItemProps}
        handleHeaderClick={handleHeaderClick}
      />
      ;
    </div>
  );
};
export default KatakanaList;
