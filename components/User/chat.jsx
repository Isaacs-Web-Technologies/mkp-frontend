'use client'
import { useState } from 'react';
import MessageInput from './input';
import Messages from './messages';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Function to send a message to the AI and update the messages state
  const sendMessage = async (messageText) => {
    if (messageText.trim() === '') return;

    // Create a new message object
    const messageObj = { text: messageText, user: 'user' };

    // Add the user's message to the list of messages
    setMessages([...messages, messageObj]);

    try {
      // Send the user's message to the AI backend for processing
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (response.ok) {
        // Assuming the AI backend responds with a message
        const aiResponse = await response.json();

        // Add the AI's response to the list of messages
        setMessages([...messages, { text: aiResponse.message, user: 'ai' }]);
      } else {
        console.error('Error sending message to AI.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chatContainer bg-white p-10">
      <Messages messages={messages} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
