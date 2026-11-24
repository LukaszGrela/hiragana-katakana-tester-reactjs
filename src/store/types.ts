export type TSyllabarySeriesEntry = {
  id: number;
  name: { label: string; kana: string };
  source: {
    romaji: string[];
    hiragana: string[];
    katakana: string[];
  };
};
export type TSyllabarySeries = TSyllabarySeriesEntry[];
