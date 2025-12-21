"use client";

export default function KanaImage({ src, alt, isExpanded }) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out flex items-center justify-center w-full h-full`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
}
