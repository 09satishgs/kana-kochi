const BouncingText = ({ text }) => {
  return (
    <div>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animate-bounce-short inline-block"
          style={{ animationDelay: `${index * 0.1}s` }} // The magic happens here
        >
          {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
        </span>
      ))}
    </div>
  );
};

export default BouncingText;
