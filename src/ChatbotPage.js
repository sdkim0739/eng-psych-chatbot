// ChatbotPage.js
import React, { useState, useEffect } from 'react';
import CSVLogger from './CSVLogger';
import './ChatbotPage.css'; // Import CSS file for styling

const ChatbotPage = ({ participantId, conditionId }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle user input
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to handle sending the message to the chatbot
  const handleSendMessage = async () => {
    try {
      setIsLoading(true);
      setChatMessages([...chatMessages, { sender: 'user', message: inputText }]);
      const response = await fetch('https://www.stack-inference.com/inference/v0/run/06f12a25-5da8-441a-b5a6-29e67cd7545f/660710248f0d2009d391a362', {
        method: 'POST',
        headers: {
          'Authorization':'Bearer d85040f9-8ada-4e7b-b4a7-703623a6704f',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputText }),
      });
      const data = await response.json();

      // Update chat messages state with the response from the chatbot
      setChatMessages([...chatMessages, { sender: 'chatbot', message: data.outputs["out-0"] }]);
      // Log interaction with the chatbot
      logInteraction({ participantId, conditionId, input: inputText, response: data.message });
      // Clear input text after receiving response
      setInputText('');
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to log interactions and save them as CSV
  const logInteraction = (interaction) => {
    // Add code to log interactions and save them as CSV
    console.log(`Logging interaction: ${interaction}`);
  };

  // Determine image based on condition ID
  const getImageForCondition = () => {
    // Example logic - you can replace this with your own
    return (conditionId === '999' ||  conditionId === '998') ? '/jibo.png' : '/pepper.png';
  };

  return (
    <div className="chatbot-container">
      {/* Display image based on condition ID */}
      <img src={getImageForCondition()} alt="Condition Image" />
      <div className="chat-messages-container">
        {/* Display chat messages */}
        {chatMessages.map((message, index) => (
          <div key={index} className={message.sender === 'user' ? 'user-message' : 'chatbot-message'}>
            {message.message}
          </div>
        ))}
        {/* Display loading indicator while waiting for response */}
        {isLoading && <div>Loading...</div>}
      </div>
      {/* Input field for user interaction */}
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your message here..."
        className="text-input"
      />
      {/* Send button to send the message to the chatbot */}
      <button onClick={handleSendMessage} className="send-button">Send</button>
      {/* CSVLogger component to log interactions */}
      <CSVLogger participantId={participantId} conditionId={conditionId} interactions={chatMessages} />
    </div>
  );
};

export default ChatbotPage;

