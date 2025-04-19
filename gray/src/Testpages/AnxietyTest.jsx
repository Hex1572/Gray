import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../testDesign/EatingTest.css";

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

const optionValues = {
  "Not at all": 0,
  "Several days": 1,
  "More than half the days": 2,
  "Nearly every day": 3,
};

const logisticRegression = (score) => {
  if (score >= 15) {
    return {
      result: "Severe Anxiety – Consider professional help.",
      description:
        "Your score suggests that you may be experiencing severe anxiety. It is recommended that you seek professional help, such as a therapist or counselor. This level of anxiety can significantly impact your daily life, and treatment options such as therapy or medication may be beneficial.",
    };
  } else if (score >= 10) {
    return {
      result: "Moderate Anxiety – Keep monitoring.",
      description:
        "Your score suggests moderate anxiety. You may be experiencing stress or anxiety that is affecting your ability to relax or concentrate. It’s important to continue monitoring your mental health and consider self-care strategies or talking to a professional.",
    };
  } else if (score >= 5) {
    return {
      result: "Mild Anxiety – Be mindful of your well-being.",
      description:
        "Your score suggests mild anxiety. This level may be temporary and linked to stress or life events. Keep an eye on your emotional well-being and try practices like mindfulness, exercise, or healthy routines.",
    };
  } else {
    return {
      result: "Minimal Anxiety – Keep taking care of yourself!",
      description:
        "Your score indicates minimal anxiety, which is great. While stress is normal, your levels seem manageable. Continue your healthy habits and watch for any changes.",
    };
  }
};

const AnxietyTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all the questions before submitting.");
      return;
    }

    const totalScore = Object.values(answers)
      .map((ans) => optionValues[ans])
      .reduce((sum, value) => sum + value, 0);

    const anxietyResult = logisticRegression(totalScore);
    setScore(totalScore);
    setResult(anxietyResult);
    setShowResult(true);
  };

  return (
    <div className="test-container">
      <h1>Anxiety Test (GAD-7)</h1>

      {!showResult ? (
        <div className="question-section">
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


          <div className="test-source">
            <h2>Source:</h2>
            <p>
            Primary Care Evaluation of Mental Disorders Patient Health Questionnaire (PRIME-MD-PHQ). The PHQ was
developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke, and colleagues. For research information, contact Dr.
Spitzer at ris8@columbia.edu. PRIME-MD® is a trademark of Pfizer Inc. Copyright© 1999 Pfizer Inc. All rights reserved.
Reproduced with permission

            </p>

            <a
              href="https://adaa.org/sites/default/files/GAD-7_Anxiety-updated_0.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://adaa.org/sites/default/files/GAD-7_Anxiety-updated_0.pdf
            </a>

            <p><strong>Please note:</strong> Online screening tools are not diagnostic instruments. You are encouraged to share your results with a physician or healthcare provider. Mental Health America Inc., sponsors, partners, and advertisers disclaim any liability, loss, or risk incurred as a consequence, directly or indirectly, from the use and application of these screens.</p>
          </div>

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
                <span style={{ color: "#048bb8" }}>
                  Your answer: {answers[index]}
                </span>
              </li>
            ))}
          </ul>
      
          <p style={{ marginTop: "3rem", textAlign: "justify" }}>
  <strong>Please note:</strong> Online screening tools are not diagnostic instruments. You are encouraged to share your results with a physician or healthcare provider. Mental Health America Inc., sponsors, partners, and advertisers disclaim any liability, loss, or risk incurred as a consequence, directly or indirectly, from the use and application of these screens.
</p>
        </div>
      )}
    </div>
  );
};

export default AnxietyTest;
