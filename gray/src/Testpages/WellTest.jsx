import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../testDesign/AnxietyTest.css"; // Import CSS for styling

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

// Assign numerical values to options for scoring (aligned with the six options)
const optionValues = {
  "At no time": 0,
  "Less than half the time": 1,
  "More than half the time": 2,
  "Some of the time": 3,
  "Most of the time": 4,
  "All of the time": 5,
};

// Calculate the well-being score and interpret the result
const calculateWellBeing = (score) => {
  if (score >= 21) {
    return { result: "Excellent Well-being – Keep up the great work!" };
  } else if (score >= 16) {
    return { result: "Good Well-being – You're doing well!" };
  } else if (score >= 11) {
    return { result: "Fair Well-being – Consider taking time for self-care." };
  } else if (score >= 6) {
    return { result: "Poor Well-being – It's important to focus on your well-being." };
  } else {
    return { result: "Very Poor Well-being – Please consider reaching out for support." };
  }
};

const WellTest = () => {
  const navigate = useNavigate(); // Initialize navigate function
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
      // Calculate the well-being score
      const totalScore = Object.values(answers)
        .map((ans) => optionValues[ans])
        .reduce((sum, value) => sum + value, 0);

      // Apply well-being calculation
      const wellBeingResult = calculateWellBeing(totalScore);

      // Set the result state
      setResult(wellBeingResult);
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
      <div className="test-legend-card">
        <h2>Legend</h2>
        <p><li><strong>At no time:</strong> 0 points</li></p>
        <p><li><strong>Less than half the time:</strong> 1 point</li></p>
        <p><li><strong>More than half the time:</strong> 2 points</li></p>
        <p><li><strong>Some of the time:</strong> 3 points</li></p>
        <p><li><strong>Most of the time:</strong> 4 points</li></p>
        <p><li><strong>All of the time:</strong> 5 points</li></p>

        <h3><strong>Total Score </strong> = 0-25 points</h3>

        <h2>Interpretation</h2>
        <p><li><strong>21-25:</strong> Excellent Well-being</li></p>
        <p><li><strong>16-20:</strong> Good Well-being</li></p>
        <p><li><strong>11-15:</strong> Fair Well-being</li></p>
        <p><li><strong>6-10:</strong> Poor Well-being</li></p>
        <p><li><strong>0-5:</strong> Very Poor Well-being</li></p>
        <p><strong>Note:</strong> This test is not a substitute for professional diagnosis or treatment.</p>
      </div>

      <div className="test-instruction-card">
        <h2>Instruction</h2>
        <p>This test is designed to evaluate your <strong>well-being levels</strong> using a self-assessment based on common feelings. Please answer each question honestly based on how you have felt in the <strong>last two weeks</strong>.</p>
        <p>Click <strong>"Next"</strong> to proceed through the questions. At the end of the test, you will receive a score and feedback on your well-being level.</p>

        <p>Remember, this test is not a substitute for professional help. If you are experiencing difficulties, please consider reaching out to a mental health professional.</p>
      </div>

      <div className="test-card">
        {!showResult ? (
          <>
            <h2>Well-being Test</h2>
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
                  <span>{option}</span>
                </label>
              ))}
            </div>

            {/* Question Navigation Shortcuts */}
            <div className="question-shortcuts">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  className={`question-btn ${answers[index] ? "answered" : ""} ${index === currentQuestion ? "active" : ""}`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {q.id}
                </button>
              ))}
            </div>

            <div className="button-group">
              <button onClick={handleNext} disabled={!answers[currentQuestion]}>
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </>
        ) : (
          <div className="result-section">
            <h2>Test Result</h2>
            <p><strong>Well-being Level:</strong> {result.result}</p>
            <button onClick={() => window.location.reload()}>Retake Test</button>
            <button onClick={() => navigate("/")}>Go Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellTest;
