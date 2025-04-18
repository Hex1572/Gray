import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../testDesign/EatingTest.css";

//mga tanong at mga choices ni user
const questions = [
  { id: 1, text: "Little interest or pleasure in doing things?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 2, text: "Feeling down, depressed, or hopeless?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 3, text: "Trouble falling or staying asleep, or sleeping too much?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 4, text: "Feeling tired or having little energy?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 5, text: "Poor appetite or overeating?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 6, text: "Feeling bad about yourself—or that you are a failure or have let yourself or your family down?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 7, text: "Trouble concentrating on things, such as reading the newspaper or watching television?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 8, text: "Moving or speaking so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you have been moving around a lot more than usual?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
  { id: 9, text: "Thoughts that you would be better off dead, or of hurting yourself in some way?", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
];

//scoring para sa mga choices ni user
const optionValues = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

//eto yung function at computation para sa score ni user
const getDepressionResult = (score) => {
  if (score >= 20) {
    return {
      result: "Severe Depression – Please seek professional help.",
      description: "Your score suggests severe depression. It's strongly recommended that you consult a mental health professional for a full evaluation and support. You are not alone, and there are treatments that can help.",
    };
  } else if (score >= 15) {
    return {
      result: "Moderately Severe Depression – Consider speaking with a professional.",
      description: "Your score suggests a significant level of depression. It would be beneficial to speak with a therapist or counselor to explore ways to feel better and receive appropriate care.",
    };
  } else if (score >= 10) {
    return {
      result: "Moderate Depression – Monitor and take care of yourself.",
      description: "You may be experiencing some symptoms of depression. While it may not require immediate intervention, it's important to monitor your mental health and practice good self-care. If symptoms persist, seek guidance.",
    };
  } else if (score >= 5) {
    return {
      result: "Mild Depression – Be mindful of your mental well-being.",
      description: "Your score suggests mild depression. Life stressors may be contributing, so focus on self-care and emotional wellness. If symptoms increase, consider reaching out for help.",
    };
  } else {
    return {
      result: "Minimal Depression – You're doing well.",
      description: "Your score indicates minimal or no depression symptoms. Keep taking care of your mental health and seek support if things change.",
    };
  }
};

// eto yung function na nagrerepresent sa depression test
// at kung pano nagwowork, kung ano ang mga tanong at mga choices ni user
const DepressionTest = () => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const totalScore = Object.values(answers)
      .map((answer) => optionValues[answer])
      .reduce((acc, val) => acc + val, 0);

    const evaluation = getDepressionResult(totalScore);
    setScore(totalScore);
    setResult(evaluation);
    setShowResult(true);
  };

  return (
    <div className="test-container">
      {!showResult ? (
        <div className="question-section">
          <h1>Depression Test (PHQ-9)</h1>
          {questions.map((question, index) => (
            <div key={question.id} className="question-item">
              <p>{index + 1}. {question.text}</p>
              <div className="button-options">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(index, option)}
                    className={`option-button ${
                      answers[index] === option ? "selected" : ""
                    }`}
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
          <p><strong>Score:</strong> {score} / {questions.length * 3}</p>
          <p><strong>{result.result}</strong></p>
          <p>{result.description}</p>

          <h3>Your Answers:</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={question.id}>
                <strong>{index + 1}. {question.text}</strong><br />
                <span style={{ color: "#048bb8" }}>Your answer: {answers[index]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DepressionTest;
