const { hiragana } = require("./data/hiragana");
const { katakana } = require("./data/katakana");

/* =========================
   Constants
========================= */
export const SCRIPT_CONFIG = {
  hiragana: {
    label: "Hiragana",
    data: hiragana,
  },
  katakana: {
    label: "Katakana",
    data: katakana,
  },
};
export const INVALID_ROUTE_COPY = {
  title: "Page not found",
  description: "The requested learning mode does not exist.",
};

export const tailwindClass = {
  COL_ST: {
    1: "col-start-1",
    2: "col-start-2",
    3: "col-start-3",
    4: "col-start-4",
    5: "col-start-5",
  },
  GRID_COLS: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
  },
};
