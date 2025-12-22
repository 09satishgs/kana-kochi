"use client";

import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import NavTree from "@/components/NavTree";
import Icon from "@/components/Icon";
import navConfig from "@/data/navConfig";
import { useNav } from "@/hooks/useNav";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState(null);
  const { navigate } = useNav();
  usePageTitleUpdater("");
  return (
    <main className="p-12">
      <div
        className="
          grid grid-cols-3
          gap-8
          items-start
          grid-flow-dense
        "
      >
        {navConfig
          ?.filter(({ navTo }) => navTo !== "/")
          .map((section, idx) => (
            <GlassCard
              key={section.label}
              title={section.label}
              icon={
                section.icon && (
                  <Icon name={section.icon} size={22} className="text-white" />
                )
              }
              expanded={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              onHeadingClick={() => section?.navTo && navigate(section?.navTo)}
              tooltip={section?.description}
            >
              {section.innerRoutes && <NavTree routes={section.innerRoutes} />}
            </GlassCard>
          ))}
      </div>
    </main>
  );
}
