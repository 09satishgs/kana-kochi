"use client";
import GamePage from "@/components/GamePage";
import useGameEngine from "@/customHooks/useGameEngine";

const Stage1 = () => {
  const {
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
  } = useGameEngine({
    timer: false,
    chapter: "hiragana",
    variant: "letters",
  });
  return (
    <div className="">
      <GamePage
        title={`Pick the Correct Hiragana Lvl(${level})`}
        answer={answer} //remove
        timer={{
          timeLeft: "-",
          timeSpent,
          totalTime: "-",
        }}
        characters={hints}
        selectedInput={selectedInput}
        feedback={feedback}
        onSpeakerClick={handleSpeakerClick}
        onCharacterSelect={handleSelect}
        onNext={showNext}
        wrongCount={wrongCount}
      />
    </div>
  );
};
export default Stage1;
