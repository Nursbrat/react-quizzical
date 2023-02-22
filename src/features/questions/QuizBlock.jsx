import React from "react";
import { decode } from "html-entities";

export default function QuizBlock({
  question,
  updateAnswer,
  selectedAnswer,
  showResult,
  correctAnswer
}) {
  const clickAnswer = (answer, currentQuestion) => {
    updateAnswer(currentQuestion, answer);
  };
  return (
    <div className="questions__block">
      <div>
        <h2>{question.question}</h2>
        {question.shuffledOptions.map((answer, index) => (
          <ul className="questions__options">
            <button
              key={index}
              onClick={() => {
                clickAnswer(answer, question.question);
              }}
              className={`answers ${answer === selectedAnswer ? "selected" : ""}
              ${showResult && answer == question.correctAnswer ? "correct" : ""}
              ${
                showResult &&
                answer === selectedAnswer &&
                answer !== question.correctAnswer?'incorrect':''
              }
              ${showResult && answer!==correctAnswer?'dimmed':''}
              // ${showResult ?'no-hover':''}
              `}
              disabled={showResult}
            >
              { decode(answer)}
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
}
