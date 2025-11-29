// hiragana.js

const hiragana = {
  vowels: [
    { char: "あ", romaji: "a" },
    { char: "い", romaji: "i" },
    { char: "う", romaji: "u" },
    { char: "え", romaji: "e" },
    { char: "お", romaji: "o" },
  ],

  k: [
    { char: "か", romaji: "ka" },
    { char: "き", romaji: "ki" },
    { char: "く", romaji: "ku" },
    { char: "け", romaji: "ke" },
    { char: "こ", romaji: "ko" },
  ],

  s: [
    { char: "さ", romaji: "sa" },
    { char: "し", romaji: "shi" },
    { char: "す", romaji: "su" },
    { char: "せ", romaji: "se" },
    { char: "そ", romaji: "so" },
  ],

  t: [
    { char: "た", romaji: "ta" },
    { char: "ち", romaji: "chi" },
    { char: "つ", romaji: "tsu" },
    { char: "て", romaji: "te" },
    { char: "と", romaji: "to" },
  ],

  n: [
    { char: "な", romaji: "na" },
    { char: "に", romaji: "ni" },
    { char: "ぬ", romaji: "nu" },
    { char: "ね", romaji: "ne" },
    { char: "の", romaji: "no" },
  ],

  h: [
    { char: "は", romaji: "ha" },
    { char: "ひ", romaji: "hi" },
    { char: "ふ", romaji: "fu" },
    { char: "へ", romaji: "he" },
    { char: "ほ", romaji: "ho" },
  ],

  m: [
    { char: "ま", romaji: "ma" },
    { char: "み", romaji: "mi" },
    { char: "む", romaji: "mu" },
    { char: "め", romaji: "me" },
    { char: "も", romaji: "mo" },
  ],

  y: [
    { char: "や", romaji: "ya" },
    { char: "ゆ", romaji: "yu" },
    { char: "よ", romaji: "yo" },
  ],

  r: [
    { char: "ら", romaji: "ra" },
    { char: "り", romaji: "ri" },
    { char: "る", romaji: "ru" },
    { char: "れ", romaji: "re" },
    { char: "ろ", romaji: "ro" },
  ],

  w: [
    { char: "わ", romaji: "wa" },
    { char: "を", romaji: "wo" },
  ],

  nSpecial: [{ char: "ん", romaji: "n" }],

  dakuten: {
    g: [
      { char: "が", romaji: "ga" },
      { char: "ぎ", romaji: "gi" },
      { char: "ぐ", romaji: "gu" },
      { char: "げ", romaji: "ge" },
      { char: "ご", romaji: "go" },
    ],

    z: [
      { char: "ざ", romaji: "za" },
      { char: "じ", romaji: "ji" },
      { char: "ず", romaji: "zu" },
      { char: "ぜ", romaji: "ze" },
      { char: "ぞ", romaji: "zo" },
    ],

    d: [
      { char: "だ", romaji: "da" },
      { char: "ぢ", romaji: "ji (rare)" },
      { char: "づ", romaji: "zu (rare)" },
      { char: "で", romaji: "de" },
      { char: "ど", romaji: "do" },
    ],

    b: [
      { char: "ば", romaji: "ba" },
      { char: "び", romaji: "bi" },
      { char: "ぶ", romaji: "bu" },
      { char: "べ", romaji: "be" },
      { char: "ぼ", romaji: "bo" },
    ],

    p: [
      { char: "ぱ", romaji: "pa" },
      { char: "ぴ", romaji: "pi" },
      { char: "ぷ", romaji: "pu" },
      { char: "ぺ", romaji: "pe" },
      { char: "ぽ", romaji: "po" },
    ],
  },

  small: [
    { char: "ゃ", romaji: "ya (small)" },
    { char: "ゅ", romaji: "yu (small)" },
    { char: "ょ", romaji: "yo (small)" },
    { char: "ぁ", romaji: "a (small)" },
    { char: "ぃ", romaji: "i (small)" },
    { char: "ぅ", romaji: "u (small)" },
    { char: "ぇ", romaji: "e (small)" },
    { char: "ぉ", romaji: "o (small)" },
    { char: "っ", romaji: "small tsu (pause)" },
  ],

  yoon: [
    { char: "きゃ", romaji: "kya" },
    { char: "きゅ", romaji: "kyu" },
    { char: "きょ", romaji: "kyo" },

    { char: "しゃ", romaji: "sha" },
    { char: "しゅ", romaji: "shu" },
    { char: "しょ", romaji: "sho" },

    { char: "ちゃ", romaji: "cha" },
    { char: "ちゅ", romaji: "chu" },
    { char: "ちょ", romaji: "cho" },

    { char: "にゃ", romaji: "nya" },
    { char: "にゅ", romaji: "nyu" },
    { char: "にょ", romaji: "nyo" },

    { char: "ひゃ", romaji: "hya" },
    { char: "ひゅ", romaji: "hyu" },
    { char: "ひょ", romaji: "hyo" },

    { char: "みゃ", romaji: "mya" },
    { char: "みゅ", romaji: "myu" },
    { char: "みょ", romaji: "myo" },

    { char: "りゃ", romaji: "rya" },
    { char: "りゅ", romaji: "ryu" },
    { char: "りょ", romaji: "ryo" },
  ],
};

export default hiragana;
export const hiraganaChars = Object.values(hiragana)
  .flat()
  ?.map(({ char }) => char);
