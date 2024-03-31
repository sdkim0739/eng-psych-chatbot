// App.js
import React, { useState } from 'react';
import IntroductionPage from './IntroductionPage';
import ChatbotPage from './ChatbotPage';

const App = () => {
  const [participantId, setParticipantId] = useState('');
  const [conditionId, setConditionId] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const handleStartChat = (participantId, conditionId) => {
    setParticipantId(participantId);
    setConditionId(conditionId);
    setShowChatbot(true);
  };

  return (
    <div>
      {showChatbot ? (
        <ChatbotPage participantId={participantId} conditionId={conditionId} />
      ) : (
        <IntroductionPage onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;
