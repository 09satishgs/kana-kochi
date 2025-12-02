"use client";
import hiragana from "@/assets/hiragana";
import DestructureJSON from "@/components/DestructureJSON";
import useAudio from "@/customHooks/useAudio";
import { useCallback } from "react";

const HiraganaList = () => {
  const { speak } = useAudio();
  const getItemProps = useCallback(
    (item) => {
      return {
        onClick: () => speak(item?.char),
        title: item?.romaji,
      };
    },
    [speak]
  );
  const handleHeaderClick = (items) => {
    if (Array.isArray(items)) {
      const combinedLetters = items?.map(({ char }) => char).join("");
      speak(combinedLetters);
    }
  };
  return (
    <div className="text-white flex flex-wrap gap-2">
      <DestructureJSON
        jsonObj={hiragana}
        maxTreeLvl={3}
        finalRendererFn={(item) => item?.char}
        containerClasses={"flex flex-col gap-2"}
        headerClasses={"text-center bg-white text-6xl text-black my-4 "}
        itemClasses={
          "text-6xl text-white w-fit border rounded-4xl border-white p-4 text-nowrap cursor-pointer"
        }
        itemContainerClasses={"flex justify-around flex-wrap gap-4"}
        getItemProps={getItemProps}
        handleHeaderClick={handleHeaderClick}
        treeLvl={0}
      />
      ;
    </div>
  );
};
export default HiraganaList;
