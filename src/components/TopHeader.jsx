"use client";

import { useGlobalsContext } from "@/contexts/GlobalsContext";
import AnimatedSplitTitle from "./AnimatedSplitTitle";

const TopHeader = () => {
  const { title, headerVisibility } = useGlobalsContext();

  return (
    headerVisibility && (
      <div className="bg-white pb-0 sticky top-0 left-0 right-0 z-50">
        <div className="animate-clip-wobble text-center text-4xl tracking-widest font-bold py-6 h-fit bg-black text-white font-cursive">
          <AnimatedSplitTitle text={title} />
        </div>
      </div>
    )
  );
};
export default TopHeader;
