// IntroductionPage.js
import React, { useState } from 'react';
import './IntroductionPage.css'; // Import CSS file for styling

const IntroductionPage = ({ onStartChat }) => {
  const [participantId, setParticipantId] = useState('');
  const [conditionId, setConditionId] = useState('');

  const handleStartChat = () => {
    onStartChat(participantId, conditionId);
  };

  return (
    <div className="introduction-container">
      <div className="input-container">
        <label htmlFor="participant">Participant ID:</label>
        <input
          type="text"
          id="participant"
          value={participantId}
          onChange={(e) => setParticipantId(e.target.value)}
          placeholder="Enter Participant ID"
        />
      </div>
      <div className="input-container">
        <label htmlFor="condition">Condition ID:</label>
        <input
          type="text"
          id="condition"
          value={conditionId}
          onChange={(e) => setConditionId(e.target.value)}
          placeholder="Enter Condition ID"
        />
      </div>
      <button onClick={handleStartChat}>Submit</button>
    </div>
  );
};

export default IntroductionPage;
