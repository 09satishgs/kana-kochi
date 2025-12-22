"use client";

import { useEffect, useRef, useState } from "react";
import { useNav } from "@/hooks/useNav";
import Icon from "@/components/Icon";
import { usePathname } from "next/navigation";
import NAV_CONFIG from "@/data/navConfig";

export default function FloatingNav() {
  const { navigate } = useNav();
  const pathname = usePathname();
  // Drill-down path: [{ label, routes }]
  const [path, setPath] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [opacity, setOpacity] = useState("opacity-20");
  const hoverRef = useRef(null);

  const reset = () => {
    setPath([]);
    setIsExpanded(false);
  };

  const expandFromRoot = (label, innerRoutes) => {
    if (!innerRoutes) return;
    setPath([{ label, routes: innerRoutes }]); // RESET
  };

  const expandNested = (label, innerRoutes) => {
    if (!innerRoutes) return;
    setPath((prev) => [...prev, { label, routes: innerRoutes }]);
  };

  const goBack = () => {
    setPath((prev) => prev.slice(0, -1));
  };

  const handleNavigate = (navTo) => {
    if (!navTo) return;
    navigate(navTo);
    reset();
  };

  const handleHover = () => {
    if (hoverRef.current) {
      clearTimeout(hoverRef.current);
      hoverRef.current = null;
    }
    setOpacity("opacity-100");
    setIsExpanded(true);
  };
  const hanldeMouseLeave = () => {
    if (hoverRef.current) {
      clearTimeout(hoverRef.current);
    }

    hoverRef.current = setTimeout(() => {
      setIsExpanded(false);
      setOpacity("opacity-20");
      hoverRef.current = null;
    }, 2000);
  };

  const activeRoutes = path.length > 0 ? path[path.length - 1].routes : null;

  const breadcrumbs = path.map((p) => p.label).join(" → ");

  useEffect(() => {
    return () => {
      if (hoverRef.current) {
        clearTimeout(hoverRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{ opacity }}
      className={`
        fixed top-1/2 left-4 -translate-y-1/2
        z-50
        flex gap-2
        items-center
        bg-[#0e031e]/20 backdrop-blur
        p-2 rounded-2xl
        shadow-xl
        transition-all duration-200
        ${opacity}
      `}
      onMouseEnter={handleHover}
      onMouseLeave={hanldeMouseLeave}
    >
      <div className="flex flex-col gap-2">
        {NAV_CONFIG.map((item, idx) => (
          <NavButton
            key={idx}
            item={item}
            expanded={isExpanded}
            onNavigate={() => handleNavigate(item.navTo)}
            onExpand={() => expandFromRoot(item.label, item.innerRoutes)}
            active={item.navTo === pathname}
          />
        ))}
      </div>

      {/* RIGHT PANEL — DRILL DOWN */}
      {activeRoutes && isExpanded && (
        <div className="flex flex-col gap-2 min-w-45">
          {/* Breadcrumbs */}
          <div className="px-3 py-2 text-xs text-white/70 border-b border-white/10">
            {breadcrumbs}
          </div>

          {activeRoutes.map((item, idx) => (
            <NavButton
              key={idx}
              item={item}
              expanded={true}
              onNavigate={() => handleNavigate(item.navTo)}
              onExpand={() => expandNested(item.label, item.innerRoutes)}
              active={item.navTo === pathname}
            />
          ))}
          <button
            onClick={goBack}
            className="
              mt-2 px-3 py-2
              text-sm text-white/80
              hover:text-white
              hover:bg-white/10
              rounded-xl
              transition
            "
          >
            ← Back
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="p-6 h-10">
          <button
            onClick={reset}
            className="
          absolute top-2 right-2
          w-12 h-12
          flex items-center justify-center
          rounded-full
          text-white/70
          hover:text-white
          hover:bg-white/10
          cursor-pointer
          transition
          "
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function NavButton({ item, expanded, onNavigate, onExpand, active }) {
  return (
    <div
      className={`
        flex items-center
        rounded-xl
       
        transition-all duration-200
        cursor-pointer
        overflow-hidden
        ${
          active
            ? "bg-blue-800/20 hover:bg-blue-800/30"
            : "bg-white/10 hover:bg-white/20"
        }
      `}
    >
      {/* Navigate zone */}
      <div
        onClick={onNavigate}
        className="
          flex items-center gap-3
          px-4 py-3
          flex-1
          select-none
        "
      >
        {item.icon && (
          <Icon name={item.icon} size={22} className="text-white min-w-5.5" />
        )}

        {expanded && (
          <span className="text-white whitespace-nowrap">{item.label}</span>
        )}
      </div>

      {/* Expand zone */}
      {expanded && item.innerRoutes && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          className="
            px-3 py-3
            text-white/70 hover:text-white
            hover:bg-white/10
            transition
          "
        >
          <Icon name="icon-chevron-right" size={16} />
        </div>
      )}
    </div>
  );
}
