"use client";

import { useSearchParams, useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import KanaVideo from "@/components/KanaVideo";
import { useNav } from "@/hooks/useNav";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";
import PracticeKanaBase from "./PracticeKanaBase";
import { SCRIPT_CONFIG } from "@/constants/constants";
import Loader from "@/components/Loader";
import { apiFetch } from "@/helpers";

export default function StrokePracticePage() {
  const pathname = usePathname();
  const { script } = useParams();
  const searchParams = useSearchParams();
  const config = SCRIPT_CONFIG?.[script];
  const kana = searchParams.get("kana");
  usePageTitleUpdater(
    !kana ? `Practice  ---  Click on the Kana` : `Practice  ---  ${kana}`,
  );

  const { navigate, prefetch } = useNav();
  const [assets, setAssets] = useState(null);
  const { prevKana, nextKana, romaji } = useMemo(() => {
    let index;
    if (script === "hiragana") {
      let romaji;
      index = hiragana?.findIndex(({ char }) => char === kana);
      return {
        prevKana: hiragana?.[index - 1]?.char,
        nextKana: hiragana?.[index + 1]?.char,
        romaji: hiragana?.[index]?.romaji,
      };
    } else if (script === "katakana") {
      index = katakana?.findIndex(({ char }) => char === kana);
      return {
        prevKana: katakana?.[index - 1]?.char,
        nextKana: katakana?.[index + 1]?.char,
        romaji: katakana?.[index]?.romaji,
      };
    }
    return;
  }, [kana, script]);

  const moveToPrev = () => {
    if (!prevKana) return;
    setAssets(null);
    navigate(`${pathname}?kana=${prevKana}`);
  };
  const moveToNext = () => {
    if (!nextKana) return;
    setAssets(null);
    navigate(`${pathname}?kana=${nextKana}`);
  };

  useEffect(() => {
    if (!kana || !script) return;

    apiFetch(`/api/kana/assets?script=${script}&kana=${kana}`)
      .then((res) => res.json())
      .then(setAssets)
      .catch(console.error);
  }, [script, kana]);

  useKeyboardShortcut({
    ArrowRight: moveToNext,
    ArrowLeft: moveToPrev,
  });

  useEffect(() => {
    prefetch(`${pathname}?kana=${nextKana}`);
    prefetch(`${pathname}?kana=${prevKana}`);
  }, []);

  if (!kana) {
    return <PracticeKanaBase data={config?.data || []} />;
  }

  if (!assets) {
    return <Loader />;
  }

  return (
    <div className="mt-6 m-8">
      <KanaVideo
        src={assets.strokeUrl}
        imageSrc={assets.imageUrl}
        kana={kana}
        script={script}
        romaji={romaji}
        onNext={moveToNext}
        onPrev={moveToPrev}
        prevKana={prevKana}
        nextKana={nextKana}
      />
    </div>
  );
}
