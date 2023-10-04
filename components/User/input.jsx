import React, { useState } from 'react';
import Button from '../ui/Button';

const MessageInput = ({ sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage(''); // Clear the input field
  };

 

  return (
    <div className="mt-4 flex items-center">
      <input
        type="text"
        className='flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none'
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <Button
        onClick={handleSendMessage}
        size="sm"
        className="buttonStyles"
      >
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
