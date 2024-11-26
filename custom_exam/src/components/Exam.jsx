import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate
import dummyQuestions from "../components/dummyQuestions";
import "./Exam.css";

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();  // Initialize useNavigate
  const [timer, setTimer] = useState(900); // 15 minutes in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // To store user's answers

  // Timer Logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: event.target.value,
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = () => {
    const totalQuestions = dummyQuestions.length;
    const correctAnswers = dummyQuestions.filter(
      (q, index) => q.correct_answer === answers[index]
    ).length;

    // Redirect to results page with the score as a query parameter
    navigate("/result", { state: { score: correctAnswers, total: totalQuestions } });
  };

  const currentQuestion = dummyQuestions[currentQuestionIndex];

  return (
    <div className="exam-container">
      <header className="exam-header">
        <h2>Exam Page</h2>
        <p>Exam ID: {examId}</p>
        <p className="timer">Time Remaining: {formatTime(timer)}</p>
      </header>

      <div className="question-container">
        <h3 className="question-text">
          Q{currentQuestionIndex + 1}: {currentQuestion.question_text}
        </h3>
        <div className="options-container">
          {["a", "b", "c", "d"].map((optionKey) => {
            const optionValue = currentQuestion[`option_${optionKey}`];
            if (!optionValue) return null;
            return (
              <label key={optionKey} className="option-label">
                <input
                  type="radio"
                  name="option"
                  value={optionKey.toUpperCase()}
                  checked={answers[currentQuestionIndex] === optionKey.toUpperCase()}
                  onChange={handleOptionChange}
                />
                {optionKey.toUpperCase()}. {optionValue}
              </label>
            );
          })}
        </div>
      </div>

      <footer className="exam-footer">
        <button
          className="btn"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < dummyQuestions.length - 1 ? (
          <button className="btn btn-next" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="btn btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </footer>
    </div>
  );
};

export default Exam;
