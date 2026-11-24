import "./css/Distractors.css";

export type TDistractorsProps = {
  answerOptions?: string[];
  hideButtonId?: string;
  handleClick?: (item: string, id: string) => void;
};

const Distractors = ({
  answerOptions,
  hideButtonId,
  handleClick,
}: TDistractorsProps) => {
  const clickHandler = (item: string, id: string) => () =>
    handleClick && handleClick(item, id);
  const generateAnswers = (options?: string[]) =>
    options &&
    options.map((item, index) => (
      <button
        key={item}
        id={`answer-${index}`}
        onClick={clickHandler(item, `answer-${index}`)}
      >
        {item}
      </button>
    ));
  return (
    <div
      className={`distractors${hideButtonId ? ` hide-${hideButtonId}` : ""}`}
    >
      {generateAnswers(answerOptions)}
    </div>
  );
};

export default Distractors;
