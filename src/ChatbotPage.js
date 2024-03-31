// ChatbotPage.js
import React, { useState, useEffect } from 'react';
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
      setChatMessages((prevMessages) => [...prevMessages, { sender: 'user', message: inputText }]);
      const response = await fetch('https://www.stack-inference.com/inference/v0/run/06f12a25-5da8-441a-b5a6-29e67cd7545f/660710248f0d2009d391a362', {
        method: 'POST',
        headers: {
          'Authorization':'Bearer d85040f9-8ada-4e7b-b4a7-703623a6704f',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "in-0": inputText, "user-id": participantId }),
      });
      const data = await response.json();

      // Update chat messages state with the response from the chatbot
      setChatMessages((prevMessages) => [...prevMessages, { sender: 'chatbot', message: data.outputs["out-0"] }]);
      // Log interaction with the chatbot
      // logInteraction({ participantId, conditionId, input: inputText, response: data.outputs["out-0"] });
      // Clear input text after receiving response
      setInputText('');
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // // Function to log interactions and save them as JSON object
  // const logInteraction = async (interaction) => {
  //   try {
  //     // Fetch existing data from local storage
  //     const existingData = JSON.parse(localStorage.getItem('interactions')) || [];
  //     // Append new interaction to existing data
  //     const newData = [...existingData, interaction];
  //     // Save updated data to local storage
  //     localStorage.setItem('interactions', JSON.stringify(newData));
  //   } catch (error) {
  //     console.error('Error logging interaction:', error);
  //   }
  // };

  const saveSession = () => {
    // Convert interactions data to JSON object
    const sessionData = {
      participantId,
      chatMessages,
    };
  
    // Convert sessionData to JSON string
    const jsonData = JSON.stringify(sessionData);
  
    // Create a Blob object with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
  
    // Generate a temporary download link
    const url = URL.createObjectURL(blob);
  
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${participantId}.json`;
  
    // Append the link to the body and click it programmatically to trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Cleanup: Remove the link element and revoke the Blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  

  // // Function to save interactions on the server
  // const saveSession = async () => {
  //   try {
  //     const response = await fetch('/api/server', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ participantId, conditionId, interactions: chatMessages }),
  //     });
  //     if (response.ok) {
  //       console.log('Session saved successfully');
  //     } else {
  //       console.error('Error saving session');
  //     }
  //   } catch (error) {
  //     console.error('Error saving session:', error);
  //   }
  // };

  // Determine image based on condition ID
  const getImageForCondition = () => {
    // Example logic - you can replace this with your own
    return (conditionId === '1' ||  conditionId === '3') ? '/jibo.png' : '/pepper.png';
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
      {/* Save Session button */}
      <button onClick={saveSession} style={{
          position: 'absolute',
          top: '10px', // Adjust the top offset as needed
          right: '10px', // Adjust the right offset as needed
        }}>End session</button>
    </div>
  );
};

export default ChatbotPage;

