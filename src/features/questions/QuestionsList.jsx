import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuizBlock from "./QuizBlock";
import { fetchQuestions } from "./QuizSlice";
import Confetti from "react-confetti";

function Quiz() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  useEffect(() => {
    setQuestionsAndAnswers(questions);
  }, [questions]);

  const updateAnswer = (currentQuestion, answer) => {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  };

  const checkAnswer = () => {
    const notAllAnswered = questionsAndAnswers.every(
      (questionObject) => questionObject.selectedAnswer === ""
    );
    setShowWarning(notAllAnswered);
    if (!notAllAnswered) {
      questionsAndAnswers.forEach((questionObject) => {
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          setNumCorrectAnswers((prev) => prev + 1);
        }
      });
      console.log();
      setShowResult(true);
    }
  };

  const playAgain = () => {
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswers(0);
    setQuestionsAndAnswers(questions);
  };
  return (
    <div>
      {questions.length === 0 && <h2>Loading questions...</h2>}
      {questions.length > 0 &&
        questionsAndAnswers.map((question, index) => (
          <QuizBlock
            question={question}
            key={index}
            updateAnswer={updateAnswer}
            selectedAnswer={question.selectedAnswer}
            correctAnswer={question.correctAnswer}
            showResult={showResult}
          />
        ))}
      <div className="text-center">
        {showWarning && (
          <p className="warning-message">
            There are questions not answered yet
          </p>
        )}

        {questions.length > 0 && !showResult ? (
          <button className="button" onClick={checkAnswer}>
            Check answers
          </button>
        ) : null}
      </div>
      {numCorrectAnswers ===10 && <Confetti className="confetti"/>}
      {showResult && (
        <div className="result-container text-center">
          <p className="result-message">
            You scored {numCorrectAnswers}/10 correct answers
          </p>
          <button className="button" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
