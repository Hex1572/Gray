import React, { useState } from "react";
import "../testDesign/AnxietyTest.css"; // Import CSS for styling

const questions = [
  {
    id: 1,
    text: "How often do you feel nervous, anxious, or on edge?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 2,
    text: "How often do you have trouble relaxing?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 3,
    text: "Do you find yourself worrying excessively about different things?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 4,
    text: "Do you experience sudden feelings of panic or fear?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
  {
    id: 5,
    text: "How often do you have trouble sleeping due to anxiety?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  },
];

// Assign numerical values to options for logistic regression
const optionValues = {
  Never: 0,
  Rarely: 1,
  Sometimes: 2,
  Often: 3,
  Always: 4,
};

const logisticRegression = (score) => {
  if (score >= 14) {
    return { result: "High Anxiety – Consider professional help." };
  } else if (score >= 7) {
    return { result: "Moderate Anxiety – Keep monitoring." };
  } else {
    return { result: "Low Anxiety – Keep taking care of yourself!" };
  }
};

const AnxietyTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);

  const handleOptionChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestion]: event.target.value,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate the anxiety score
      const totalScore = Object.values(answers)
        .map((ans) => optionValues[ans])
        .reduce((sum, value) => sum + value, 0);

      // Apply Logistic Regression
      const anxietyResult = logisticRegression(totalScore);

      // Set the result state
      setResult(anxietyResult);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <div className="test-container">
      <div className="test-card">
        {!showResult ? (
          <>
            <h2>Anxiety Test</h2>
            <p>{questions[currentQuestion].text}</p>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* Question Navigation Shortcuts */}
            <div className="question-shortcuts">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  className={`question-btn ${answers[index] ? "answered" : ""} ${
                    index === currentQuestion ? "active" : ""
                  }`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {q.id}
                </button>
              ))}
            </div>

            <div className="button-group">
            <button onClick={() => window.location.assign("/anxiety")}>Go Back</button>
              <button onClick={handleNext} disabled={!answers[currentQuestion]}>
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </>
        ) : (
          <div className="result-section">
            <h2>Test Result</h2>
            <p><strong>Anxiety Level:</strong> {result.result}</p>
            <button onClick={() => window.location.reload()}>Retake Test</button>
            <button onClick={() => window.location.assign("/")}>Go Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnxietyTest;
