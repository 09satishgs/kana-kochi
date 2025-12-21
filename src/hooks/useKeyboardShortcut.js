"use client";
import { useEffect } from "react";

export const useKeyboardShortcut = (keyMap) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log("event", event);
      // 1. Ignore shortcuts if the user is typing in an input or textarea
      const isTyping =
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA" ||
        event.target.isContentEditable;

      if (isTyping) return;

      // 2. Check if the key exists in our map
      if (keyMap[event.key]) {
        keyMap[event.key](event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup to prevent memory leaks and duplicate listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyMap]);
};
