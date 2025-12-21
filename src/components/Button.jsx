"use client";

export default function Button({
  children,
  onClick,
  variant = "primary",
  ariaLabel,
  type = "button",
  className = "",
  disabled,
  ...props
}) {
  const baseClasses =
    "px-6 py-3 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-white text-black hover:opacity-90 focus-visible:ring-indigo-500",
    secondary:
      "border border-neutral-700 hover:bg-neutral-800 focus-visible:ring-neutral-500",
    custom: "",
  };

  const resolvedClasses =
    variant === "custom"
      ? `${baseClasses} ${className}`
      : `${baseClasses} ${variants[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={
        resolvedClasses +
        (disabled ? " text-gray-400 bg-gray-700 pointer-events-none" : "")
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
