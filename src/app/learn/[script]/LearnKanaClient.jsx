"use client";

import Character from "@/components/Character";
import { useAudio } from "@/hooks/useAudio";

const LearnKanaClient = ({ data }) => {
  const { speak } = useAudio({ lang: "ja-JP", rate: 0.9 });

  return (
    <div className="px-20 py-10">
      <div className="grid grid-cols-5 gap-10">
        {data?.map((kana) => (
          <Character
            key={kana?.id}
            value={kana?.char}
            ariaLabel={`Play sound for ${kana?.romaji}`}
            animation="pulse"
            activeFeedback="learn"
            onClick={() => speak(kana?.char)}
            romaji={kana?.romaji}
          />
        ))}
      </div>
    </div>
  );
};
export default LearnKanaClient;
