'use client'

const Messages = ({ messages }) => {
  return (
    <div className="messagesColumn">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.user === 'user' ? 'user' : 'ai'}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default Messages;
