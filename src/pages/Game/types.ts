import type { NavigateFunction } from "react-router-dom";
import type { TAnsweredQuestion } from "../../components/types";
import type { TSyllabarySeries, TSyllabary, TWriting } from "../../store/types";

export type TQuestion = {
  correct: string;
  question: string;
  distractors: string[];
};

export type TCurrentQuestion = TQuestion & {
  answerOptions?: string[];
  userAnswer?: TAnsweredQuestion["userAnswer"];
};

export type TGameState = {
  questions: TQuestion[];
  current: Partial<TCurrentQuestion>;
  index: number;
  score: number;
  correct: boolean | null;
  selectedBtnId: string | null;
  gameOver: boolean;
  hintUsed: boolean;
  hideButtonId: string | null;
  showPopup?: boolean;
};

export type TGameProps = {
  selection: number[];
  data: TSyllabarySeries;
  syllabary: TSyllabary;
  writing: TWriting;
  navigate: NavigateFunction;
};
