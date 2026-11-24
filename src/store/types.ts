import type { TDataAddedAction } from '../actions/dataAdded';
import type { TSelectionChangedAction } from '../actions/selectionChanged';
import type { TSyllabaryAddedAction } from '../actions/syllabaryAdded';
import type { TSyllabaryChangedAction } from '../actions/syllabaryChanged';
import type { TWritingAddedAction } from '../actions/writingAdded';
import type { TWritingChangedAction } from '../actions/writingChanged';

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

/** Wspólny kształt `syllabary` i `writing` z public/data/data.json. */
export type TOptionsSelection = {
  selection: number;
  options: string[];
};
export type TSyllabary = TOptionsSelection;
export type TWriting = TOptionsSelection;

/**
 * Lista wybranych serii. `data.json` podaje sentinel `"all"` zamiast listy id —
 * strony zamieniają go na `data.map((item) => item.id)`.
 */
export type TSelection = (number | 'all')[];

/** Unia wszystkich akcji dostępnych w store. */
export type TAction =
  | TDataAddedAction
  | TSelectionChangedAction
  | TSyllabaryAddedAction
  | TSyllabaryChangedAction
  | TWritingAddedAction
  | TWritingChangedAction;
