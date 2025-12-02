import { useState, useEffect, useCallback, useRef } from "react";
import { hiraganaChars } from "@/assets/hiragana";
import useAudio from "./useAudio";

const useGameEngine = ({
  timer = false,
  chapter = "hiragana",
  variant = "letters",
}) => {
  const { speak } = useAudio();
  const [level, setLevel] = useState(1);
  const [answer, setAnswer] = useState("");
  const [timerStart, setTimerStart] = useState(false);
  const [timerStop, setTimerStop] = useState(false);
  const [hints, setHints] = useState([]);
  const [selectedInput, setSelectedInput] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedback, setFeedback] = useState(false);

  const timerRef = useRef(null);

  /** Timer: Runs always, but only “time left” is skipped when timer=false */
  useEffect(() => {
    if (timerStop || !timerStart) {
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeSpent((t) => t + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timerStart, timerStop]);

  /** Utility: Fast Fisher–Yates shuffle */
  const shuffle = useCallback((arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, []);

  /**
   * Generates the next round in a **single efficient step**
   * 1. Shuffle the full hiragana dataset
   * 2. Pick the first N as hints (you can adjust size)
   * 3. Pick the middle element as correct answer (ensures randomness)
   */
  const generateRound = useCallback(() => {
    const SHUFFLED = shuffle(hiraganaChars);

    const HINT_COUNT = 5 + level; // You can customize this
    const roundHints = SHUFFLED.slice(0, HINT_COUNT);

    const correctIndex = Math.floor(Math.random() * roundHints.length);
    const correct = roundHints[correctIndex];

    setHints(roundHints);
    setAnswer(correct);
    setSelectedInput("");
  }, [shuffle]);

  /** Called whenever user selects a hint */
  const handleSelect = useCallback(
    (char) => {
      setSelectedInput(char);
      speak(char);
      const isAnswerCorrect = char === answer;
      setFeedback(isAnswerCorrect);
      if (!isAnswerCorrect) {
        setWrongCount((c) => c + 1);
      } else {
        setTimerStop(true);
      }
    },
    [answer]
  );

  /** Moves to next puzzle */
  const showNext = useCallback(() => {
    setLevel((l) => l + 1); // 🔥 level increments each round
    generateRound();
  }, [generateRound]);

  // Generate first round only once
  useEffect(() => {
    generateRound();
  }, [generateRound]);

  const handleSpeakerClick = () => {
    speak(answer);
    setTimerStart(true);
  };

  return {
    answer,
    hints,
    showNext,
    level,
    timeSpent,
    selectedInput,
    handleSelect,
    handleSpeakerClick,
    feedback,
    wrongCount,
    restart: generateRound,
  };
};

export default useGameEngine;
