"use client";

import { useEffect, useMemo, useState } from "react";
import { useAudio } from "@/hooks/useAudio";
import useGenerateRandomData from "./useGenerateRandomData";
import { MODE_LEVEL_CONFIG } from "@/data/gameConfigs";

const getTotalTime = ({ mode, lvl }) => {
  return MODE_LEVEL_CONFIG[mode?.toUpperCase()]?.[lvl]?.time || 240;
};
const getMaxAllowedMistakes = ({ mode, lvl }) => {
  return MODE_LEVEL_CONFIG[mode?.toUpperCase()]?.[lvl]?.mistakes || 5;
};
const getKeyboardKeys = (len, pool = [], mustHave = []) => {
  // 1. Start with the mandatory keys
  let result = [...mustHave];

  // 2. Only pick from pool if we actually need more keys
  if (result.length < len) {
    const needed = len - result.length;

    // Filter pool to exclude items already in mustHave (prevents duplicates)
    const availablePool = pool.filter((key) => !mustHave.includes(key));

    for (let i = 0; i < needed; i++) {
      // Stop if we run out of unique keys in the pool
      if (availablePool.length === 0) break;

      const randomIndex = Math.floor(Math.random() * availablePool.length);

      // Add the random key
      result.push(availablePool[randomIndex]);

      // Remove it from availablePool to ensure we don't pick it again
      availablePool.splice(randomIndex, 1);
    }
  }

  // 3. Shuffle the final result (Fisher-Yates Shuffle)
  // This runs regardless of whether we added keys or just kept the mustHave array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
};
const getNextExpectedChar = (selectedChars = [], correctChars = []) => {
  return correctChars?.find((char, index) => {
    if (selectedChars[index] === char) {
      return false;
    }
    return char;
  });
};

export function useGameEngine({ script, mode, lvl }) {
  const { play } = useAudio({ lang: "ja-JP" });
  const { pickARandom, allKeys } = useGenerateRandomData({
    script,
    mode,
    lvl,
  });

  /* ---------------- State ---------------- */
  const [current, setCurrent] = useState(null);

  const [showHint, setShowHint] = useState(false);
  const [keyboardKeys, setKeyboardKeys] = useState([]);
  const [selectedChars, setSelectedChars] = useState([]);
  const [incorrectValues, setIncorrectValues] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [streak, setStreak] = useState(0);
  const nextExpectedChar = useMemo(
    () => getNextExpectedChar(selectedChars, current?.chars),
    [selectedChars, current]
  );
  const { totalTime, maxAllowedMistakes } = useMemo(
    () => ({
      totalTime: getTotalTime({ mode, lvl }),
      maxAllowedMistakes: getMaxAllowedMistakes({ mode, lvl }),
    }),
    [mode, lvl]
  );

  const timeLeft = useMemo(() => totalTime - timeSpent, [timeSpent, totalTime]);

  const playAudio = () => {
    play(current?.chars?.join("") || "");
  };
  /* ---------------- Audio ---------------- */
  useEffect(() => {
    playAudio();
  }, [current]);

  /* ---------------- Timer ---------------- */
  useEffect(() => {
    if (feedback?.isCompleted) {
      return;
    }
    if (timeSpent >= totalTime) {
      setFeedback((prev) => ({ ...prev, isCompleted: true }));
      return;
    }

    const intID = setInterval(() => {
      setTimeSpent((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(intID);
    };
  }, [totalTime, timeSpent, feedback?.isCompleted]);

  /* ---------------- User Interaction ---------------- */
  const selectLetter = (char) => {
    //Todo : Recheck
    // 1. Guard clauses
    if (feedback?.isCompleted) return; // Already won

    // 2. Determine the target character
    // We look at how many we have selected so far to find the index we need next
    const currentIndex = selectedChars.length;
    const expectedChar = current.chars[currentIndex];

    // 3. Compare Input
    if (char === expectedChar) {
      // --- CORRECT GUESS ---
      const newSelection = [...selectedChars, char];
      setSelectedChars(newSelection);

      // Check if word is complete
      if (newSelection.length === current.chars.length) {
        setStreak((s) => s + 1);
        setFeedback({
          isCorrect: true,
          message: "Excellent! Correct.",
          isCompleted: true,
        });
      }
    } else {
      // --- WRONG GUESS ---
      // 1. Record the mistake
      setIncorrectValues((prev) => [...prev, [...selectedChars, char]]);
      // 2. Penalties (As per your request: Reset progress)
      setSelectedChars([]);

      // 3. Feedback logic (Optional: fail immediately? or just warn?)
      // For now, we just reset. If you want to end game on X mistakes:
      if (incorrectValues.length + 1 >= maxAllowedMistakes) {
        setFeedback({
          isCorrect: false,
          message: "Too many mistakes! Try again.",
          isCompleted: true,
        });
      }
    }
  };
  /* ---------------- Controls ---------------- */
  const revealHint = () => setShowHint(true);

  const loadNewSet = () => {
    const randomObj = pickARandom();
    setCurrent(randomObj);
    const KEYBOARD_SIZE = 12;
    setKeyboardKeys(getKeyboardKeys(KEYBOARD_SIZE, allKeys, randomObj?.chars));
    setShowHint(false);
    setSelectedChars([]);
    setIncorrectValues([]);
    setFeedback({});
    setTimeSpent(0);
  };

  const proceedToNext = () => {
    loadNewSet();
  };

  /* ---------------- Initialize ---------------- */
  useEffect(() => {
    loadNewSet();
  }, [script, mode, lvl]);

  return {
    /* Randomly fetched Data */
    current,

    /** Screen toggles */
    showHint,

    /** feedbacks */
    feedback /** {"isCompleted": =>Bool<=,"isCorrect": =>Bool<=,"message": =>String<=} */,
    selectedChars /** [=>String(s)<=] */,
    incorrectValues /** [=>[=>String(s)<=]<=] */,
    streak,

    /** Derived Values */
    keyboardKeys,
    totalTime,
    maxAllowedMistakes,
    nextExpectedChar,

    /* Live Times */
    timeLeft,
    timeSpent,

    /* Actions */
    selectLetter,
    replayAudio: playAudio,
    revealHint,
    restartLvl: loadNewSet,
    proceedToNext,
  };
}
