"use client";

import { useEffect, useRef, useState } from "react";

export default function KanaVideo({ src, isExpanded }) {
  const videoRef = useRef(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  return (
    <div
      className={`transition-all duration-300 ease-in-out flex flex-col items-center gap-2`}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full"
      />
      <div className="w-full px-2  z-50">
        <input
          type="range"
          min="0.25"
          max="2"
          step="0.25"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full z-10"
        />
        <div className="text-xs text-center mt-1">
          Speed: {speed.toFixed(2)}×
        </div>
      </div>
    </div>
  );
}
