import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../testDesign/EatingTest.styles.css"; // Import CSS for styling

// BFI-10 Questions (Big Five Inventory - 10 items)
const questions = [
  {
    id: 1,
    text: "I see myself as someone who is talkative.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 2,
    text: "I see myself as someone who is reserved.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 3,
    text: "I see myself as someone who is outgoing, sociable.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 4,
    text: "I see myself as someone who tends to find fault with others.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 5,
    text: "I see myself as someone who is helpful and unselfish with others.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 6,
    text: "I see myself as someone who is relaxed, handles stress well.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 7,
    text: "I see myself as someone who gets nervous easily.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 8,
    text: "I see myself as someone who has frequent mood swings.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 9,
    text: "I see myself as someone who is curious about many different things.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
  {
    id: 10,
    text: "I see myself as someone who is full of energy.",
    options: ["Disagree strongly", "Disagree a little", "Neither agree nor disagree", "Agree a little", "Agree strongly"],
  },
];

// Assign numerical values to options for scoring
const optionValues = {
  "Disagree strongly": 1,
  "Disagree a little": 2,
  "Neither agree nor disagree": 3,
  "Agree a little": 4,
  "Agree strongly": 5,
};

// Interpret the results based on scoring
const calculatePersonality = (scores) => {
  const traits = {
    extraversion: scores[0] + scores[2] + scores[3] + scores[5],
    agreeableness: scores[1] + scores[4],
    neuroticism: scores[6] + scores[7],
    openness: scores[8],
    conscientiousness: scores[9],
  };

  return traits;
};

const EatingTest = () => {
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
      // Calculate the scores for each personality trait
      const totalScores = Object.values(answers)
        .map((ans) => optionValues[ans])
        .reduce((sum, value) => sum + value, 0);

      // Apply personality traits interpretation
      const personalityTraits = calculatePersonality(Object.values(answers).map(ans => optionValues[ans]));

      // Set the result state
      setResult(personalityTraits);
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
        <p><li><strong>Disagree strongly:</strong> 1 point</li></p>
        <p><li><strong>Disagree a little:</strong> 2 points</li></p>
        <p><li><strong>Neither agree nor disagree:</strong> 3 points</li></p>
        <p><li><strong>Agree a little:</strong> 4 points</li></p>
        <p><li><strong>Agree strongly:</strong> 5 points</li></p>

        <h3><strong>Total Score </strong> = 10-50 points</h3>

        <h2>Interpretation</h2>
        <p><strong>Extraversion:</strong> Scores reflect sociability and energy.</p>
        <p><strong>Agreeableness:</strong> Scores reflect compassion and cooperation.</p>
        <p><strong>Neuroticism:</strong> Scores reflect emotional stability and vulnerability.</p>
        <p><strong>Openness:</strong> Scores reflect intellectual curiosity and creativity.</p>
        <p><strong>Conscientiousness:</strong> Scores reflect self-discipline and organization.</p>
        <p><strong>Note:</strong> This test is for general personality insights, not a definitive measure.</p>
      </div>

      <div className="test-instruction-card">
        <h2>Instructions</h2>
        <p>This test assesses your personality traits based on the Big Five Inventory (BFI-10). Please respond honestly to each statement.</p>
        <p>Click <strong>"Next"</strong> to move through the questions. After completing the test, you'll receive insights into your personality traits.</p>
      </div>

      <div className="test-card">
        {!showResult ? (
          <>
            <h2>EatingTest (Big Five Inventory - 10)</h2>
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
            <p><strong>Extraversion:</strong> {result.extraversion}</p>
            <p><strong>Agreeableness:</strong> {result.agreeableness}</p>
            <p><strong>Neuroticism:</strong> {result.neuroticism}</p>
            <p><strong>Openness:</strong> {result.openness}</p>
            <p><strong>Conscientiousness:</strong> {result.conscientiousness}</p>
            <button onClick={() => window.location.reload()}>Retake Test</button>
            <button onClick={() => navigate("/")}>Go Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EatingTest;
