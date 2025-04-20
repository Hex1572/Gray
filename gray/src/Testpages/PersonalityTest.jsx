import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../testDesign/EatingTest.css";

const questions = [
  { id: 1, text: "I see myself as someone who is talkative.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 2, text: "I see myself as someone who is reserved.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 3, text: "I see myself as someone who is outgoing, sociable.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 4, text: "I see myself as someone who tends to find fault with others.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 5, text: "I see myself as someone who is helpful and unselfish with others.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 6, text: "I see myself as someone who is relaxed, handles stress well.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 7, text: "I see myself as someone who gets nervous easily.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 8, text: "I see myself as someone who has frequent mood swings.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 9, text: "I see myself as someone who is curious about many different things.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  { id: 10, text: "I see myself as someone who is full of energy.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
];

const optionValues = {
  "Strongly Disagree": 1,
  "Disagree": 2,
  "Neutral": 3,
  "Agree": 4,
  "Strongly Agree": 5,
};

const calculatePersonality = (scores) => {
  return {
    Extraversion: scores[0] + scores[2] + scores[9],
    Agreeableness: scores[4] + (6 - scores[3]), // reverse-coded
    Neuroticism: scores[6] + scores[7],
    Openness: scores[8],
    Conscientiousness: scores[5] + (6 - scores[1]), // reverse-coded
  };
};

const traitDescriptions = {
  Extraversion:
    "Extraversion reflects how outgoing, energetic, and sociable you are. High scores indicate a preference for social situations, enthusiasm, and assertiveness.",
  Agreeableness:
    "Agreeableness indicates how compassionate and cooperative you are toward others. Higher scores reflect empathy, generosity, and kindness.",
  Neuroticism:
    "Neuroticism reflects emotional instability and how prone you are to psychological stress. Higher scores suggest sensitivity and moodiness.",
  Openness:
    "Openness describes your imagination and insight. High scores show curiosity, creativity, and a preference for variety and new experiences.",
  Conscientiousness:
    "Conscientiousness is about being organized, dependable, and goal-oriented. Higher scores indicate self-discipline, carefulness, and reliability.",
};

const PersonalityTest = () => {
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

    const scoreArray = Object.values(answers).map((ans) => optionValues[ans]);
    const personalityTraits = calculatePersonality(scoreArray);

    setResult(personalityTraits);
    setShowResult(true);
  };

  return (
    <div className="test-container">
      {!showResult ? (
        <div className="question-section">
          <h1>Personality Test (BFI-10)</h1>
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

          <button onClick={handleSubmit} className="submit-button">SUBMIT</button>

          <div className="test-source">
            <h2>Source:</h2>
            <p>
            To permit its use in
cross-cultural research, the BFI-10 was developed simultaneously in several samples in both English
and German. Results focus on the psychometric characteristics of the 2-item scales on the BFI-10,
including their part-whole correlations with the BFI-44 scales, retest reliability, structural validity,
convergent validity with the NEO-PI-R and its facets, and external validity using peer ratings. Overall, results indicate that the BFI-10 scales retain significant levels of reliability and validity

            </p>

            <a
              href="https://homepages.se.edu/cvonbergen/files/2013/01/Measuring-Personality-in-One-Minute-or-Less_A-10-Item-Short-Version-of-the-Big-Five-Inventory-in-English-and-German.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              hhttps://homepages.se.edu/cvonbergen/files/2013/01/Measuring-Personality-in-One-Minute-or-Less_A-10-Item-Short-Version-of-the-Big-Five-Inventory-in-English-and-German.pdf
            </a>

            <p><strong>Please note:</strong> Online screening tools are not diagnostic instruments. You are encouraged to share your results with a physician or healthcare provider. Mental Health Assessment and the researchers disclaim any liability, loss, or risk incurred as a consequence, directly or indirectly, from the use and application of these screens.</p>
          </div>

        </div>
      ) : (
        <div className="result-section">
          <h2>Your Personality Trait Scores</h2>
          <ul>
            {Object.entries(result).map(([trait, value]) => (
              <li key={trait}>
                <strong>{trait}:</strong> {value} <br />
                <span className="trait-description">{traitDescriptions[trait]}</span>
              </li>
            ))}
          </ul>

          <h3>Your Answers:</h3>
          <ul>
            {questions.map((q, i) => (
              <li key={q.id}>
                <strong>{i + 1}. {q.text}</strong><br />
                <span style={{ color: "#0c7db1" }}>Your answer: {answers[i]}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: "3rem", textAlign: "justify" }}>
  <strong>Please note:</strong> Online screening tools are not diagnostic instruments. You are encouraged to share your results with a physician or healthcare provider. Mental Health Assessment and the researchers disclaim any liability, loss, or risk incurred as a consequence, directly or indirectly, from the use and application of these screens.
</p>
        </div>
      )}
    </div>
  );
};

export default PersonalityTest;
