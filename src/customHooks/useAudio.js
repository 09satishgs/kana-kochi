const useAudio = () => {
  const speak = (text) => {
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "ja-JP";
      speechSynthesis.speak(utter);
    } catch (e) {
      alert(e?.message);
    }
  };
  return { speak };
};
export default useAudio;
