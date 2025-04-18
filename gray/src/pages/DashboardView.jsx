import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../pageDesign/DashboardView.css"; 
import TestButtons from "../components/TestButtons"; 

const DashboardView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  //names and details, di pa tapos to, lalagyan ko pa ng details to
  const developers = [
    {
      name: "Jeffrey Ramirez",
      bio: "Team leader"
    },
    {
      name: "Gabriella Enriquez",
      bio: "System Manager"
    },
    {
      name: "Marc Rainier Buitizon",
      bio: "Programmer"
    },
    {
      name: "Jensha Mica Maniflor",
      bio: "Programmer"
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-1">
        <div id="title1">
          <strong>Why is mental health important?</strong>
        </div>





        <div className="dashboard-description1">
          <p>
            Mental health is important because it affects every part of your life—how you think,
            feel, and act. It influences how you handle stress, relate to others, and make choices.
            When your mental health is in a good place, you're better able to:
          </p>
          <ul>
            <li>Handle stress and challenges</li>
            <li>Build and maintain relationships</li>
            <li>Make informed decisions</li>
            <li>Achieve your goals</li>
            <li>Contribute to your community</li>
          </ul>
        </div>
      </div>

      <div className="dashboard-buttons">
        <TestButtons />
      </div>




      <div className="dashboard-2">
        <p><strong>What is mental health?</strong></p>
        <div className="dashboard-description2">
          <p>
            Mental health refers to a person’s emotional, psychological, and social well-being.
            It influences how individuals think, feel, and behave, especially in response to stress,
            relationships, and daily challenges. Good mental health allows people to cope with
            the normal stresses of life, work productively, and build meaningful relationships.
            It also plays a vital role in decision-making, self-confidence, and emotional resilience.
            Mental health is important at every stage of life from childhood through adulthood.
            When someone's mental health is compromised, it can lead to difficulties such as anxiety,
            depression, or other mental health disorders, which may affect their ability to function
            day-to-day. Just like physical health, mental health needs care and attention. Maintaining
            it involves healthy lifestyle choices, emotional support, and sometimes professional help.
            Promoting mental well-being isn't only about avoiding illness—it's about creating a balanced, fulfilling life.
          </p>
        </div>
      </div>



   



      <div className="abouts">
        <div className="about-system">
          <h2>About the System</h2>
          <p>This system is designed to help people in understanding and self-evaluation of their mental well-being using Artificial Intelligence. There are tests for anxiety, depression, general well-being, and personality characteristics. The scoring in different categories is analyzed via a logistic regression model, which further helps in classifying the results as per risk levels. An AI chatbot helps one in guided self-reflection; a peer support is there for enabling safe, anonymous sharing and encouragement. The system is designed with the perspective of user privacy, ethical interactions, and early detection to support overall mental well-being.</p>
        </div>






        <div className="about-devs">
          <h2>About the Developers</h2>
          <div className="developers-buttons">
            {developers.map((developer, index) => (
              <button 
                key={index}
                className="developer-button"
                onClick={() => openModal({ type: "developer", content: developer })}
              >
                {developer.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && modalContent?.type === "developer" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalContent.content.name}</h3>
            <p>{modalContent.content.bio}</p>
            <button onClick={closeModal} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}

{isModalOpen && modalContent?.type === "peerSupport" && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>Peer Support Interventions (PSIs)</h3>
      <p>
        Peer Support Interventions (PSIs) are structured forms of support provided by individuals who have experienced mental health challenges such as anxiety, depression, or personality-related conditions. These interventions are widely recognized for their powerful role in promoting mental well-being. PSIs have been shown to:
      </p>
      <ul>
        <li><strong>Reduce clinical symptoms</strong> by providing emotional support and understanding from peers with lived experience.</li>
        <li><strong>Enhance personal recovery</strong> through shared strategies, empowerment, and goal-setting support.</li>
        <li><strong>Improve hope and resilience</strong> among individuals struggling with mental health conditions.</li>
        <li><strong>Support personality growth</strong> by helping individuals rebuild identity and self-esteem in a safe, empathetic space.</li>
        <li><strong>Promote overall well-being</strong> by fostering connection, reducing isolation, and encouraging self-compassion.</li>
      </ul>
      <p>
        PSIs offer a unique and valuable layer of support by creating a sense of community and belonging. They complement professional mental health services and are especially impactful in helping people feel heard, understood, and empowered on their journey to recovery.
      </p>
      <button onClick={closeModal} className="close-modal-btn">Close</button>
    </div>
  </div>
)}

      <div className="dashboard-chatbot">
        <Link to="/chatbot" className="footer-button">Open Chatbot</Link>
        <button onClick={() => openModal({ type: "peerSupport" })} className="footer-button">
          Learn More About Peer Support
        </button>
      </div>
    </div>
  );
};

export default DashboardView;
