"use client";

import { useGlobalsContext } from "@/contexts/GlobalsContext";
import { useEffect, useState } from "react";

function AnimatedTitle() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <h1 className="text-6xl tracking-widest font-bold text-white flex items-center justify-center">
      Kana Kochi <span className="mx-2">-</span> Learn
      <span
        className={`
          inline-block
          transition-all duration-1500 ease-in-out overflow-hidden mx-2 
          ${revealed ? "opacity-100 w-fit" : "opacity-0 w-0"}
        `}
      >
        the
      </span>
      <span className="mx-2">Right</span>
      {/* Away → way */}
      <span className="inline-flex mx-1">
        <span
          className={`
            inline-block
            transition-all duration-1500 ease-in-out
            ${revealed ? "opacity-0 w-0" : "opacity-100 w-fit"}
          `}
        >
          A
        </span>
      </span>
      <span>way</span>
    </h1>
  );
}

const TopHeader = () => {
  const { title, headerVisibility } = useGlobalsContext();

  return (
    headerVisibility && (
      <div className="bg-white text-white py-1 sticky top-0 left-0 right-0 z-50">
        <div className="text-center text-6xl tracking-widest font-bold py-6 h-28 [clip-path:polygon(0_0,100%_10%,100%_100%,0_90%)] bg-linear-to-r from-[#0d0043] to-[#0e031e]">
          {title || <AnimatedTitle />}
        </div>
      </div>
    )
  );
};
export default TopHeader;
