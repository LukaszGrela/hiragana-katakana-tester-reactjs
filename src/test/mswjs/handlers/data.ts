import { http, HttpResponse } from "msw";

// Create the handler
export const getData = http.get(
  `${import.meta.env.BASE_URL}/data/data.json`,
  () => {
    return HttpResponse.json({
      selection: ["all"],
      syllabary: {
        selection: 0,
        options: ["Hiragana", "Katakana"],
      },
      writing: {
        selection: 1,
        options: ["Romaji", "Kana"],
      },
      syllabary_series: [
        {
          id: 0,
          name: { label: "Vowels", kana: "あ" },
          source: {
            romaji: ["a", "i", "u", "e", "o"],
            hiragana: ["あ", "い", "う", "え", "お"],
            katakana: ["ア", "イ", "ウ", "エ", "オ"],
          },
        },
        {
          id: 1,
          name: { label: "K Series", kana: "か" },
          source: {
            romaji: ["ka", "ki", "ku", "ke", "ko"],
            hiragana: ["か", "き", "く", "け", "こ"],
            katakana: ["カ", "キ", "ク", "ケ", "コ"],
          },
        },
        {
          id: 2,
          name: { label: "G Series", kana: "ぎ" },
          source: {
            romaji: ["ga", "gi", "gu", "ge", "go"],
            hiragana: ["が", "ぎ", "ぐ", "げ", "ご"],
            katakana: ["ガ", "ギ", "グ", "ゲ", "ゴ"],
          },
        },
        {
          id: 3,
          name: { label: "S Series", kana: "さ" },
          source: {
            romaji: ["sa", "shi", "su", "se", "so"],
            hiragana: ["さ", "し", "す", "せ", "そ"],
            katakana: ["サ", "シ", "ス", "セ", "ソ"],
          },
        },
        {
          id: 4,
          name: { label: "Z Series", kana: "ざ" },
          source: {
            romaji: ["za", "ji", "zu", "ze", "zo"],
            hiragana: ["ざ", "じ", "ず", "ぜ", "ぞ"],
            katakana: ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
          },
        },
        {
          id: 5,
          name: { label: "T Series", kana: "た" },
          source: {
            romaji: ["ta", "chi", "tsu", "te", "to"],
            hiragana: ["た", "ち", "つ", "て", "と"],
            katakana: ["タ", "チ", "ツ", "テ", "ト"],
          },
        },
      ],
    });
  },
);
