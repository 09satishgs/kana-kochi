"use client";

const ICONS = {
  "icon-home": (
    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" />
  ),

  "icon-book": (
    <>
      <path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 0-2 2V4z" />
      <path d="M6 4v14" />
    </>
  ),

  "icon-play": <path d="M6 4l12 8-12 8V4z" />,

  "icon-write": (
    <>
      <path d="M4 20h4l10-10-4-4L4 16v4z" />
      <path d="M14 6l4 4" />
    </>
  ),

  "icon-chevron-right": <path d="M9 18l6-6-6-6" />,
  "icon-chevron-down": <path d="M6 9l6 6 6-6" />,

  "icon-award": (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" />
      <path d="M17 8h2a2 2 0 0 0 2-2V4h-4" />
      <path d="M7 8H5a2 2 0 0 1-2-2V4h4" />
    </>
  ),
  "icon-settings": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .67.39 1.28 1 1.51H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = "" }) {
  const iconPath = ICONS[name];

  if (!iconPath) {
    // Fail silently but safely
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {iconPath}
    </svg>
  );
}
