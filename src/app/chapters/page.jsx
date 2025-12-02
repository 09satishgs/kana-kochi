"use client";
import { OPTIONS } from "./helpers";
import useNav from "@/customHooks/useNav";

const Chapters = () => {
  const navigate = useNav();
  return (
    <div className="flex flex-wrap gap-6 justify-around">
      {OPTIONS.map((opt) => (
        <div
          key={opt?.id}
          onClick={() => navigate(opt?.navTo)}
          className="cursor-pointer bg-linear-to-br from-[#5A00FF] via-[#0030FF] to-[#00C4FF] rounded-2xl shadow-[0_0_15px_rgba(0,180,255,0.5)] p-6 text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,200,255,0.8)] hover:scale-[1.02] min-h-[180px] flex-1 max-w-1/2 min-w-1/3 flex-col items-center"
        >
          {/* Title */}
          <h2 className="text-2xl font-semibold tracking-wide mb-4 text-nowrap">
            {opt?.title}
          </h2>
          {/* Divider */}
          <div className="w-full h-0.5 bg-white/30 mb-4"></div>
          {/* Description */}
          <p className="text-sm text-white/80 leading-relaxed grow">
            {opt?.description}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Chapters;
