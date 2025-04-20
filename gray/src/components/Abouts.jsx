import React from "react";
import { Link } from "react-router-dom";
import "../componentDesign/About.css";

const About = ({ openModal }) => {
  const developers = [
    { name: "Jeffrey Ramirez", bio: "Team Leader" },
    { name: "Gabriela Enriquez", bio: "System Manager" },
    { name: "Marc Rainier Buitizon", bio: "Programmer" },
    { name: "Jensha Mica Maniflor", bio: "Programmer" },
  ];

  const conditions = [
   "Anxiety", "Depression",
    "Eating Disorder"
    , "Suicide", "Tardive Dyskinesia", "Trauma & PTSD", "Well-Being"
  ];

  return (
    <div className="abouts">

      {/* Mental Health Conditions */}
      <div className="about-conditions">
        <h2>Learn About Mental Health Conditions</h2>
        <ul className="conditions-list">
          {conditions.map((condition, index) => (
            <li key={index}>
              <Link
                to={`/search?condition=${encodeURIComponent(condition)}`}
                className="condition-link"
              >
                {condition}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Developers */}
      <div className="about-devs">
        <h2>About the Developers</h2>
        <div className="developers-buttons">
          {developers.map((dev, index) => (
            <button
              key={index}
              className="developer-button"
              onClick={() => openModal({ type: "developer", content: dev })}
            >
              {dev.name}
            </button>
          ))}
        </div>
      </div>

      {/* About the System */}
      <div className="about-system">
        <h2>About the System</h2>
        <p>
          This system is designed to help people in understanding and self-evaluation of their mental
          well-being using Artificial Intelligence. There are tests for anxiety, depression, general well-
          being, and personality characteristics. The scoring in different categories is analyzed via a
          logistic regression model, which further helps in classifying the results as per risk levels. An
          AI chatbot helps one in guided self-reflection; a peer support is there for enabling safe,
          anonymous sharing and encouragement. The system is designed with the perspective of user privacy,
          ethical interactions, and early detection to support overall mental well-being.
        </p>
      </div>

          

    </div>
  );
};

export default About;
