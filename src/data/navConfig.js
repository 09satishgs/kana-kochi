export const LEFT_NAV_CONFIG = [
  {
    icon: "icon-home",
    label: "Home",
    navTo: "/",
    description:
      "Your main dashboard and starting point for learning Japanese kana.",
  },
  {
    icon: "icon-book",
    label: "Learn",
    navTo: "/learn",
    description:
      "Browse visual cheat sheets and listen to kana pronunciations.",
    innerRoutes: [
      {
        label: "Hiragana",
        navTo: "/learn/hiragana",
        description: "Learn all Hiragana characters with visuals and audio.",
      },
      {
        label: "Katakana",
        navTo: "/learn/katakana",
        description: "Learn all Katakana characters with visuals and audio.",
      },
    ],
  },
  {
    icon: "icon-write",
    label: "Practice",
    navTo: "/practice",
    description:
      "Practice writing kana with stroke order animations and audio.",
    innerRoutes: [
      {
        label: "Hiragana",
        navTo: "/practice/hiragana",
        description: "Practice writing Hiragana with guided stroke animations.",
      },
      {
        label: "Katakana",
        navTo: "/practice/katakana",
        description: "Practice writing Katakana with guided stroke animations.",
      },
    ],
  },
  {
    icon: "icon-play",
    label: "Play",
    navTo: "/play",
    description: "Practice kana through interactive games and challenges.",
    innerRoutes: [
      {
        label: "Hiragana",
        navTo: "/play/hiragana",
        description: "Play games focused on Hiragana recognition and recall.",
        innerRoutes: [
          {
            label: "Letters",
            navTo: "/play/hiragana/letters",
            description:
              "Identify individual Hiragana characters by sound or shape.",
            innerRoutes: [
              {
                label: "Lv0",
                navTo: "/play/hiragana/letters/0",
                description:
                  "Beginner level with the simplest Hiragana characters.",
              },
              {
                label: "Lv1",
                navTo: "/play/hiragana/letters/1",
                description: "Early practice with common Hiragana characters.",
              },
              {
                label: "Lv2",
                navTo: "/play/hiragana/letters/2",
                description:
                  "Intermediate level to improve Hiragana recognition speed.",
              },
              {
                label: "Lv3",
                navTo: "/play/hiragana/letters/3",
                description:
                  "Advanced Hiragana practice with increased difficulty.",
              },
              {
                label: "Lv4",
                navTo: "/play/hiragana/letters/4",
                description:
                  "Master-level Hiragana challenge for confident learners.",
              },
            ],
          },
          {
            label: "Words",
            navTo: "/play/hiragana/words",
            description:
              "Recognize and understand simple words written in Hiragana.",
            innerRoutes: [
              {
                label: "Lv0",
                navTo: "/play/hiragana/words/0",
                description: "Very simple Hiragana words for beginners.",
              },
              {
                label: "Lv1",
                navTo: "/play/hiragana/words/1",
                description: "Short Hiragana words with common characters.",
              },
              {
                label: "Lv2",
                navTo: "/play/hiragana/words/2",
                description: "Medium-length Hiragana words to build fluency.",
              },
              {
                label: "Lv3",
                navTo: "/play/hiragana/words/3",
                description:
                  "Longer Hiragana words with higher recognition difficulty.",
              },
              {
                label: "Lv4",
                navTo: "/play/hiragana/words/4",
                description:
                  "Challenging Hiragana words for advanced learners.",
              },
            ],
          },
        ],
      },
      {
        label: "Katakana",
        navTo: "/play/katakana",
        description: "Play games focused on Katakana recognition and recall.",
        innerRoutes: [
          {
            label: "Letters",
            navTo: "/play/katakana/letters",
            description:
              "Identify individual Katakana characters by sound or shape.",
            innerRoutes: [
              {
                label: "Lv0",
                navTo: "/play/katakana/letters/0",
                description:
                  "Beginner level with the simplest Katakana characters.",
              },
              {
                label: "Lv1",
                navTo: "/play/katakana/letters/1",
                description: "Early practice with common Katakana characters.",
              },
              {
                label: "Lv2",
                navTo: "/play/katakana/letters/2",
                description: "Intermediate Katakana recognition challenges.",
              },
              {
                label: "Lv3",
                navTo: "/play/katakana/letters/3",
                description:
                  "Advanced Katakana practice with increased difficulty.",
              },
              {
                label: "Lv4",
                navTo: "/play/katakana/letters/4",
                description:
                  "Master-level Katakana challenge for confident learners.",
              },
            ],
          },
          {
            label: "Words",
            navTo: "/play/hiragana/words",
            description: "Recognize and understand words written in Katakana.",
            innerRoutes: [
              {
                label: "Lv0",
                navTo: "/play/katakana/words/0",
                description: "Very simple Katakana words, often loanwords.",
              },
              {
                label: "Lv1",
                navTo: "/play/katakana/words/1",
                description: "Short Katakana words used in everyday Japanese.",
              },
              {
                label: "Lv2",
                navTo: "/play/katakana/words/2",
                description:
                  "Medium-length Katakana words to improve reading speed.",
              },
              {
                label: "Lv3",
                navTo: "/play/katakana/words/3",
                description: "Longer Katakana words with increased complexity.",
              },
              {
                label: "Lv4",
                navTo: "/play/katakana/words/4",
                description: "Advanced Katakana word challenges for mastery.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    icon: "icon-award",
    label: "Achievements",
    navTo: "/achievements",
    description: "View your progress, milestones, and learning achievements.",
  },
  {
    icon: "icon-settings",
    label: "Settings",
    navTo: "/settings",
    description: "Customize your learning experience and app preferences.",
  },
];
export const RIGHT_NAV_CONFIG = [
  {
    icon: "icon-home",
    label: "Back",
    navType: { prev: true },
    description:
      "Your main dashboard and starting point for learning Japanese kana.",
  },
  {
    icon: "icon-home",
    label: "Reload",
    navType: { reload: true },
    description:
      "Your main dashboard and starting point for learning Japanese kana.",
  },
  {
    icon: "icon-home",
    label: "Next",
    navType: { next: true },
    description:
      "Your main dashboard and starting point for learning Japanese kana.",
  },
];
