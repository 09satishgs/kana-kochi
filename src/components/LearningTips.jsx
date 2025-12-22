"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function LearningTips({
  tips = [],
  className = "",
  title = "Learning Tips",
}) {
  const [open, setOpen] = useState(false);

  if (!tips.length) return null;

  return (
    <>
      {/* Glowing button */}
      <button
        onClick={() => setOpen(true)}
        className={`
          relative
          px-5 py-3
          rounded-xl
          bg-black text-white
          font-medium
          shadow-lg
          animate-glow
          hover:scale-[1.03]
          active:scale-95
          transition
          cursor-pointer
          ${className}
        `}
      >
        💡 {title}
      </button>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        <ul className="space-y-3 text-white/80">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="text-white/60">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
