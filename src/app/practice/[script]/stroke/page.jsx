"use client";

import { useSearchParams, useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import KanaImage from "@/components/KanaImage";
import KanaVideo from "@/components/KanaVideo";
import SoundButton from "@/components/SoundButton";
import { useNav } from "@/hooks/useNav";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import { useAudio } from "@/hooks/useAudio";
import Button from "@/components/Button";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { useGlobals } from "@/contexts/GlobalsContext";

export default function StrokePracticePage() {
  const pathname = usePathname();
  const { script } = useParams();
  const searchParams = useSearchParams();

  const navigate = useNav();
  const { speak } = useAudio();
  const { changeTitle } = useGlobals();
  const kana = searchParams.get("kana");
  const [assets, setAssets] = useState(null);
  const { prevKana, nextKana } = useMemo(() => {
    let index;
    if (script === "hiragana") {
      index = hiragana?.findIndex(({ char }) => char === kana);
      return {
        prevKana: hiragana?.[index - 1]?.char,
        nextKana: hiragana?.[index + 1]?.char,
      };
    } else if (script === "katakana") {
      index = katakana?.findIndex(({ char }) => char === kana);
      return {
        prevKana: katakana?.[index - 1]?.char,
        nextKana: katakana?.[index + 1]?.char,
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

    fetch(`/api/kana/assets?script=${script}&kana=${kana}`)
      .then((res) => res.json())
      .then(setAssets)
      .catch(console.error);
  }, [script, kana]);

  useEffect(() => {
    changeTitle(`Practice ${script?.toUpperCase()} - ${kana}`);
  }, [script]);

  useKeyboardShortcut({
    ArrowRight: moveToNext,
    ArrowLeft: moveToPrev,
  });

  if (!kana) {
    return <div className="p-6">Missing kana</div>;
  }

  if (!assets) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex h-full items-center px-4 ">
      <div className="h-50  py-24 px-4 rounded-xl shadow flex-0 transition-all ease-in-out hover:scale-150">
        {"<"}
      </div>
      <div className={`flex justify-between items-center p-12 flex-1`}>
        <div className="h-100 w-100 hover:shadow-2xl rounded-2xl overflow-hidden">
          <KanaImage src={assets.imageUrl} alt={kana} />
        </div>
        <div className="h-125 w-125 hover:shadow-2xl rounded-4xl overflow-hidden">
          <KanaVideo src={assets.strokeUrl} />
        </div>
        <SoundButton kana={kana} />
      </div>
      <div className="h-50 py-24 px-4 rounded-xl shadow flex-0 transition-all ease-in-out hover:scale-150">
        {">"}
      </div>
    </div>
  );
}
