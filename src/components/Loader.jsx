"use client";

export default function StrokeWordLoader({ label = "Loading…", width = 320 }) {
  return (
    <div className="flex flex-col items-center gap-4 select-none z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <svg width={width} viewBox="0 0 600 120" className="stroke-word">
        {/* L */}
        <path d="M20 20 V100" className="stroke delay-0" />
        <path d="M20 100 H70" className="stroke delay-1" />

        {/* O */}
        <path
          d="M110 60
             C110 30, 160 30, 160 60
             C160 90, 110 90, 110 60 Z"
          className="stroke delay-2"
        />

        {/* A */}
        <path d="M200 100 L225 20 L250 100" className="stroke delay-3" />
        <path d="M210 65 H240" className="stroke delay-4" />

        {/* D */}
        <path d="M290 20 V100" className="stroke delay-5" />
        <path
          d="M290 20
             C340 40, 340 80, 290 100"
          className="stroke delay-6"
        />

        {/* I */}
        <path d="M380 20 V100" className="stroke delay-7" />

        {/* N */}
        <path d="M420 100 V20" className="stroke delay-8" />
        <path d="M420 20 L470 100" className="stroke delay-9" />
        <path d="M470 100 V20" className="stroke delay-10" />

        {/* G */}
        <path
          d="M520 60
             C520 30, 570 30, 570 60
             C570 90, 520 90, 520 60"
          className="stroke delay-11"
        />
        <path d="M545 60 H570" className="stroke delay-12" />
      </svg>

      {label && (
        <span className="text-sm text-white/70 tracking-widest">{label}</span>
      )}
    </div>
  );
}
