"use client";

import { useNav } from "@/hooks/useNav";

export default function NavTree({ routes }) {
  return (
    <div className="space-y-3">
      {routes.map((route, idx) => (
        <NavNode key={`${route.label}-${idx}`} node={route} depth={0} />
      ))}
    </div>
  );
}

function NavNode({ node, depth }) {
  const { navigate } = useNav();
  const isLeaf = !node.innerRoutes;
  const isDeepLeaf = isLeaf && depth >= 2;

  const baseText =
    depth === 0 ? "text-base font-medium" : depth === 1 ? "text-sm" : "text-xs";

  // FINAL ROUTES → pill style, horizontal handled by parent
  if (isDeepLeaf) {
    return (
      <button
        onClick={() => node.navTo && navigate(node.navTo)}
        className="
          px-3 py-1.5
          rounded-full
          bg-white/10 hover:bg-white/20
          text-xs text-white
          transition
          whitespace-nowrap
        "
        title={node?.description}
      >
        {node.label}
      </button>
    );
  }

  return (
    <div className="space-y-2">
      {/* Node row */}
      <div
        onClick={() => isLeaf && node.navTo && navigate(node.navTo)}
        className={`
          flex items-center gap-2
          cursor-pointer
          px-2 py-1.5 rounded-lg
          hover:bg-white/10
          transition
          ${baseText}
          text-white
        `}
        title={node?.description}
      >
        <span>{node.label}</span>
      </div>

      {/* Children */}
      {node.innerRoutes && (
        <div
          className={`
            ${depth >= 1 ? "flex flex-wrap gap-2 ml-3" : "ml-4 space-y-2"}
          `}
        >
          {node.innerRoutes.map((child, idx) => (
            <NavNode
              key={`${child.label}-${idx}`}
              node={child}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
