import { SCRIPT_CONFIG } from "@/constants/constants";
import words from "@/data/words";
import { useEffect, useMemo, useState } from "react";

const useGenerateRandomData = ({ script, mode, lvl }) => {
  const [randomData, setRandomData] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(0);
  const allKeys = useMemo(
    () => SCRIPT_CONFIG[script]?.data?.map(({ char }) => char),
    []
  );
  const refreshList = () => setLastRefresh(Date.now());
  const prefetch = (fallbackToStaticData) => {
    switch (mode) {
      case "letters":
        return SCRIPT_CONFIG[script]?.data?.map(({ char, romaji }) => ({
          chars: [char],
          romaji,
        }));
      case "words":
        let savedWords = JSON.parse(sessionStorage.getItem("jp-words") || `[]`);
        if (fallbackToStaticData && !savedWords?.length) {
          savedWords = words;
        }
        return savedWords?.map((wordData) => {
          return {
            difficulty: wordData?.difficulty,
            romajiArr: wordData?.kanaIds?.hiragana, //same for both hiragana and katakana
            romaji: wordData?.romaji,
            chars: wordData?.scripts?.[script],
          };
        });
      default:
        return null;
    }
  };
  useEffect(() => {
    const randomList = prefetch();
    setRandomData(randomList);
  }, [lastRefresh]);

  const pickARandom = () => {
    let list = randomData;
    if (!list?.length) {
      list = prefetch(true);
      setRandomData(list);
    }

    return list?.find(() => Math.random() < 0.1) || list?.[0];
  };

  return { randomData, refreshList, pickARandom, allKeys };
};
export default useGenerateRandomData;
