import React from "react";

export default function GamePage({
  title,
  timer,
  onSpeakerClick,
  characters,
  selectedInput,
  feedback,
  onCharacterSelect,
  onNext,
  answer,
  wrongCount,
}) {
  return (
    <div className="w-full min-h-screen bg-black text-gray-200 p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
        {/* A — Title Section */}
        <div className="col-span-1 bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-gray-400 mt-1">
            Follow the instructions and pick the right character.
          </p>
        </div>

        {/* B — Timer Section */}
        <div className="col-span-1 bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-md text-right">
          <div className="text-sm text-gray-400">Time Left</div>
          <div className="text-xl font-semibold">{timer.timeLeft ?? "--"}</div>

          <div className="text-sm mt-3 text-gray-400">Time Spent</div>
          <div className="text-lg">{timer.timeSpent ?? "--"}</div>

          <div className="text-sm mt-3 text-gray-400">Total Time</div>
          <div className="text-lg">{timer.totalTime ?? "--"}</div>
        </div>

        {/* C — Characters List */}
        <div className="col-span-1 bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3">Choose Character:</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {characters.map((char, index) => (
              <button
                key={index}
                onClick={() => onCharacterSelect(char)}
                className="
                  bg-gray-800 hover:bg-gray-700 
                  border border-gray-700 
                  text-white text-xl 
                  py-2 rounded-lg 
                  transition-all duration-150
                "
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* D — Speaker / Audio Trigger */}
        <div className="col-span-1 bg-gray-900 border border-gray-800 p-4 rounded-xl shadow-md flex items-center justify-center">
          <button
            onClick={onSpeakerClick}
            className="
              bg-indigo-600 hover:bg-indigo-500 
              text-white font-semibold 
              px-6 py-3 rounded-full 
              shadow-lg transition-all
            "
          >
            🔊 Play Audio
          </button>
        </div>

        {/* E — Input Space */}
        <div className="col-span-2 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md mt-4">
          <h2 className="text-lg font-semibold mb-2">Your Selection</h2>

          {selectedInput ? (
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{selectedInput}</div>
              <div
                className={`text-lg font-semibold ${
                  feedback ? "text-green-400" : "text-red-400"
                }`}
              >
                {feedback ? "Correct!" : "Wrong!"}(No. Of Mistakes: {wrongCount}
                )
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Waiting for your choice…</div>
          )}
        </div>
      </div>
    </div>
  );
}
