"use client";

import { useGlobals } from "@/contexts/GlobalsContext";

const TopHeader = () => {
  const { title } = useGlobals();

  return (
    <div className="bg-white text-white pb-1 sticky top-0 left-0 right-0 z-50">
      <div className="text-center text-6xl tracking-widest font-bold py-6 h-32 [clip-path:polygon(0_0,100%_0,100%_100%,0_80%)] bg-linear-to-r from-[#0d0043] to-[#0e031e]">
        {title}
      </div>
    </div>
  );
};
export default TopHeader;
