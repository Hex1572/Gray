import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../testDesign/AnxietyTest.css"; // Import CSS for styling

const questions = [
  {
    id: 1,
    text: "Feeling nervous, anxious, or on edge?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 2,
    text: "Not being able to stop or control worrying?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 3,
    text: "Worrying too much about different things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 4,
    text: "Trouble relaxing?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 5,
    text: "Being so restless that it is hard to sit still?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 6,
    text: "Becoming easily annoyed or irritable?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
  {
    id: 7,
    text: "Feeling afraid as if something awful might happen?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },
];

// Assign numerical values to options for logistic regression
const optionValues = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

const logisticRegression = (score) => {
  if (score >= 15) {
    return { result: "Severe Anxiety – Consider professional help." };
  } else if (score >= 10) {
    return { result: "Moderate Anxiety – Keep monitoring." };
  } else if (score >= 5) {
    return { result: "Mild Anxiety – Be mindful of your well-being." };
  } else {
    return { result: "Minimal Anxiety – Keep taking care of yourself!" };
  }
};

const AnxietyTest = () => {
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


      <div className="test-legend-card"> 
        <h2>Legend</h2>
        <p><li><strong>Not at all:</strong> 0 points</li></p> 
        <p><li><strong>Several days:</strong> 1 point</li></p>
        <p><li><strong>More than half the days:</strong> 2 points</li></p>
        <p><li><strong>Nearly every day:</strong> 3 points</li></p>
        
        <h3><strong>Total Score </strong> = 0-21 points</h3>
        <h2>Interpretation</h2>
        <p><li><strong>0-4:</strong> Minimal Anxiety</li></p>
        <p><li><strong>5-9:</strong> Mild Anxiety</li></p>
        <p><li><strong>10-14:</strong> Moderate Anxiety</li></p>
        <p><li><strong>15-21:</strong> Severe Anxiety</li></p>
        <p><strong>Note:</strong> This test is not a substitute for professional diagnosis or treatment.</p>
      </div>




      <div className="test-instruction-card">
        <h2>Instruction</h2>
        <p>This test is designed to evaluate your <strong>anxiety levels</strong>. Please answer each question honestly based on how you have felt in the <strong>last two weeks</strong>.</p>
        <p>Click <strong>"Next"</strong> to proceed through the questions. At the end of the test, you will receive a score and feedback on your anxiety level.</p>

        <p>Remember, this test is not a substitute for professional help. If you are experiencing significant anxiety, please consider reaching out to a mental health professional.</p>
      </div>





      <div className="test-card">
        {!showResult ? (
          <>
            <h2>Anxiety Test (GAD-7)</h2>
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
            <button onClick={() => navigate("/")}>Go Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnxietyTest;
