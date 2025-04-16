import React from "react";
import "../pageDesign/DashboardView.css"; // Import CSS for styling
import TestButtons from "../components/TestButtons"; // Adjust the path if needed

const DashboardView = () => {
  return (
    <div className="dashboard-container">
      
      <div className="dashboard-1">


        <div id="title1">
          <p></p><strong>Why is mental health important?</strong><p></p>
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


      {/* Insert TestButtons here */}
      <div className="dashboard-buttons">
        <TestButtons />
      </div>

      <div className="dashboard-2">
        <p><strong>What is mental health?</strong></p>
      

      <div className="dashboard-description2">
        <ul>
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
        </ul>
      </div>
      </div>
     
  
<div className="abouts">
    
          <div className="about-system">
            <h2>About the System</h2>
            <p>This system is designed to support individuals...</p>
          </div>

     
          <div className="about-devs">
            <h2>About the Developers</h2>
            
            <div className="name-devs">
             
              <button>
              <strong>Jeffrey Ramirez</strong>
              </button>

              <button>
              <strong>Gabriella Enriquez</strong>
              </button>

              <button>
              <strong>Marc Rainier Buitizon</strong>
              </button>

              <button>
              <strong>Jensha Mica Maniflor</strong>
              </button>
              </div>
          
        </div>
        
        </div>
    </div>
  );
};

export default DashboardView;
