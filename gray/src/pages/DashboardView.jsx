import React, { useState } from "react";
import "../pageDesign/DashboardView.css";
import TestButtons from "../components/TestButtons";
import "./PeerSupport.css";
import { Link } from "react-router-dom";
import PeerSupport from "./PeerSupport";

const DashboardView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showPeerSupport, setShowPeerSupport] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const developers = [
    { name: "Jeffrey Ramirez", bio: "Team leader" },
    { name: "Gabriella Enriquez", bio: "System Manager" },
    { name: "Marc Rainier Buitizon", bio: "Programmer" },
    { name: "Jensha Mica Maniflor", bio: "Programmer" },
  ];

  const supportCards = [
    { title: "Things to Try on Your Own", space: "Suggested Actions" },
    { title: "Connect with Others", space: "Community Support" },
    { title: "Find a Provider", space: "1-on-1 Support" },
    { title: "Learn About Support", space: "Mental Health" },
  ];

  return (
    <div className="dashboard-container">
      {!showPeerSupport ? (
        <>
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
              </p>
            </div>
          </div>

          <div className="dashboard-2">
            <p><strong>Find Support That Works for You</strong></p>
            <div className="dashboard-description2">
              <p>
                Discover ways to improve your mental wellness and connect with others.
              </p>
            </div>
            <div className="support-grid">
              {supportCards.map((card) => (
                <div
                  key={card.title}
                  className="support-card"
                  onClick={() => {
                    setShowPeerSupport(true);
                    setModalContent({ space: card.space });
                  }}
                >
                  <h3>{card.title}</h3>
                  <p>Click to explore {card.space}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="abouts">
            <div className="about-system">
              <h2>About the System</h2>
              <p>
              This system is designed to help people in understanding and self-evaluation of their mental well-being using Artificial Intelligence. There are tests for anxiety, depression, general well-being, and personality characteristics. The scoring in different categories is analyzed via a logistic regression model, which further helps in classifying the results as per risk levels. An AI chatbot helps one in guided self-reflection; a peer support is there for enabling safe, anonymous sharing and encouragement. The system is designed with the perspective of user privacy, ethical interactions, and early detection to support overall mental well-being.
              </p>
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

          <div className="dashboard-chatbot">
            <button onClick={() => setShowPeerSupport(true)} className="footer-button">
              Learn More About Peer Support
            </button>
          </div>
        </>
      ) : (
        <div className="peer-support-section">
          <PeerSupport initialSpace={modalContent?.space || "Community Support"} />
          <button onClick={() => setShowPeerSupport(false)} className="close-modal-btn">
            Back to Dashboard
          </button>
        </div>
      )}

      <div className="dashboard-chatbot">
        <Link to="/chatbot" className="footer-button">Open Chatbot</Link>
      </div>
    </div>
  );
};

export default DashboardView;
