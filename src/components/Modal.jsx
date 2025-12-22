"use client";

import { useEffect } from "react";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          max-w-lg w-full mx-4
          rounded-3xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl
          p-6
          text-white
          relative
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            w-8 h-8
            flex items-center justify-center
            rounded-full
            hover:bg-white/10
            transition
            text-white/70
          "
          aria-label="Close"
        >
          ✕
        </button>

        {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
