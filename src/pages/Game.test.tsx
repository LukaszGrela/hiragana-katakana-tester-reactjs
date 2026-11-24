import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import dataAdded from "../actions/dataAdded";
import selectionChanged from "../actions/selectionChanged";
import syllabaryAdded from "../actions/syllabaryAdded";
import syllabaryChanged from "../actions/syllabaryChanged";
import writingAdded from "../actions/writingAdded";
import writingChanged from "../actions/writingChanged";
import reducer from "../reducers";
import type { TSelection } from "../store/types";
import {
  gameSeriesFixture,
  syllabaryFixture,
  writingFixture,
} from "../test/fixtures";
import Game from "./Game";

type TGameOptions = {
  selection?: TSelection;
  syllabary?: number;
  writing?: number;
};

/**
 * Deterministic `Math.random` so the shuffled questions and answers are stable
 * between runs (the game shuffles both pools).
 */
const seededRandom = (seed: number) => {
  let state = seed;

  return () => {
    state = (state * 1103515245 + 12345) % 2147483648;

    return state / 2147483648;
  };
};

const renderGame = ({
  selection = [0],
  syllabary = 0,
  writing = 0,
}: TGameOptions = {}) => {
  const store = createStore(reducer);

  store.dispatch(dataAdded(gameSeriesFixture));
  store.dispatch(syllabaryAdded(syllabaryFixture));
  store.dispatch(writingAdded(writingFixture));
  store.dispatch(syllabaryChanged(syllabary));
  store.dispatch(writingChanged(writing));
  store.dispatch(selectionChanged(selection));

  const view = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/menu", "/game"]} initialIndex={1}>
        <Routes>
          <Route path="/menu" element={<div>menu page</div>} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  return { store, ...view };
};

const questionText = (container: HTMLElement) =>
  container.querySelector(".question")?.textContent?.trim() ?? "";

const scoreText = (container: HTMLElement) =>
  container.querySelector(".score")?.textContent?.trim() ?? "";

const progressText = (container: HTMLElement) =>
  container.querySelector(".progress")?.textContent?.trim() ?? "";

const answerButtons = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll<HTMLButtonElement>(".distractors button"),
  );

/** The question is romaji, the correct answer is the kana at the same index. */
const correctAnswerFor = (question: string) => {
  const index = gameSeriesFixture[0].source.romaji.indexOf(question);

  expect(index).toBeGreaterThanOrEqual(0);

  return gameSeriesFixture[0].source.hiragana[index];
};

const clickAnswer = (container: HTMLElement, kana: string) => {
  const button = answerButtons(container).find(
    (item) => item.textContent?.trim() === kana,
  );

  expect(button).toBeDefined();
  fireEvent.click(button as HTMLButtonElement);
};

beforeEach(() => {
  vi.spyOn(Math, "random").mockImplementation(seededRandom(2026));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Game page", () => {
  it("starts on the first of five questions with five answers", () => {
    const { container } = renderGame();

    const question = questionText(container);

    expect(container.querySelector(".game")).not.toBeNull();
    expect(progressText(container)).toBe("1 / 5");
    expect(scoreText(container)).toBe("0");
    expect(gameSeriesFixture[0].source.romaji).toContain(question);
    expect(answerButtons(container)).toHaveLength(5);
    expect(container.querySelector(".next-question-button")).toBeNull();
  });

  it("counts a correct answer and offers the next question", () => {
    const { container } = renderGame();

    const correct = correctAnswerFor(questionText(container));

    clickAnswer(container, correct);

    expect(container.querySelector(".game")).toHaveClass("correct");
    expect(container.querySelector(".popup-container")).toHaveClass("correct");
    expect(container.querySelector(".feedback.correct")).not.toBeNull();
    expect(screen.getByText("Excellent!")).toBeInTheDocument();
    expect(scoreText(container)).toBe("1");
    expect(container.querySelector(".next-question-button")).not.toBeNull();
    expect(container.querySelector(".replay-button")).toBeNull();
  });

  it("reveals the correct answer after a wrong answer", () => {
    const { container } = renderGame();

    const correct = correctAnswerFor(questionText(container));
    const wrong = answerButtons(container).find(
      (item) => item.textContent?.trim() !== correct,
    ) as HTMLButtonElement;

    fireEvent.click(wrong);

    expect(container.querySelector(".game")).toHaveClass("incorrect");
    expect(container.querySelector(".popup-container")).toHaveClass(
      "incorrect",
    );
    expect(screen.getByText("Incorrect!")).toBeInTheDocument();
    expect(container.querySelector(".correct-answer")).toHaveTextContent(
      `Correct answer is: ${correct}`,
    );
    expect(scoreText(container)).toBe("0");
  });

  it("does not change the answer after the first click", () => {
    const { container } = renderGame();

    const correct = correctAnswerFor(questionText(container));
    const wrong = answerButtons(container).find(
      (item) => item.textContent?.trim() !== correct,
    ) as HTMLButtonElement;

    fireEvent.click(wrong);
    fireEvent.click(
      answerButtons(container).find(
        (item) => item.textContent?.trim() === correct,
      ) as HTMLButtonElement,
    );

    expect(container.querySelector(".game")).toHaveClass("incorrect");
    expect(scoreText(container)).toBe("0");
  });

  it("moves to the next question after Next", () => {
    const { container } = renderGame();

    clickAnswer(container, correctAnswerFor(questionText(container)));
    fireEvent.click(
      container.querySelector(".next-question-button") as Element,
    );

    expect(progressText(container)).toBe("2 / 5");
    expect(container.querySelector(".popup-container")).toBeNull();
    expect(container.querySelector(".game")).not.toHaveClass("correct");
    expect(answerButtons(container)).toHaveLength(5);
  });

  it("hides one wrong answer and disables the hint afterwards", () => {
    const { container } = renderGame();

    const correct = correctAnswerFor(questionText(container));
    const hint = container.querySelector(".hint button") as HTMLButtonElement;

    expect(hint).not.toBeDisabled();

    fireEvent.click(hint);

    const distractors = container.querySelector(".distractors") as HTMLElement;
    const hiddenIndex = Number(
      distractors.className.replace(/^.*hide-answer-/, ""),
    );

    expect(distractors.className).toMatch(/hide-answer-\d/);
    expect(answerButtons(container)[hiddenIndex]).not.toBeNull();
    expect(answerButtons(container)[hiddenIndex].textContent?.trim()).not.toBe(
      correct,
    );
    expect(hint).toBeDisabled();
    expect(scoreText(container)).toBe("0");
  });

  it("ends the game after the last question", () => {
    const { container } = renderGame();

    for (let i = 1; i <= 5; i += 1) {
      clickAnswer(container, correctAnswerFor(questionText(container)));

      expect(scoreText(container)).toBe(String(i));

      fireEvent.click(
        container.querySelector(".next-question-button") as Element,
      );
    }

    expect(container.querySelector(".popup-title")).toHaveTextContent(
      "Game Over!",
    );
    expect(container.querySelector(".congratulation")).not.toBeNull();
    expect(
      screen.getByText(
        "Well done, you've answered correctly on all questions.",
      ),
    ).toBeInTheDocument();
    expect(container.querySelector(".replay-button")).not.toBeNull();
    expect(container.querySelector(".menu-button")).not.toBeNull();
    expect(container.querySelector(".next-question-button")).toBeNull();
  });

  it("lists the wrong answers at the end of the game", () => {
    const { container } = renderGame();

    for (let i = 0; i < 5; i += 1) {
      const correct = correctAnswerFor(questionText(container));

      // answer the first question wrong, the rest correctly
      const button =
        i === 0
          ? (answerButtons(container).find(
              (item) => item.textContent?.trim() !== correct,
            ) as HTMLButtonElement)
          : (answerButtons(container).find(
              (item) => item.textContent?.trim() === correct,
            ) as HTMLButtonElement);

      fireEvent.click(button);
      fireEvent.click(
        container.querySelector(".next-question-button") as Element,
      );
    }

    expect(container.querySelector(".go-list-title")).toHaveTextContent(
      "Incorrect answers:",
    );
    expect(container.querySelectorAll(".go-incorrect-list li")).toHaveLength(1);
    expect(scoreText(container)).toBe("4");
  });

  it("restarts with the Again button", () => {
    const { container } = renderGame();

    for (let i = 0; i < 5; i += 1) {
      clickAnswer(container, correctAnswerFor(questionText(container)));
      fireEvent.click(
        container.querySelector(".next-question-button") as Element,
      );
    }

    fireEvent.click(container.querySelector(".replay-button") as Element);

    expect(progressText(container)).toBe("1 / 5");
    expect(scoreText(container)).toBe("0");
    expect(container.querySelector(".popup-container")).toBeNull();
    expect(answerButtons(container)).toHaveLength(5);
  });

  it("returns to the previous page with the Menu button", () => {
    const { container } = renderGame();

    for (let i = 0; i < 5; i += 1) {
      clickAnswer(container, correctAnswerFor(questionText(container)));
      fireEvent.click(
        container.querySelector(".next-question-button") as Element,
      );
    }

    fireEvent.click(container.querySelector(".menu-button") as Element);

    expect(screen.getByText("menu page")).toBeInTheDocument();
  });

  it("asks romaji and expects katakana when katakana is selected", () => {
    const { container } = renderGame({ syllabary: 1 });

    const question = questionText(container);
    const index = gameSeriesFixture[0].source.romaji.indexOf(question);

    expect(index).toBeGreaterThanOrEqual(0);

    clickAnswer(container, gameSeriesFixture[0].source.katakana[index]);

    expect(scoreText(container)).toBe("1");
    expect(container.querySelector(".game")).toHaveClass("correct");
  });

  it("asks kana and expects romaji when the kana test is selected", () => {
    const { container } = renderGame({ writing: 1 });

    const question = questionText(container);
    const index = gameSeriesFixture[0].source.hiragana.indexOf(question);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(answerButtons(container)).toHaveLength(5);

    clickAnswer(container, gameSeriesFixture[0].source.romaji[index]);

    expect(scoreText(container)).toBe("1");
    expect(container.querySelector(".game")).toHaveClass("correct");
  });
});
