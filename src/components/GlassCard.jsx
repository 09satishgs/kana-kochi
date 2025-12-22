import Icon from "./Icon";

export default function GlassCard({
  title,
  icon,
  expanded,
  onToggle,
  children,
  onHeadingClick,
  tooltip = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        p-6
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        shadow-xl
        transition-all duration-300
        flex flex-col
        ${expanded ? "row-span-3" : "row-span-1"}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 justify-between">
        <div>
          <div className="flex items-center gap-3">
            {icon}
            <h2
              className="text-lg font-semibold text-white cursor-pointer hover:underline"
              onClick={onHeadingClick}
              title={tooltip}
            >
              {title}
            </h2>
          </div>
          {!expanded && (
            <p className="pt-3 mt-3 border-t-2 border-t-white text-md text-white">
              {tooltip}
            </p>
          )}
        </div>

        {!!children && (
          <button
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <Icon
              className={
                "transition-all ease-in-out text-white " +
                (expanded ? "rotate-180" : "")
              }
              name="icon-chevron-down"
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div
        className={`
          transition-[max-height,opacity] duration-300
          ${
            expanded
              ? "max-h-150 opacity-100 mt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }
        `}
      >
        {children}
      </div>
    </div>
  );
}
