import { useState } from 'react';
import '../chatbot/Chatbot.css';
import Header from "../components/Header";

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your mental health chatbot. How can I support you today?" }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);

    const userInput = input.toLowerCase();


    //eto yung response ng chatbot sa mga keywords na sinend ng user
    const topics = [
      {
        keywords: ['depression', 'depressed', 'hopeless'],
        response: `Depression is a common mental health condition that causes a persistent feeling of sadness and changes in how you think, sleep, eat and act. There are several different types. Depression is treatable — usually with talk therapy, medication or both. Seeking medical help as soon as you have symptoms is essential. Here are common symptoms:\n
        1. Persistent sadness or low mood – Feeling sad, empty, or hopeless nearly every day.\n
        2. Loss of interest or pleasure (anhedonia).\n
        3. Changes in appetite or weight.\n
        4. Sleep disturbances – insomnia or oversleeping.\n
        5. Fatigue or loss of energy.\n
        6. Feelings of worthlessness or excessive guilt.\n
        7. Difficulty concentrating or making decisions.\n
        8. Psychomotor agitation or slowing.\n
        9. Thoughts of death or suicide.\n
        If you or someone you know is experiencing these, please seek help from a mental health professional.`
      },
      {
        keywords: ['anxiety', 'anxious', 'panic'],
        response: `Anxiety is your body’s natural response to stress. It’s a feeling of fear, worry, or unease—often about an upcoming event or uncertain outcome.\n
        While it’s normal to feel anxious occasionally (like before exams or interviews), anxiety disorders involve intense, excessive, and persistent worry or fear that interferes with daily life.\n
        Physical Symptoms:\n
        1. Rapid heartbeat or palpitations\n
        2. Shortness of breath or chest tightness\n
        3. Sweating\n
        4. Trembling or shaking\n
        5. Dizziness or feeling light-headed\n
        6. Muscle tension or body aches\n
        7. Stomach problems (nausea, diarrhea)\n
        Mental & Emotional Symptoms:\n
        1. Excessive worry or fear\n
        2. Restlessness or feeling on edge\n
        3. Racing thoughts\n
        4. Difficulty concentrating\n
        5. Irritability\n
        6. Feeling like something bad is going to happen`
      },
      {
        keywords: ['bigfive', 'big five', 'bfi', 'personality test'],
        response: `The Big Five Inventory (BFI) measures five personality traits:\n
        1. Openness\n
        2. Conscientiousness\n
        3. Extraversion\n
        4. Agreeableness\n
        5. Neuroticism\n
        It's commonly used in psychology to understand individual differences in personality and behavior.`
      },
      {
        keywords: ['wellbeing', 'well-being', 'happiness', 'mental health', 'quality of life'],
        response: `Well-being is about feeling good and functioning effectively. It includes emotional, psychological, and social aspects of mental health. Prioritizing rest, relationships, and healthy habits can greatly improve your overall quality of life.`
      }
    ];

    //eto naman ung default na response ng chatbot kung walang keywords na sinend ang user
    let botReply = "I'm here to help. Could you tell me more about how you're feeling?";

    for (const topic of topics) {
      if (topic.keywords.some(keyword => userInput.includes(keyword))) {
        botReply = topic.response;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 500);

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const renderMessage = (msg, i) => {
    return (
      <div key={i} className={`chat-message ${msg.sender}`}>
        {msg.text.split('\n').map((line, index) => (
          <p key={index}>{line.trim()}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="chat-container">
      <Header onLoginClick={() => console.log("Login clicked")} />
      
      <div className="chat-box">
        {messages.map((msg, i) => renderMessage(msg, i))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
