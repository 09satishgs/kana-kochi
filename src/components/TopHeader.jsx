"use client";

import { useGlobalsContext } from "@/contexts/GlobalsContext";
import BouncingText from "./BounchingText";

const TopHeader = () => {
  const { title, headerVisibility } = useGlobalsContext();

  return (
    headerVisibility && (
      <div className="bg-[#120048] pb-0.5 sticky top-0 left-0 right-0 z-50">
        <div className="animate-clip-wobble text-center text-4xl tracking-widest font-bold py-6 h-fit bg-[#14002f] text-white font-cursive  opacity-50">
          {<BouncingText text={title} />}
        </div>
      </div>
    )
  );
};
export default TopHeader;
