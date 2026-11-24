import type { TSyllabary, TSyllabarySeries, TWriting } from "../store/types";

/**
 * Minimal, deterministic subset of `data.json` used by the tests.
 * Three series with five kana each.
 */
export const seriesFixture: TSyllabarySeries = [
  {
    id: 0,
    name: { label: "Vowels", kana: "あいうえお" },
    source: {
      romaji: ["a", "i", "u", "e", "o"],
      hiragana: ["あ", "い", "う", "え", "お"],
      katakana: ["ア", "イ", "ウ", "エ", "オ"],
    },
  },
  {
    id: 1,
    name: { label: "K", kana: "かきくけこ" },
    source: {
      romaji: ["ka", "ki", "ku", "ke", "ko"],
      hiragana: ["か", "き", "く", "け", "こ"],
      katakana: ["カ", "キ", "ク", "ケ", "コ"],
    },
  },
  {
    id: 2,
    name: { label: "S", kana: "さしすせそ" },
    source: {
      romaji: ["sa", "shi", "su", "se", "so"],
      hiragana: ["さ", "し", "す", "せ", "そ"],
      katakana: ["サ", "シ", "ス", "セ", "ソ"],
    },
  },
];

/**
 * Six series with five kana each. The game draws four distractors per question
 * from a pool built out of all the data, so the pool has to be big enough not
 * to be refilled while the five questions are played.
 */
export const gameSeriesFixture: TSyllabarySeries = [
  ...seriesFixture,
  {
    id: 3,
    name: { label: "T", kana: "たちつてと" },
    source: {
      romaji: ["ta", "chi", "tsu", "te", "to"],
      hiragana: ["た", "ち", "つ", "て", "と"],
      katakana: ["タ", "チ", "ツ", "テ", "ト"],
    },
  },
  {
    id: 4,
    name: { label: "N", kana: "なにぬねの" },
    source: {
      romaji: ["na", "ni", "nu", "ne", "no"],
      hiragana: ["な", "に", "ぬ", "ね", "の"],
      katakana: ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    },
  },
  {
    id: 5,
    name: { label: "H", kana: "はひふへほ" },
    source: {
      romaji: ["ha", "hi", "fu", "he", "ho"],
      hiragana: ["は", "ひ", "ふ", "へ", "ほ"],
      katakana: ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    },
  },
];

export const syllabaryFixture: TSyllabary = {
  selection: 0,
  options: ["Hiragana", "Katakana"],
};

export const writingFixture: TWriting = {
  selection: 0,
  options: ["Romaji", "Kana"],
};

/** A short series, used to test the minimum of 5 kana required to start. */
export const shortSeriesFixture: TSyllabarySeries = [
  {
    id: 3,
    name: { label: "Y", kana: "やゆよ" },
    source: {
      romaji: ["ya", "yu", "yo"],
      hiragana: ["や", "ゆ", "よ"],
      katakana: ["ヤ", "ユ", "ヨ"],
    },
  },
];
