import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import CheckboxSwitch from "./CheckboxSwitch";
import CorrectFeedback from "./CorrectFeedback";
import Distractors from "./Distractors";
import GameOver from "./GameOver";
import IncorrectFeedback from "./IncorrectFeedback";
import ListSeries from "./ListSeries";
import SelectionHint from "./SelectionHint";
import Stars from "./Stars";
import type { TAnsweredQuestion } from "./types";
import { seriesFixture } from "../test/fixtures";

describe("Stars", () => {
  it("renders three grade icons, the middle one bigger", () => {
    const { container } = render(<Stars />);

    expect(container.querySelector(".stars")).not.toBeNull();
    expect(container.querySelectorAll("svg#icon-grade")).toHaveLength(3);
    expect(container.querySelectorAll(".stars .size-large")).toHaveLength(1);
    expect(container.querySelectorAll(".stars .size-medium")).toHaveLength(2);
  });
});

describe("CorrectFeedback", () => {
  it("renders the message with three stars", () => {
    const { container } = render(<CorrectFeedback message={"Excellent!"} />);

    expect(container.querySelector(".feedback.correct")).not.toBeNull();
    expect(container.querySelector(".feedback .message")).toHaveTextContent(
      "Excellent!",
    );
    expect(container.querySelectorAll(".feedback .stars svg")).toHaveLength(3);
  });
});

describe("IncorrectFeedback", () => {
  it("renders the message and the correct answer", () => {
    const { container } = render(
      <IncorrectFeedback
        message={"Incorrect!"}
        correct={["Correct answer is: ", <span key="answer">あ</span>]}
      />,
    );

    expect(container.querySelector(".feedback.incorrect")).not.toBeNull();
    expect(container.querySelector(".feedback .message")).toHaveTextContent(
      "Incorrect!",
    );
    expect(
      container.querySelector(".feedback .correct-answer"),
    ).toHaveTextContent("Correct answer is: あ");
    expect(container.querySelectorAll(".feedback .mood svg")).toHaveLength(3);
  });
});

describe("Distractors", () => {
  const answerOptions = ["あ", "い", "う", "え"];

  it("renders one button per answer option with a stable id", () => {
    const { container } = render(<Distractors answerOptions={answerOptions} />);

    expect(container.querySelectorAll(".distractors button")).toHaveLength(4);

    answerOptions.forEach((option, index) => {
      const button = container.querySelector(`#answer-${index}`);

      expect(button).not.toBeNull();
      expect(button).toHaveTextContent(option);
    });
  });

  it("reports the clicked option together with its button id", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <Distractors answerOptions={answerOptions} handleClick={handleClick} />,
    );

    fireEvent.click(container.querySelector("#answer-2") as HTMLElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith("う", "answer-2");
  });

  it("adds the hidden button class when the hint was used", () => {
    const { container } = render(
      <Distractors answerOptions={answerOptions} hideButtonId="answer-1" />,
    );

    expect(container.querySelector(".distractors")).toHaveClass(
      "distractors",
      "hide-answer-1",
    );
  });

  it("renders no buttons without answer options", () => {
    const { container } = render(<Distractors />);

    expect(container.querySelectorAll(".distractors button")).toHaveLength(0);
  });
});

describe("ListSeries", () => {
  it("renders every series with its label and kana", () => {
    const { container } = render(
      <ListSeries className="row" data={seriesFixture} selection={[]} />,
    );

    const items = container.querySelectorAll(".row.list-series li.option");

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveClass("option", "even");
    expect(items[1]).toHaveClass("option", "odd");
    expect(items[0].querySelector(".label")).toHaveTextContent("Vowels");
    expect(items[0].querySelector(".kana")).toHaveTextContent("あいうえお");
  });

  it("marks the selected series and reports clicks with the current state", () => {
    const onItemClicked = vi.fn();
    const { container } = render(
      <ListSeries
        data={seriesFixture}
        selection={[1]}
        onItemClicked={onItemClicked}
      />,
    );

    const items = container.querySelectorAll("li.option");

    expect(items[0]).not.toHaveClass("selected");
    expect(items[1]).toHaveClass("selected");
    expect(items[2]).not.toHaveClass("selected");

    fireEvent.click(items[0] as HTMLElement);
    expect(onItemClicked).toHaveBeenCalledWith(0, false);

    fireEvent.click(items[1] as HTMLElement);
    expect(onItemClicked).toHaveBeenCalledWith(1, true);
  });

  it("treats the `all` selection as everything selected", () => {
    const { container } = render(
      <ListSeries data={seriesFixture} selection={["all"]} />,
    );

    expect(container.querySelectorAll("li.option.selected")).toHaveLength(3);
  });

  it("renders an empty list without data", () => {
    const { container } = render(<ListSeries />);

    expect(container.querySelectorAll("li")).toHaveLength(0);
  });
});

describe("CheckboxSwitch", () => {
  it("reflects the checked state and reports the opposite on change", () => {
    const onChecked = vi.fn();
    const { container, rerender } = render(
      <CheckboxSwitch
        id="writing-switch"
        isChecked={false}
        onChecked={onChecked}
        labelOn="Kana"
        labelOff="Romaji"
        iconOn="カ"
        iconOff="Ro"
      />,
    );

    const input = container.querySelector(
      "#writing-switch",
    ) as HTMLInputElement;

    expect(
      container.querySelector(".onoffswitch.writing-switch"),
    ).not.toBeNull();
    expect(input.checked).toBe(false);
    expect(
      container.querySelector(".onoffswitch-inner .before"),
    ).toHaveTextContent("Kana");
    expect(
      container.querySelector(".onoffswitch-inner .after"),
    ).toHaveTextContent("Romaji");

    fireEvent.click(input);

    expect(onChecked).toHaveBeenCalledTimes(1);
    expect(onChecked).toHaveBeenCalledWith(true);

    rerender(
      <CheckboxSwitch
        id="writing-switch"
        isChecked={true}
        onChecked={onChecked}
      />,
    );

    expect(input.checked).toBe(true);

    fireEvent.click(input);

    expect(onChecked).toHaveBeenLastCalledWith(false);
  });

  it("falls back to the default labels and icons", () => {
    const { container } = render(<CheckboxSwitch />);

    const inner = container.querySelectorAll(".onoffswitch-inner span");

    expect(inner[0]).toHaveTextContent("ON");
    expect(inner[1]).toHaveTextContent("OFF");
    expect(
      container.querySelector(".onoffswitch-switch .before"),
    ).toHaveTextContent("+");
    expect(
      container.querySelector(".onoffswitch-switch .after"),
    ).toHaveTextContent("-");
  });
});

describe("SelectionHint", () => {
  it("replaces both placeholders with the counted values", () => {
    const { container } = render(
      <SelectionHint
        className="stats"
        data={seriesFixture}
        selection={[0, 2]}
        pattern={"It is selected {k} Kana of {s} series."}
      />,
    );

    expect(container.querySelector(".selection-hint.stats")).toHaveTextContent(
      "It is selected 10 Kana of 2 series.",
    );
  });

  it("keeps the pattern untouched when there is no placeholder", () => {
    const { container } = render(
      <SelectionHint data={seriesFixture} selection={[]} pattern={"Empty"} />,
    );

    expect(container.querySelector(".selection-hint")).toHaveTextContent(
      "Empty",
    );
    expect(container.querySelector(".selection-hint")).not.toHaveClass("stats");
  });
});

describe("GameOver", () => {
  const answered: TAnsweredQuestion[] = [
    {
      question: "a",
      correct: "あ",
      answerOptions: ["あ", "い", "う", "え"],
      userAnswer: { isCorrect: true, answer: "あ" },
    },
    {
      question: "i",
      correct: "い",
      answerOptions: ["あ", "い", "う", "え"],
      userAnswer: { isCorrect: false, answer: "う" },
    },
  ];

  it("congratulates when every answer was correct", () => {
    const { container } = render(<GameOver data={[answered[0]]} />);

    expect(container.querySelector(".congratulation")).not.toBeNull();
    expect(container.querySelector(".go-incorrect-list")).toBeNull();
    expect(
      screen.getByText(
        "Well done, you've answered correctly on all questions.",
      ),
    ).toBeInTheDocument();
  });

  it("lists the incorrect answers with the user and the correct one", () => {
    const { container } = render(<GameOver data={answered} />);

    expect(container.querySelector(".congratulation")).toBeNull();
    expect(container.querySelector(".go-list-title")).toHaveTextContent(
      "Incorrect answers:",
    );

    const items = container.querySelectorAll(".go-incorrect-list li");

    expect(items).toHaveLength(1);
    expect(items[0].querySelector(".go-question")).toHaveTextContent("i");
    expect(items[0].querySelector(".go-your-answer-value")).toHaveTextContent(
      "う",
    );
    expect(
      items[0].querySelector(".go-correct-answer-value"),
    ).toHaveTextContent("い");
  });
});
