import React, { useState, useEffect } from 'react';

const AiAssistantMessage = ({ message }: { message: string }) => (
  <div className="ai-message">
    <p>{message}</p>
    {/* You can add an animation for "typing" here if you want */}
  </div>
);

export const ThinkingAnimation = () => {
  const messages = [
    "Analyzing your preferences...",
    "Looking at over 500 schools...",
    "Finding the best match...",
    "Calculating the best possible options...",
    "Evaluating various schools based on your criteria..."
  ];
  
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = messages.indexOf(prev);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 3000); // Change message every 3 seconds
    
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);
  
  return <AiAssistantMessage message={currentMessage} />;
};
