import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../testDesign/EatingTest.css";

const questions = [
  {
    id: 1,
    text: "I have felt cheerful and in good spirits.",
    options: ["At no time", "Less than half the time", "More than half the time", "Some of the time", "Most of the time", "All of the time"],
  },
  {
    id: 2,
    text: "I have felt calm and relaxed.",
    options: ["At no time", "Less than half the time", "More than half the time", "Some of the time", "Most of the time", "All of the time"],
  },
  {
    id: 3,
    text: "I have felt active and vigorous.",
    options: ["At no time", "Less than half the time", "More than half the time", "Some of the time", "Most of the time", "All of the time"],
  },
  {
    id: 4,
    text: "I woke up feeling fresh and rested.",
    options: ["At no time", "Less than half the time", "More than half the time", "Some of the time", "Most of the time", "All of the time"],
  },
  {
    id: 5,
    text: "My daily life has been filled with things that interest me.",
    options: ["At no time", "Less than half the time", "More than half the time", "Some of the time", "Most of the time", "All of the time"],
  },
];

const optionValues = {
  "At no time": 0,
  "Less than half the time": 1,
  "More than half the time": 2,
  "Some of the time": 3,
  "Most of the time": 4,
  "All of the time": 5,
};

const calculateWellBeing = (score) => {
  if (score >= 21) return { result: "Excellent Well-being – Keep up the great work!" };
  if (score >= 16) return { result: "Good Well-being – You're doing well!" };
  if (score >= 11) return { result: "Fair Well-being – Consider taking time for self-care." };
  if (score >= 6) return { result: "Poor Well-being – It's important to focus on your well-being." };
  return { result: "Very Poor Well-being – Please consider reaching out for support." };
};

const WellTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const totalScore = Object.values(answers).map((ans) => optionValues[ans]).reduce((sum, value) => sum + value, 0);
    const wellBeingResult = calculateWellBeing(totalScore);
    setResult(wellBeingResult);
    setShowResult(true);
  };

  return (
    <div className="test-container">
      {!showResult ? (
        <div className="question-section">
          <h1>Well-Being Test (WHO-5)</h1>
          {questions.map((question, index) => (
            <div key={question.id} className="question-item">
              <p>{index + 1}. {question.text}</p>
              <div className="button-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(index, option)}
                    className={`option-button ${answers[index] === option ? "selected" : ""}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit} className="submit-button">
            SUBMIT
          </button>
        </div>
      ) : (
        <div className="result-section">
          <h2>Your Result:</h2>
          <p>{result.result}</p>
        </div>
      )}
    </div>
  );
};

export default WellTest;
